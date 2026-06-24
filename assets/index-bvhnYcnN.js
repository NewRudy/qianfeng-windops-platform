var Bf=Object.defineProperty;var zf=(i,e,t)=>e in i?Bf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var pt=(i,e,t)=>zf(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $l="184",bs={ROTATE:0,DOLLY:1,PAN:2},_s={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gf=0,kc=1,Hf=2,la=1,Vf=2,ar=3,ri=0,tn=1,Dn=2,ni=0,ys=1,Bc=2,zc=3,Gc=4,$f=5,Fi=100,Wf=101,Xf=102,qf=103,jf=104,Yf=200,Kf=201,Zf=202,Jf=203,Oo=204,ko=205,Qf=206,ep=207,tp=208,np=209,ip=210,sp=211,rp=212,ap=213,op=214,Bo=0,zo=1,Go=2,As=3,Ho=4,Vo=5,$o=6,Wo=7,Eu=0,lp=1,cp=2,On=0,Tu=1,Au=2,wu=3,Cu=4,Ru=5,Pu=6,Iu=7,Hc="attached",dp="detached",Lu=300,$i=301,ws=302,Va=303,$a=304,La=306,Cs=1e3,Nn=1001,xa=1002,It=1003,Du=1004,or=1005,Lt=1006,ca=1007,Zn=1008,cn=1009,Nu=1010,Uu=1011,mr=1012,Wl=1013,zn=1014,mn=1015,ai=1016,Xl=1017,ql=1018,gr=1020,Fu=35902,Ou=35899,ku=1021,Bu=1022,gn=1023,oi=1026,Bi=1027,jl=1028,Yl=1029,Wi=1030,Kl=1031,Zl=1033,da=33776,ua=33777,ha=33778,fa=33779,Xo=35840,qo=35841,jo=35842,Yo=35843,Ko=36196,Zo=37492,Jo=37496,Qo=37488,el=37489,va=37490,tl=37491,nl=37808,il=37809,sl=37810,rl=37811,al=37812,ol=37813,ll=37814,cl=37815,dl=37816,ul=37817,hl=37818,fl=37819,pl=37820,ml=37821,gl=36492,_l=36494,xl=36495,vl=36283,bl=36284,ba=36285,yl=36286,up=2200,hp=2201,fp=2202,_r=2300,xr=2301,Wa=2302,Vc=2303,xs=2400,vs=2401,ya=2402,Jl=2500,pp=2501,mp=0,zu=1,Sl=2,gp=3200,Ml=0,_p=1,Mi="",Mt="srgb",sn="srgb-linear",Sa="linear",et="srgb",es=7680,$c=519,xp=512,vp=513,bp=514,Ql=515,yp=516,Sp=517,ec=518,Mp=519,El=35044,Wc="300 es",Un=2e3,vr=2001;function Ep(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Tp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ap(){const i=br("canvas");return i.style.display="block",i}const Xc={};function Ma(...i){const e="THREE."+i.shift();console.log(e,...i)}function Gu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Se(...i){i=Gu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function we(...i){i=Gu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Tl(...i){const e=i.join(" ");e in Xc||(Xc[e]=!0,Se(...i))}function wp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Cp={[Bo]:zo,[Go]:$o,[Ho]:Wo,[As]:Vo,[zo]:Bo,[$o]:Go,[Wo]:Ho,[Vo]:As};class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qc=1234567;const dr=Math.PI/180,Rs=180/Math.PI;function Tn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function tc(i,e){return(i%e+e)%e}function Rp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Pp(i,e,t){return i!==e?(t-i)/(e-i):0}function ur(i,e,t){return(1-t)*i+t*e}function Ip(i,e,t,n){return ur(i,e,1-Math.exp(-t*n))}function Lp(i,e=1){return e-Math.abs(tc(i,e*2)-e)}function Dp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Np(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Up(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Fp(i,e){return i+Math.random()*(e-i)}function Op(i){return i*(.5-Math.random())}function kp(i){i!==void 0&&(qc=i);let e=qc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bp(i){return i*dr}function zp(i){return i*Rs}function Gp(i){return(i&i-1)===0&&i!==0}function Hp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Vp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $p(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*d,o*c);break;default:Se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function tt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Hu={DEG2RAD:dr,RAD2DEG:Rs,generateUUID:Tn,clamp:Ve,euclideanModulo:tc,mapLinear:Rp,inverseLerp:Pp,lerp:ur,damp:Ip,pingpong:Lp,smoothstep:Dp,smootherstep:Np,randInt:Up,randFloat:Fp,randFloatSpread:Op,seededRandom:kp,degToRad:Bp,radToDeg:zp,isPowerOfTwo:Gp,ceilPowerOfTwo:Hp,floorPowerOfTwo:Vp,setQuaternionFromProperEuler:$p,normalize:tt,denormalize:yn},Tc=class Tc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tc.prototype.isVector2=!0;let Le=Tc;class nn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3],h=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(u!==x||l!==h||c!==f||d!==g){let m=l*h+c*f+d*g+u*x;m<0&&(h=-h,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const S=Math.acos(m),E=Math.sin(S);p=Math.sin(p*S)/E,o=Math.sin(o*S)/E,l=l*p+h*o,c=c*p+f*o,d=d*p+g*o,u=u*p+x*o}else{l=l*p+h*o,c=c*p+f*o,d=d*p+g*o,u=u*p+x*o;const S=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=S,c*=S,d*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:Se("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ac=class Ac{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xa.copy(this).projectOnVector(e),this.sub(Xa)}reflect(e){return this.sub(Xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ac.prototype.isVector3=!0;let I=Ac;const Xa=new I,jc=new nn,wc=class wc{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],S=s[1],E=s[4],M=s[7],C=s[2],A=s[5],P=s[8];return r[0]=a*x+o*S+l*C,r[3]=a*m+o*E+l*A,r[6]=a*p+o*M+l*P,r[1]=c*x+d*S+u*C,r[4]=c*m+d*E+u*A,r[7]=c*p+d*M+u*P,r[2]=h*x+f*S+g*C,r[5]=h*m+f*E+g*A,r[8]=h*p+f*M+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=u*x,e[1]=(s*c-d*n)*x,e[2]=(o*n-s*a)*x,e[3]=h*x,e[4]=(d*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(qa.makeScale(e,t)),this}rotate(e){return this.premultiply(qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};wc.prototype.isMatrix3=!0;let Ue=wc;const qa=new Ue,Yc=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kc=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wp(){const i={enabled:!0,workingColorSpace:sn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===et&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mi?Sa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Tl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Tl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sn]:{primaries:e,whitePoint:n,transfer:Sa,toXYZ:Yc,fromXYZ:Kc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:n,transfer:et,toXYZ:Yc,fromXYZ:Kc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),i}const $e=Wp();function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ss(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ts;class Xp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=br("canvas")),ts.width=e.width,ts.height=e.height;const s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ii(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ii(t[n]/255)*255):t[n]=ii(t[n]);return{data:t,width:e.width,height:e.height}}else return Se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qp=0;class nc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ja(s[a].image)):r.push(ja(s[a]))}else r=ja(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ja(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Se("Texture: Unable to serialize Texture."),{})}let jp=0;const Ya=new I;class kt extends li{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=Nn,s=Nn,r=Lt,a=Zn,o=gn,l=cn,c=kt.DEFAULT_ANISOTROPY,d=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Tn(),this.name="",this.source=new nc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ya).x}get height(){return this.source.getSize(Ya).y}get depth(){return this.source.getSize(Ya).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Se(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Se(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cs:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cs:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Lu;kt.DEFAULT_ANISOTROPY=1;const Cc=class Cc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(f+1)/2,C=(p+1)/2,A=(d+h)/4,P=(u+x)/4,v=(g+m)/4;return E>M&&E>C?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=A/n,r=P/n):M>C?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=v/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=P/r,s=v/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(h-d)*(h-d));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-x)/S,this.z=(h-d)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Cc.prototype.isVector4=!0;let dt=Cc;class Yp extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Lt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new kt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Lt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new nc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends Yp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Vu extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kp extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ia=class Ia{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,x,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ia().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,g=o*d,x=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,x=c*u;t[0]=h+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,x=c*u;t[0]=h-x*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,g=o*d,x=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+x,t[1]=l*u,t[5]=x*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*d,t[4]=x-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-x*u}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+x,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=x*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zp,e,Jp)}lookAt(e,t,n){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),fi.crossVectors(n,on),fi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),fi.crossVectors(n,on)),fi.normalize(),Cr.crossVectors(on,fi),s[0]=fi.x,s[4]=Cr.x,s[8]=on.x,s[1]=fi.y,s[5]=Cr.y,s[9]=on.y,s[2]=fi.z,s[6]=Cr.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],S=n[3],E=n[7],M=n[11],C=n[15],A=s[0],P=s[4],v=s[8],w=s[12],N=s[1],R=s[5],O=s[9],$=s[13],X=s[2],U=s[6],H=s[10],B=s[14],ee=s[3],te=s[7],ue=s[11],be=s[15];return r[0]=a*A+o*N+l*X+c*ee,r[4]=a*P+o*R+l*U+c*te,r[8]=a*v+o*O+l*H+c*ue,r[12]=a*w+o*$+l*B+c*be,r[1]=d*A+u*N+h*X+f*ee,r[5]=d*P+u*R+h*U+f*te,r[9]=d*v+u*O+h*H+f*ue,r[13]=d*w+u*$+h*B+f*be,r[2]=g*A+x*N+m*X+p*ee,r[6]=g*P+x*R+m*U+p*te,r[10]=g*v+x*O+m*H+p*ue,r[14]=g*w+x*$+m*B+p*be,r[3]=S*A+E*N+M*X+C*ee,r[7]=S*P+E*R+M*U+C*te,r[11]=S*v+E*O+M*H+C*ue,r[15]=S*w+E*$+M*B+C*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],S=l*f-c*h,E=o*f-c*u,M=o*h-l*u,C=a*f-c*d,A=a*h-l*d,P=a*u-o*d;return t*(x*S-m*E+p*M)-n*(g*S-m*C+p*A)+s*(g*E-x*C+p*P)-r*(g*M-x*A+m*P)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],S=t*o-n*a,E=t*l-s*a,M=t*c-r*a,C=n*l-s*o,A=n*c-r*o,P=s*c-r*l,v=d*x-u*g,w=d*m-h*g,N=d*p-f*g,R=u*m-h*x,O=u*p-f*x,$=h*p-f*m,X=S*$-E*O+M*R+C*N-A*w+P*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/X;return e[0]=(o*$-l*O+c*R)*U,e[1]=(s*O-n*$-r*R)*U,e[2]=(x*P-m*A+p*C)*U,e[3]=(h*A-u*P-f*C)*U,e[4]=(l*N-a*$-c*w)*U,e[5]=(t*$-s*N+r*w)*U,e[6]=(m*M-g*P-p*E)*U,e[7]=(d*P-h*M+f*E)*U,e[8]=(a*O-o*N+c*v)*U,e[9]=(n*N-t*O-r*v)*U,e[10]=(g*A-x*M+p*S)*U,e[11]=(u*M-d*A-f*S)*U,e[12]=(o*w-a*R-l*v)*U,e[13]=(t*R-n*w+s*v)*U,e[14]=(x*E-g*C-m*S)*U,e[15]=(d*C-u*E+h*S)*U,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,g=r*u,x=a*d,m=a*u,p=o*u,S=l*c,E=l*d,M=l*u,C=n.x,A=n.y,P=n.z;return s[0]=(1-(x+p))*C,s[1]=(f+M)*C,s[2]=(g-E)*C,s[3]=0,s[4]=(f-M)*A,s[5]=(1-(h+p))*A,s[6]=(m+S)*A,s[7]=0,s[8]=(g+E)*P,s[9]=(m-S)*P,s[10]=(1-(h+x))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ns.set(s[0],s[1],s[2]).length();const o=ns.set(s[4],s[5],s[6]).length(),l=ns.set(s[8],s[9],s[10]).length();r<0&&(a=-a),_n.copy(this);const c=1/a,d=1/o,u=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=d,_n.elements[5]*=d,_n.elements[6]*=d,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Un,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Un)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===vr)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Un,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Un)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===vr)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ia.prototype.isMatrix4=!0;let Ge=Ia;const ns=new I,_n=new Ge,Zp=new I(0,0,0),Jp=new I(1,1,1),fi=new I,Cr=new I,on=new I,Zc=new Ge,Jc=new nn;class Ai{constructor(e=0,t=0,n=0,s=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Se("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jc.setFromEuler(this),this.setFromQuaternion(Jc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qp=0;const Qc=new I,is=new nn,Wn=new Ge,Rr=new I,js=new I,em=new I,tm=new nn,ed=new I(1,0,0),td=new I(0,1,0),nd=new I(0,0,1),id={type:"added"},nm={type:"removed"},ss={type:"childadded",child:null},Ka={type:"childremoved",child:null};class _t extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new I,t=new Ai,n=new nn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new Ue}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(ed,e)}rotateY(e){return this.rotateOnAxis(td,e)}rotateZ(e){return this.rotateOnAxis(nd,e)}translateOnAxis(e,t){return Qc.copy(e).applyQuaternion(this.quaternion),this.position.add(Qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ed,e)}translateY(e){return this.translateOnAxis(td,e)}translateZ(e){return this.translateOnAxis(nd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Rr.copy(e):Rr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(js,Rr,this.up):Wn.lookAt(Rr,js,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(Wn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(we("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(id),ss.child=e,this.dispatchEvent(ss),ss.child=null):we("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nm),Ka.child=e,this.dispatchEvent(Ka),Ka.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(id),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,em),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,tm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}_t.DEFAULT_UP=new I(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Mn extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const im={type:"move"};class Za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(im)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const $u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function Ja(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=tc(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ja(a,r,e+1/3),this.g=Ja(a,r,e),this.b=Ja(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&Se("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Se("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Se("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=$u[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Se("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return $e.workingToColorSpace(Xt.copy(this),e),Math.round(Ve(Xt.r*255,0,255))*65536+Math.round(Ve(Xt.g*255,0,255))*256+Math.round(Ve(Xt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Xt.copy(this),t);const n=Xt.r,s=Xt.g,r=Xt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=Mt){$e.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,n=Xt.g,s=Xt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(Pr);const n=ur(pi.h,Pr.h,t),s=ur(pi.s,Pr.s,t),r=ur(pi.l,Pr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new Ie;Ie.NAMES=$u;class sc{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ie(e),this.near=t,this.far=n}clone(){return new sc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class sm extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const xn=new I,Xn=new I,Qa=new I,qn=new I,rs=new I,as=new I,sd=new I,eo=new I,to=new I,no=new I,io=new dt,so=new dt,ro=new dt;class Sn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Xn.subVectors(n,t),Qa.subVectors(e,t);const a=xn.dot(xn),o=xn.dot(Xn),l=xn.dot(Qa),c=Xn.dot(Xn),d=Xn.dot(Qa),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return io.setScalar(0),so.setScalar(0),ro.setScalar(0),io.fromBufferAttribute(e,t),so.fromBufferAttribute(e,n),ro.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(io,r.x),a.addScaledVector(so,r.y),a.addScaledVector(ro,r.z),a}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Xn.subVectors(e,t),xn.cross(Xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),xn.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Sn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;rs.subVectors(s,n),as.subVectors(r,n),eo.subVectors(e,n);const l=rs.dot(eo),c=as.dot(eo);if(l<=0&&c<=0)return t.copy(n);to.subVectors(e,s);const d=rs.dot(to),u=as.dot(to);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(rs,a);no.subVectors(e,r);const f=rs.dot(no),g=as.dot(no);if(g>=0&&f<=g)return t.copy(r);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(as,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return sd.subVectors(r,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(sd,o);const p=1/(m+x+h);return a=x*p,o=h*p,t.copy(n).addScaledVector(rs,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Zt{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ir.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox)),Ir.applyMatrix4(e.matrixWorld),this.union(Ir)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Lr.subVectors(this.max,Ys),os.subVectors(e.a,Ys),ls.subVectors(e.b,Ys),cs.subVectors(e.c,Ys),mi.subVectors(ls,os),gi.subVectors(cs,ls),Ri.subVectors(os,cs);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ri.z,Ri.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ri.z,0,-Ri.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ri.y,Ri.x,0];return!ao(t,os,ls,cs,Lr)||(t=[1,0,0,0,1,0,0,0,1],!ao(t,os,ls,cs,Lr))?!1:(Dr.crossVectors(mi,gi),t=[Dr.x,Dr.y,Dr.z],ao(t,os,ls,cs,Lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new I,new I,new I,new I,new I,new I,new I,new I],vn=new I,Ir=new Zt,os=new I,ls=new I,cs=new I,mi=new I,gi=new I,Ri=new I,Ys=new I,Lr=new I,Dr=new I,Pi=new I;function ao(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Pi.fromArray(i,r);const o=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),d=n.dot(Pi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const At=new I,Nr=new Le;let rm=0;class Ht extends li{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=El,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),s=tt(s,this.array),r=tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==El&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Wu extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Xu extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Dt extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}const am=new Zt,Ks=new I,oo=new I;class Hn{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):am.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);const t=Ks.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(oo)),this.expandByPoint(Ks.copy(e.center).sub(oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let om=0;const un=new Ge,lo=new _t,ds=new I,ln=new Zt,Zs=new Zt,Ft=new I;class jt extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ep(e)?Xu:Wu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return lo.lookAt(e),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Dt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){we("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&we('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){we("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Zs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(ln.min,Zs.min),ln.expandByPoint(Ft),Ft.addVectors(ln.max,Zs.max),ln.expandByPoint(Ft)):(ln.expandByPoint(Zs.min),ln.expandByPoint(Zs.max))}ln.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Ft.fromBufferAttribute(o,c),l&&(ds.fromBufferAttribute(e,c),Ft.add(ds)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&we('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){we("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new I,l[v]=new I;const c=new I,d=new I,u=new I,h=new Le,f=new Le,g=new Le,x=new I,m=new I;function p(v,w,N){c.fromBufferAttribute(n,v),d.fromBufferAttribute(n,w),u.fromBufferAttribute(n,N),h.fromBufferAttribute(r,v),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,N),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(x.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(R),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(R),o[v].add(x),o[w].add(x),o[N].add(x),l[v].add(m),l[w].add(m),l[N].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,w=S.length;v<w;++v){const N=S[v],R=N.start,O=N.count;for(let $=R,X=R+O;$<X;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const E=new I,M=new I,C=new I,A=new I;function P(v){C.fromBufferAttribute(s,v),A.copy(C);const w=o[v];E.copy(w),E.sub(C.multiplyScalar(C.dot(w))).normalize(),M.crossVectors(A,w);const R=M.dot(l[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,R)}for(let v=0,w=S.length;v<w;++v){const N=S[v],R=N.start,O=N.count;for(let $=R,X=R+O;$<X;$+=3)P(e.getX($+0)),P(e.getX($+1)),P(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,d=new I,u=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new Ht(h,d,u)}if(this.index===null)return Se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=El,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new I;class Da{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),s=tt(s,this.array),r=tt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ma("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Da(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ma("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let lm=0;class Bn extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=ys,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oo,this.blendDst=ko,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Se(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Se(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oo&&(n.blendSrc=this.blendSrc),this.blendDst!==ko&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Yn=new I,co=new I,Ur=new I,_i=new I,uo=new I,Fr=new I,ho=new I;class Bs{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){co.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(co);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=_i.dot(this.direction),l=-_i.dot(Ur),c=_i.lengthSq(),d=Math.abs(1-a*a);let u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const x=1/d;u*=x,h*=x,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(co).addScaledVector(Ur,h),f}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);const n=Yn.dot(this.direction),s=Yn.dot(Yn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,n,s,r){uo.subVectors(t,e),Fr.subVectors(n,e),ho.crossVectors(uo,Fr);let a=this.direction.dot(ho),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);const l=o*this.direction.dot(Fr.crossVectors(_i,Fr));if(l<0)return null;const c=o*this.direction.dot(uo.cross(_i));if(c<0||l+c>a)return null;const d=-o*_i.dot(ho);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zi extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rd=new Ge,Ii=new Bs,Or=new Hn,ad=new I,kr=new I,Br=new I,zr=new I,fo=new I,Gr=new I,od=new I,Hr=new I;class wt extends _t{constructor(e=new jt,t=new zi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(fo.fromBufferAttribute(u,e),a?Gr.addScaledVector(fo,d):Gr.addScaledVector(fo.sub(t),d))}t.add(Gr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),Ii.copy(e.ray).recast(e.near),!(Or.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Or,ad)===null||Ii.origin.distanceToSquared(ad)>(e.far-e.near)**2))&&(rd.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(rd),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,C=E;M<C;M+=3){const A=o.getX(M),P=o.getX(M+1),v=o.getX(M+2);s=Vr(this,p,e,n,c,d,u,A,P,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const S=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);s=Vr(this,a,e,n,c,d,u,S,E,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,C=E;M<C;M+=3){const A=M,P=M+1,v=M+2;s=Vr(this,p,e,n,c,d,u,A,P,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const S=m,E=m+1,M=m+2;s=Vr(this,a,e,n,c,d,u,S,E,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function cm(i,e,t,n,s,r,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ri,o),l===null)return null;Hr.copy(o),Hr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Hr);return c<t.near||c>t.far?null:{distance:c,point:Hr.clone(),object:i}}function Vr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,kr),i.getVertexPosition(l,Br),i.getVertexPosition(c,zr);const d=cm(i,e,t,n,kr,Br,zr,od);if(d){const u=new I;Sn.getBarycoord(od,kr,Br,zr,u),s&&(d.uv=Sn.getInterpolatedAttribute(s,o,l,c,u,new Le)),r&&(d.uv1=Sn.getInterpolatedAttribute(r,o,l,c,u,new Le)),a&&(d.normal=Sn.getInterpolatedAttribute(a,o,l,c,u,new I),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new I,materialIndex:0};Sn.getNormal(kr,Br,zr,h.normal),d.face=h,d.barycoord=u}return d}const Js=new dt,ld=new dt,cd=new dt,dm=new dt,dd=new Ge,$r=new I,po=new Hn,ud=new Ge,mo=new Bs;class um extends wt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hc,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Zt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,$r),this.boundingBox.expandByPoint($r)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,$r),this.boundingSphere.expandByPoint($r)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),po.copy(this.boundingSphere),po.applyMatrix4(s),e.ray.intersectsSphere(po)!==!1&&(ud.copy(s).invert(),mo.copy(e.ray).applyMatrix4(ud),!(this.boundingBox!==null&&mo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,mo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===dp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Se("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;ld.fromBufferAttribute(s.attributes.skinIndex,e),cd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Js.copy(t),t.set(0,0,0,0)):(Js.set(...t,1),t.set(0,0,0)),Js.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=cd.getComponent(r);if(a!==0){const o=ld.getComponent(r);dd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(dm.copy(Js).applyMatrix4(dd),a)}}return t.isVector4&&(t.w=Js.w),t.applyMatrix4(this.bindMatrixInverse)}}class ju extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}}class rc extends kt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=It,d=It,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hd=new Ge,hm=new Ge;class ac{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Se("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:hm;hd.multiplyMatrices(o,t[r]),hd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new ac(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new rc(t,e,e,gn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(Se("Skeleton: No bone found with UUID:",r),a=new ju),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Al extends Ht{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const us=new Ge,fd=new Ge,Wr=[],pd=new Zt,fm=new Ge,Qs=new wt,er=new Hn;class pm extends wt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Al(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,fm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,us),pd.copy(e.boundingBox).applyMatrix4(us),this.boundingBox.union(pd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,us),er.copy(e.boundingSphere).applyMatrix4(us),this.boundingSphere.union(er)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Qs.geometry=this.geometry,Qs.material=this.material,Qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),er.copy(this.boundingSphere),er.applyMatrix4(n),e.ray.intersectsSphere(er)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),fd.multiplyMatrices(n,us),Qs.matrixWorld=fd,Qs.raycast(e,Wr);for(let a=0,o=Wr.length;a<o;a++){const l=Wr[a];l.instanceId=r,l.object=this,t.push(l)}Wr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Al(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rc(new Float32Array(s*this.count),s,this.count,jl,mn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const go=new I,mm=new I,gm=new Ue;class Si{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=go.subVectors(n,t).cross(mm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(go),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gm.getNormalMatrix(e),s=this.coplanarPoint(go).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Hn,_m=new Le(.5,.5),Xr=new I;class oc{constructor(e=new Si,t=new Si,n=new Si,s=new Si,r=new Si,a=new Si){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],S=r[12],E=r[13],M=r[14],C=r[15];if(s[0].setComponents(c-a,f-d,p-g,C-S).normalize(),s[1].setComponents(c+a,f+d,p+g,C+S).normalize(),s[2].setComponents(c+o,f+u,p+x,C+E).normalize(),s[3].setComponents(c-o,f-u,p-x,C-E).normalize(),n)s[4].setComponents(l,h,m,M).normalize(),s[5].setComponents(c-l,f-h,p-m,C-M).normalize();else if(s[4].setComponents(c-l,f-h,p-m,C-M).normalize(),t===Un)s[5].setComponents(c+l,f+h,p+m,C+M).normalize();else if(t===vr)s[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=_m.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Xr.x=s.normal.x>0?e.max.x:e.min.x,Xr.y=s.normal.y>0?e.max.y:e.min.y,Xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lc extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ea=new I,Ta=new I,md=new Ge,tr=new Bs,qr=new Hn,_o=new I,gd=new I;class cc extends _t{constructor(e=new jt,t=new lc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ea.fromBufferAttribute(t,s-1),Ta.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ea.distanceTo(Ta);e.setAttribute("lineDistance",new Dt(n,1))}else Se("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(s),qr.radius+=r,e.ray.intersectsSphere(qr)===!1)return;md.copy(s).invert(),tr.copy(e.ray).applyMatrix4(md);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=c){const p=d.getX(x),S=d.getX(x+1),E=jr(this,e,tr,l,p,S,x);E&&t.push(E)}if(this.isLineLoop){const x=d.getX(g-1),m=d.getX(f),p=jr(this,e,tr,l,x,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=c){const p=jr(this,e,tr,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=jr(this,e,tr,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Ea.fromBufferAttribute(o,s),Ta.fromBufferAttribute(o,r),t.distanceSqToSegment(Ea,Ta,_o,gd)>n)return;_o.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_o);if(!(c<e.near||c>e.far))return{distance:c,point:gd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const _d=new I,xd=new I;class Yu extends cc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)_d.fromBufferAttribute(t,s),xd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+_d.distanceTo(xd);e.setAttribute("lineDistance",new Dt(n,1))}else Se("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xm extends cc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ku extends Bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vd=new Ge,wl=new Bs,Yr=new Hn,Kr=new I;class vm extends _t{constructor(e=new jt,t=new Ku){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(s),Yr.radius+=r,e.ray.intersectsSphere(Yr)===!1)return;vd.copy(s).invert(),wl.copy(e.ray).applyMatrix4(vd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,x=f;g<x;g++){const m=c.getX(g);Kr.fromBufferAttribute(u,m),bd(Kr,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=h,x=f;g<x;g++)Kr.fromBufferAttribute(u,g),bd(Kr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function bd(i,e,t,n,s,r,a){const o=wl.distanceSqToPoint(i);if(o<t){const l=new I;wl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Zu extends kt{constructor(e=[],t=$i,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ps extends kt{constructor(e,t,n=zn,s,r,a,o=It,l=It,c,d=oi,u=1){if(d!==oi&&d!==Bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bm extends Ps{constructor(e,t=zn,n=$i,s,r,a=It,o=It,l,c=oi){const d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ju extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Jn extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(d,3)),this.setAttribute("uv",new Dt(u,2));function g(x,m,p,S,E,M,C,A,P,v,w){const N=M/P,R=C/v,O=M/2,$=C/2,X=A/2,U=P+1,H=v+1;let B=0,ee=0;const te=new I;for(let ue=0;ue<H;ue++){const be=ue*R-$;for(let Te=0;Te<U;Te++){const Ke=Te*N-O;te[x]=Ke*S,te[m]=be*E,te[p]=X,c.push(te.x,te.y,te.z),te[x]=0,te[m]=0,te[p]=A>0?1:-1,d.push(te.x,te.y,te.z),u.push(Te/P),u.push(1-ue/v),B+=1}}for(let ue=0;ue<v;ue++)for(let be=0;be<P;be++){const Te=h+be+U*ue,Ke=h+be+U*(ue+1),nt=h+(be+1)+U*(ue+1),ke=h+(be+1)+U*ue;l.push(Te,Ke,ke),l.push(Ke,nt,ke),ee+=6}o.addGroup(f,ee,w),f+=ee,h+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Aa extends jt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let g=0;const x=[],m=n/2;let p=0;S(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Dt(u,3)),this.setAttribute("normal",new Dt(h,3)),this.setAttribute("uv",new Dt(f,2));function S(){const M=new I,C=new I;let A=0;const P=(t-e)/n;for(let v=0;v<=r;v++){const w=[],N=v/r,R=N*(t-e)+e;for(let O=0;O<=s;O++){const $=O/s,X=$*l+o,U=Math.sin(X),H=Math.cos(X);C.x=R*U,C.y=-N*n+m,C.z=R*H,u.push(C.x,C.y,C.z),M.set(U,P,H).normalize(),h.push(M.x,M.y,M.z),f.push($,1-N),w.push(g++)}x.push(w)}for(let v=0;v<s;v++)for(let w=0;w<r;w++){const N=x[w][v],R=x[w+1][v],O=x[w+1][v+1],$=x[w][v+1];(e>0||w!==0)&&(d.push(N,R,$),A+=3),(t>0||w!==r-1)&&(d.push(R,O,$),A+=3)}c.addGroup(p,A,0),p+=A}function E(M){const C=g,A=new Le,P=new I;let v=0;const w=M===!0?e:t,N=M===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*N,0),h.push(0,N,0),f.push(.5,.5),g++;const R=g;for(let O=0;O<=s;O++){const X=O/s*l+o,U=Math.cos(X),H=Math.sin(X);P.x=w*H,P.y=m*N,P.z=w*U,u.push(P.x,P.y,P.z),h.push(0,N,0),A.x=U*.5+.5,A.y=H*.5*N+.5,f.push(A.x,A.y),g++}for(let O=0;O<s;O++){const $=C+O,X=R+O;M===!0?d.push(X,X+1,$):d.push(X+1,X,$),v+=3}c.addGroup(p,v,M===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Na extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<d;p++){const S=p*h-a;for(let E=0;E<c;E++){const M=E*u-r;g.push(M,-S,0),x.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const E=S+c*p,M=S+c*(p+1),C=S+1+c*(p+1),A=S+1+c*p;f.push(E,M,A),f.push(M,C,A)}this.setIndex(f),this.setAttribute("position",new Dt(g,3)),this.setAttribute("normal",new Dt(x,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.width,e.height,e.widthSegments,e.heightSegments)}}class dc extends jt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new I,h=new I,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const S=[],E=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){const A=C/t;u.x=-e*Math.cos(s+A*r)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(s+A*r)*Math.sin(a+E*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),x.push(h.x,h.y,h.z),m.push(A+M,1-E),S.push(c++)}d.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const E=d[p][S+1],M=d[p][S],C=d[p+1][S],A=d[p+1][S+1];(p!==0||a>0)&&f.push(E,M,A),(p!==n-1||l<Math.PI)&&f.push(M,C,A)}this.setIndex(f),this.setAttribute("position",new Dt(g,3)),this.setAttribute("normal",new Dt(x,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Is(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(yd(s))s.isRenderTargetTexture?(Se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(yd(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Kt(i){const e={};for(let t=0;t<i.length;t++){const n=Is(i[t]);for(const s in n)e[s]=n[s]}return e}function yd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function ym(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Sm={clone:Is,merge:Kt};var Mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mm,this.fragmentShader=Em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=ym(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Tm extends Gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Qn extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ml,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vn extends Qn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Am extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wm extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Zr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Cm(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Sd(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function eh(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class zs{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Rm extends zs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xs,endingEnd:xs}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case vs:r=e,o=2*t-n;break;case ya:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case vs:a=e,l=2*n-t;break;case ya:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-h*m+2*h*x-h*g,S=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*g+1,E=(-1-f)*m+(1.5+f)*x+.5*g,M=f*m-f*x;for(let C=0;C!==o;++C)r[C]=p*a[d+C]+S*a[c+C]+E*a[l+C]+M*a[u+C];return r}}class th extends zs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(s-t),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}}class Pm extends zs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Im extends zs{interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.settings||this.DefaultSettings_,u=d.inTangents,h=d.outTangents;if(!u||!h){const x=(n-t)/(s-t),m=1-x;for(let p=0;p!==o;++p)r[p]=a[c+p]*m+a[l+p]*x;return r}const f=o*2,g=e-1;for(let x=0;x!==o;++x){const m=a[c+x],p=a[l+x],S=g*f+x*2,E=h[S],M=h[S+1],C=e*f+x*2,A=u[C],P=u[C+1];let v=(n-t)/(s-t),w,N,R,O,$;for(let X=0;X<8;X++){w=v*v,N=w*v,R=1-v,O=R*R,$=O*R;const H=$*t+3*O*v*E+3*R*w*A+N*s-n;if(Math.abs(H)<1e-10)break;const B=3*O*(E-t)+6*R*v*(A-E)+3*w*(s-A);if(Math.abs(B)<1e-10)break;v=v-H/B,v=Math.max(0,Math.min(1,v))}r[x]=$*m+3*O*v*M+3*R*w*P+N*p}return r}}class An{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Zr(t,this.TimeBufferType),this.values=Zr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Zr(e.times,Array),values:Zr(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new th(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Rm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Im(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case _r:t=this.InterpolantFactoryMethodDiscrete;break;case xr:t=this.InterpolantFactoryMethodLinear;break;case Wa:t=this.InterpolantFactoryMethodSmooth;break;case Vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Se("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _r;case this.InterpolantFactoryMethodLinear:return xr;case this.InterpolantFactoryMethodSmooth:return Wa;case this.InterpolantFactoryMethodBezier:return Vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(we("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(we("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){we("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){we("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Tp(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){we("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wa,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,h=u-n,f=u+n;for(let g=0;g!==n;++g){const x=t[u+g];if(x!==t[h+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}An.prototype.ValueTypeName="";An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=xr;class Gs extends An{constructor(e,t,n){super(e,t,n)}}Gs.prototype.ValueTypeName="bool";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=_r;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class nh extends An{constructor(e,t,n,s){super(e,t,n,s)}}nh.prototype.ValueTypeName="color";class Ls extends An{constructor(e,t,n,s){super(e,t,n,s)}}Ls.prototype.ValueTypeName="number";class Lm extends zs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let d=c+o;c!==d;c+=4)nn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Ds extends An{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Lm(this.times,this.values,this.getValueSize(),e)}}Ds.prototype.ValueTypeName="quaternion";Ds.prototype.InterpolantFactoryMethodSmooth=void 0;class Hs extends An{constructor(e,t,n){super(e,t,n)}}Hs.prototype.ValueTypeName="string";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=_r;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ns extends An{constructor(e,t,n,s){super(e,t,n,s)}}Ns.prototype.ValueTypeName="vector";class Cl{constructor(e="",t=-1,n=[],s=Jl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Tn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Nm(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(An.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=Cm(l);l=Sd(l,1,d),c=Sd(c,1,d),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ls(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const u=d[1];let h=s[u];h||(s[u]=h=[]),h.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(Se("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return we("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,h,f,g,x){if(f.length!==0){const m=[],p=[];eh(f,m,p,g),m.length!==0&&x.push(new u(h,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const h=c[u].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let x=0;x<h[g].morphTargets.length;x++)f[h[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let S=0;S!==h[g].morphTargets.length;++S){const E=h[g];m.push(E.time),p.push(E.morphTarget===x?1:0)}s.push(new Ls(".morphTargetInfluence["+x+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(Ns,f+".position",h,"pos",s),n(Ds,f+".quaternion",h,"rot",s),n(Ns,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Dm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ls;case"vector":case"vector2":case"vector3":case"vector4":return Ns;case"color":return nh;case"quaternion":return Ds;case"bool":case"boolean":return Gs;case"string":return Hs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Nm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Dm(i.type);if(i.times===void 0){const t=[],n=[];eh(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const ei={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Md(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Md(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Md(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Um{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Fm=new Um;class ji{constructor(e){this.manager=e!==void 0?e:Fm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ji.DEFAULT_MATERIAL_NAME="__DEFAULT";const Kn={};class Om extends Error{constructor(e,t){super(e),this.response=t}}class wa extends ji{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ei.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Kn[e]!==void 0){Kn[e].push({onLoad:t,onProgress:n,onError:s});return}Kn[e]=[],Kn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Se("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=Kn[e],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){S();function S(){u.read().then(({done:E,value:M})=>{if(E)p.close();else{x+=M.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let A=0,P=d.length;A<P;A++){const v=d[A];v.onProgress&&v.onProgress(C)}p.enqueue(M),S()}},E=>{p.error(E)})}}});return new Response(m)}else throw new Om(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ei.add(`file:${e}`,c);const d=Kn[e];delete Kn[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=Kn[e];if(d===void 0)throw this.manager.itemError(e),c;delete Kn[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const hs=new WeakMap;class km extends ji{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ei.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=hs.get(a);u===void 0&&(u=[],hs.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=br("img");function l(){d(),t&&t(this);const u=hs.get(this)||[];for(let h=0;h<u.length;h++){const f=u[h];f.onLoad&&f.onLoad(this)}hs.delete(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),ei.remove(`image:${e}`);const h=hs.get(this)||[];for(let f=0;f<h.length;f++){const g=h[f];g.onError&&g.onError(u)}hs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ei.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Bm extends ji{constructor(e){super(e)}load(e,t,n,s){const r=new kt,a=new km(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Ua extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const xo=new Ge,Ed=new I,Td=new I;class uc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ed.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ed),Td.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Td),t.updateMatrixWorld(),xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===vr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Jr=new I,Qr=new nn,Rn=new I;class ih extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Jr,Qr,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jr,Qr,Rn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Jr,Qr,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jr,Qr,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const xi=new I,Ad=new Le,wd=new Le;class Jt extends ih{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,Ad,wd),t.subVectors(wd,Ad)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(dr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class zm extends uc{constructor(){super(new Jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Rs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Gm extends Ua{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Hm extends uc{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}}class Vm extends Ua{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Hm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Fa extends ih{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $m extends uc{constructor(){super(new Fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rl extends Ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new $m}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Wm extends Ua{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class hr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const vo=new WeakMap;class Xm extends ji{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Se("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Se("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ei.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{vo.has(a)===!0?(s&&s(vo.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){ei.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){s&&s(c),vo.set(l,c),ei.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ei.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const fs=-90,ps=1;class qm extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Jt(fs,ps,e,t);s.layers=this.layers,this.add(s);const r=new Jt(fs,ps,e,t);r.layers=this.layers,this.add(r);const a=new Jt(fs,ps,e,t);a.layers=this.layers,this.add(a);const o=new Jt(fs,ps,e,t);o.layers=this.layers,this.add(o);const l=new Jt(fs,ps,e,t);l.layers=this.layers,this.add(l);const c=new Jt(fs,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class jm extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ym{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){nn.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const a=this._workIndex*r;nn.multiplyQuaternionsFlat(e,a,e,t,e,n),nn.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*s}}}const hc="\\[\\]\\.:\\/",Km=new RegExp("["+hc+"]","g"),fc="[^"+hc+"]",Zm="[^"+hc.replace("\\.","")+"]",Jm=/((?:WC+[\/:])*)/.source.replace("WC",fc),Qm=/(WCOD+)?/.source.replace("WCOD",Zm),eg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fc),tg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fc),ng=new RegExp("^"+Jm+Qm+eg+tg+"$"),ig=["material","materials","bones","map"];class sg{constructor(e,t,n){const s=n||Qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Qe{constructor(e,t,n){this.path=t,this.parsedPath=n||Qe.parseTrackName(t),this.node=Qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Qe.Composite(e,t,n):new Qe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Km,"")}static parseTrackName(e){const t=ng.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);ig.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=Qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Se("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){we("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){we("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){we("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){we("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){we("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){we("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){we("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;we("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){we("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){we("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qe.Composite=sg;Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray];Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class rg{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,a=r.length,o=new Array(a),l={endingStart:xs,endingEnd:xs};for(let c=0;c!==a;++c){const d=r[c].createInterpolant(null);o[c]=d,d.settings&&Object.assign(l,d.settings),d.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=hp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case pp:for(let d=0,u=l.length;d!==u;++d)l[d].evaluate(a),c[d].accumulateAdditive(o);break;case Jl:default:for(let d=0,u=l.length;d!==u;++d)l[d].evaluate(a),c[d].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const a=n===fp;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===up){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){const o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=vs,s.endingEnd=vs):(e?s.endingStart=this.zeroSlopeAtStart?vs:xs:s.endingStart=ya,t?s.endingEnd=this.zeroSlopeAtEnd?vs:xs:s.endingEnd=ya)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}}const ag=new Float32Array(1);class og extends li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let d=c[l];d===void 0&&(d={},c[l]=d);for(let u=0;u!==r;++u){const h=s[u],f=h.name;let g=d[f];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const x=t&&t._propertyBindings[u].binding.parsedPath;g=new Ym(Qe.create(n,f,x),h.ValueTypeName,h.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],d=e._byClipCacheIndex;c._byClipCacheIndex=d,l[d]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete u[h],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new th(new Float32Array(2),new Float32Array(2),1,ag),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let a=typeof e=="string"?Cl.findByName(s,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Jl),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const d=new rg(this,a,t,n);return this._bindAction(d,c),this._addInactiveAction(d,o,r),d}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?Cl.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const d=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=d,t[d]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Cd=new Ge;class lg{constructor(e,t,n=0,s=1/0){this.ray=new Bs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):we("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Cd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cd),this}intersectObject(e,t=!0,n=[]){return Pl(e,this,n,t),n.sort(Rd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Pl(e[s],this,n,t);return n.sort(Rd),n}}function Rd(i,e){return i.distance-e.distance}function Pl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Pl(r[a],e,t,!0)}}class Pd{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ve(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ve(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Rc=class Rc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Rc.prototype.isMatrix2=!0;let Id=Rc;class cg extends Yu{constructor(e=10,t=10,n=4473924,s=8947848){n=new Ie(n),s=new Ie(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,f=0,g=-o;h<=t;h++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const x=h===r?n:s;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}const d=new jt;d.setAttribute("position",new Dt(l,3)),d.setAttribute("color",new Dt(c,3));const u=new lc({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class dg extends li{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Se("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ld(i,e,t,n){const s=ug(n);switch(t){case ku:return i*e;case jl:return i*e/s.components*s.byteLength;case Yl:return i*e/s.components*s.byteLength;case Wi:return i*e*2/s.components*s.byteLength;case Kl:return i*e*2/s.components*s.byteLength;case Bu:return i*e*3/s.components*s.byteLength;case gn:return i*e*4/s.components*s.byteLength;case Zl:return i*e*4/s.components*s.byteLength;case da:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ha:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qo:case Yo:return Math.max(i,16)*Math.max(e,8)/4;case Xo:case jo:return Math.max(i,8)*Math.max(e,8)/2;case Ko:case Zo:case Qo:case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jo:case va:case tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case il:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case sl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case rl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case al:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case cl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case pl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ml:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case gl:case _l:case xl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case vl:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ba:case yl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ug(i){switch(i){case cn:case Nu:return{byteLength:1,components:1};case mr:case Uu:case ai:return{byteLength:2,components:1};case Xl:case ql:return{byteLength:2,components:4};case zn:case Wl:case mn:return{byteLength:4,components:1};case Fu:case Ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$l}}));typeof window<"u"&&(window.__THREE__?Se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$l);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function hg(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,u[h]=x)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const x=u[f];i.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var fg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pg=`#ifdef USE_ALPHAHASH
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
#endif`,mg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_g=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vg=`#ifdef USE_AOMAP
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
#endif`,bg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Sg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ag=`#ifdef USE_IRIDESCENCE
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
#endif`,wg=`#ifdef USE_BUMPMAP
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
#endif`,Cg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ug=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Fg=`#define PI 3.141592653589793
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
} // validated`,Og=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kg=`vec3 transformedNormal = objectNormal;
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
#endif`,Bg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vg="gl_FragColor = linearToOutputTexel( gl_FragColor );",$g=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wg=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Xg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qg=`#ifdef USE_ENVMAP
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
#endif`,jg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yg=`#ifdef USE_ENVMAP
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
#endif`,Kg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,e_=`#ifdef USE_GRADIENTMAP
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
}`,t_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,n_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,i_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,s_=`uniform bool receiveShadow;
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
#endif
#include <lightprobes_pars_fragment>`,r_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
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
#endif`,a_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,o_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,l_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,c_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,u_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,h_=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,f_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,p_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,m_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,g_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,__=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,y_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,S_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,M_=`#if defined( USE_POINTS_UV )
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
#endif`,E_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,w_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,C_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,P_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,L_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,D_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,F_=`#ifdef USE_NORMALMAP
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
#endif`,O_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,k_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,B_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,z_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,G_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,H_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,V_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,W_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,X_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Y_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Z_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,J_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Q_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e0=`#ifdef USE_SKINNING
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
#endif`,t0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,n0=`#ifdef USE_SKINNING
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
#endif`,i0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,s0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,a0=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,o0=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,l0=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,p0=`uniform sampler2D t2D;
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
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`#include <common>
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
	#include <morphinstance_vertex>
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
}`,b0=`#if DEPTH_PACKING == 3200
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,y0=`#define DISTANCE
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
	#include <morphinstance_vertex>
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
}`,S0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T0=`uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A0=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,w0=`#include <common>
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
	#include <morphinstance_vertex>
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
}`,C0=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,R0=`#define LAMBERT
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
	#include <morphinstance_vertex>
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
}`,P0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,I0=`#define MATCAP
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
	#include <morphinstance_vertex>
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
}`,L0=`#define MATCAP
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,D0=`#define NORMAL
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
	#include <morphinstance_vertex>
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
}`,N0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,U0=`#define PHONG
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
	#include <morphinstance_vertex>
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
}`,F0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,O0=`#define STANDARD
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
	#include <morphinstance_vertex>
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
}`,k0=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,B0=`#define TOON
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
	#include <morphinstance_vertex>
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
}`,z0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,G0=`uniform float size;
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
	#include <morphinstance_vertex>
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
}`,H0=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,V0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,$0=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,W0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,X0=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,ze={alphahash_fragment:fg,alphahash_pars_fragment:pg,alphamap_fragment:mg,alphamap_pars_fragment:gg,alphatest_fragment:_g,alphatest_pars_fragment:xg,aomap_fragment:vg,aomap_pars_fragment:bg,batching_pars_vertex:yg,batching_vertex:Sg,begin_vertex:Mg,beginnormal_vertex:Eg,bsdfs:Tg,iridescence_fragment:Ag,bumpmap_pars_fragment:wg,clipping_planes_fragment:Cg,clipping_planes_pars_fragment:Rg,clipping_planes_pars_vertex:Pg,clipping_planes_vertex:Ig,color_fragment:Lg,color_pars_fragment:Dg,color_pars_vertex:Ng,color_vertex:Ug,common:Fg,cube_uv_reflection_fragment:Og,defaultnormal_vertex:kg,displacementmap_pars_vertex:Bg,displacementmap_vertex:zg,emissivemap_fragment:Gg,emissivemap_pars_fragment:Hg,colorspace_fragment:Vg,colorspace_pars_fragment:$g,envmap_fragment:Wg,envmap_common_pars_fragment:Xg,envmap_pars_fragment:qg,envmap_pars_vertex:jg,envmap_physical_pars_fragment:r_,envmap_vertex:Yg,fog_vertex:Kg,fog_pars_vertex:Zg,fog_fragment:Jg,fog_pars_fragment:Qg,gradientmap_pars_fragment:e_,lightmap_pars_fragment:t_,lights_lambert_fragment:n_,lights_lambert_pars_fragment:i_,lights_pars_begin:s_,lights_toon_fragment:a_,lights_toon_pars_fragment:o_,lights_phong_fragment:l_,lights_phong_pars_fragment:c_,lights_physical_fragment:d_,lights_physical_pars_fragment:u_,lights_fragment_begin:h_,lights_fragment_maps:f_,lights_fragment_end:p_,lightprobes_pars_fragment:m_,logdepthbuf_fragment:g_,logdepthbuf_pars_fragment:__,logdepthbuf_pars_vertex:x_,logdepthbuf_vertex:v_,map_fragment:b_,map_pars_fragment:y_,map_particle_fragment:S_,map_particle_pars_fragment:M_,metalnessmap_fragment:E_,metalnessmap_pars_fragment:T_,morphinstance_vertex:A_,morphcolor_vertex:w_,morphnormal_vertex:C_,morphtarget_pars_vertex:R_,morphtarget_vertex:P_,normal_fragment_begin:I_,normal_fragment_maps:L_,normal_pars_fragment:D_,normal_pars_vertex:N_,normal_vertex:U_,normalmap_pars_fragment:F_,clearcoat_normal_fragment_begin:O_,clearcoat_normal_fragment_maps:k_,clearcoat_pars_fragment:B_,iridescence_pars_fragment:z_,opaque_fragment:G_,packing:H_,premultiplied_alpha_fragment:V_,project_vertex:$_,dithering_fragment:W_,dithering_pars_fragment:X_,roughnessmap_fragment:q_,roughnessmap_pars_fragment:j_,shadowmap_pars_fragment:Y_,shadowmap_pars_vertex:K_,shadowmap_vertex:Z_,shadowmask_pars_fragment:J_,skinbase_vertex:Q_,skinning_pars_vertex:e0,skinning_vertex:t0,skinnormal_vertex:n0,specularmap_fragment:i0,specularmap_pars_fragment:s0,tonemapping_fragment:r0,tonemapping_pars_fragment:a0,transmission_fragment:o0,transmission_pars_fragment:l0,uv_pars_fragment:c0,uv_pars_vertex:d0,uv_vertex:u0,worldpos_vertex:h0,background_vert:f0,background_frag:p0,backgroundCube_vert:m0,backgroundCube_frag:g0,cube_vert:_0,cube_frag:x0,depth_vert:v0,depth_frag:b0,distance_vert:y0,distance_frag:S0,equirect_vert:M0,equirect_frag:E0,linedashed_vert:T0,linedashed_frag:A0,meshbasic_vert:w0,meshbasic_frag:C0,meshlambert_vert:R0,meshlambert_frag:P0,meshmatcap_vert:I0,meshmatcap_frag:L0,meshnormal_vert:D0,meshnormal_frag:N0,meshphong_vert:U0,meshphong_frag:F0,meshphysical_vert:O0,meshphysical_frag:k0,meshtoon_vert:B0,meshtoon_frag:z0,points_vert:G0,points_frag:H0,shadow_vert:V0,shadow_frag:$0,sprite_vert:W0,sprite_frag:X0},de={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},Ln={basic:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Kt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Kt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ie(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Kt([de.points,de.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Kt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Kt([de.common,de.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Kt([de.sprite,de.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:Kt([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:Kt([de.lights,de.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Ln.physical={uniforms:Kt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ea={r:0,b:0,g:0},q0=new Ge,rh=new Ue;rh.set(-1,0,0,0,1,0,0,0,1);function j0(i,e,t,n,s,r){const a=new Ie(0);let o=s===!0?0:1,l,c,d=null,u=0,h=null;function f(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){const M=S.backgroundBlurriness>0;E=e.get(E,M)}return E}function g(S){let E=!1;const M=f(S);M===null?m(a,o):M&&M.isColor&&(m(M,1),E=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(S,E){const M=f(E);M&&(M.isCubeTexture||M.mapping===La)?(c===void 0&&(c=new wt(new Jn(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Is(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(q0.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(rh),c.material.toneMapped=$e.getTransfer(M.colorSpace)!==et,(d!==M||u!==M.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,u=M.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new wt(new Na(2,2),new Gn({name:"BackgroundMaterial",uniforms:Is(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$e.getTransfer(M.colorSpace)!==et,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(ea,Qu(i)),t.buffers.color.setClear(ea.r,ea.g,ea.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:x,dispose:p}}function Y0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(R,O,$,X,U){let H=!1;const B=u(R,X,$,O);r!==B&&(r=B,c(r.object)),H=f(R,X,$,U),H&&g(R,X,$,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,M(R,O,$,X),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function d(R){return i.deleteVertexArray(R)}function u(R,O,$,X){const U=X.wireframe===!0;let H=n[O.id];H===void 0&&(H={},n[O.id]=H);const B=R.isInstancedMesh===!0?R.id:0;let ee=H[B];ee===void 0&&(ee={},H[B]=ee);let te=ee[$.id];te===void 0&&(te={},ee[$.id]=te);let ue=te[U];return ue===void 0&&(ue=h(l()),te[U]=ue),ue}function h(R){const O=[],$=[],X=[];for(let U=0;U<t;U++)O[U]=0,$[U]=0,X[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:$,attributeDivisors:X,object:R,attributes:{},index:null}}function f(R,O,$,X){const U=r.attributes,H=O.attributes;let B=0;const ee=$.getAttributes();for(const te in ee)if(ee[te].location>=0){const be=U[te];let Te=H[te];if(Te===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(Te=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(Te=R.instanceColor)),be===void 0||be.attribute!==Te||Te&&be.data!==Te.data)return!0;B++}return r.attributesNum!==B||r.index!==X}function g(R,O,$,X){const U={},H=O.attributes;let B=0;const ee=$.getAttributes();for(const te in ee)if(ee[te].location>=0){let be=H[te];be===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(be=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(be=R.instanceColor));const Te={};Te.attribute=be,be&&be.data&&(Te.data=be.data),U[te]=Te,B++}r.attributes=U,r.attributesNum=B,r.index=X}function x(){const R=r.newAttributes;for(let O=0,$=R.length;O<$;O++)R[O]=0}function m(R){p(R,0)}function p(R,O){const $=r.newAttributes,X=r.enabledAttributes,U=r.attributeDivisors;$[R]=1,X[R]===0&&(i.enableVertexAttribArray(R),X[R]=1),U[R]!==O&&(i.vertexAttribDivisor(R,O),U[R]=O)}function S(){const R=r.newAttributes,O=r.enabledAttributes;for(let $=0,X=O.length;$<X;$++)O[$]!==R[$]&&(i.disableVertexAttribArray($),O[$]=0)}function E(R,O,$,X,U,H,B){B===!0?i.vertexAttribIPointer(R,O,$,U,H):i.vertexAttribPointer(R,O,$,X,U,H)}function M(R,O,$,X){x();const U=X.attributes,H=$.getAttributes(),B=O.defaultAttributeValues;for(const ee in H){const te=H[ee];if(te.location>=0){let ue=U[ee];if(ue===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(ue=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(ue=R.instanceColor)),ue!==void 0){const be=ue.normalized,Te=ue.itemSize,Ke=e.get(ue);if(Ke===void 0)continue;const nt=Ke.buffer,ke=Ke.type,Z=Ke.bytesPerElement,pe=ke===i.INT||ke===i.UNSIGNED_INT||ue.gpuType===Wl;if(ue.isInterleavedBufferAttribute){const re=ue.data,Ce=re.stride,Ne=ue.offset;if(re.isInstancedInterleavedBuffer){for(let Re=0;Re<te.locationSize;Re++)p(te.location+Re,re.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Re=0;Re<te.locationSize;Re++)m(te.location+Re);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Re=0;Re<te.locationSize;Re++)E(te.location+Re,Te/te.locationSize,ke,be,Ce*Z,(Ne+Te/te.locationSize*Re)*Z,pe)}else{if(ue.isInstancedBufferAttribute){for(let re=0;re<te.locationSize;re++)p(te.location+re,ue.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let re=0;re<te.locationSize;re++)m(te.location+re);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let re=0;re<te.locationSize;re++)E(te.location+re,Te/te.locationSize,ke,be,Te*Z,Te/te.locationSize*re*Z,pe)}}else if(B!==void 0){const be=B[ee];if(be!==void 0)switch(be.length){case 2:i.vertexAttrib2fv(te.location,be);break;case 3:i.vertexAttrib3fv(te.location,be);break;case 4:i.vertexAttrib4fv(te.location,be);break;default:i.vertexAttrib1fv(te.location,be)}}}}S()}function C(){w();for(const R in n){const O=n[R];for(const $ in O){const X=O[$];for(const U in X){const H=X[U];for(const B in H)d(H[B].object),delete H[B];delete X[U]}}delete n[R]}}function A(R){if(n[R.id]===void 0)return;const O=n[R.id];for(const $ in O){const X=O[$];for(const U in X){const H=X[U];for(const B in H)d(H[B].object),delete H[B];delete X[U]}}delete n[R.id]}function P(R){for(const O in n){const $=n[O];for(const X in $){const U=$[X];if(U[R.id]===void 0)continue;const H=U[R.id];for(const B in H)d(H[B].object),delete H[B];delete U[R.id]}}}function v(R){for(const O in n){const $=n[O],X=R.isInstancedMesh===!0?R.id:0,U=$[X];if(U!==void 0){for(const H in U){const B=U[H];for(const ee in B)d(B[ee].object),delete B[ee];delete U[H]}delete $[X],Object.keys($).length===0&&delete n[O]}}}function w(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:N,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function K0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let h=0;for(let f=0;f<d;f++)h+=c[f];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Z0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==gn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===ai&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==cn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==mn&&!v)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Se("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,maxSamples:C,samples:A}}function J0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Si,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const S=r?0:n,E=S*4;let M=p.clippingState||null;l.value=M,M=d(g,h,E,f);for(let C=0;C!==E;++C)M[C]=t[C];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,M=f;E!==x;++E,M+=4)a.copy(u[E]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Ei=4,Dd=[.125,.215,.35,.446,.526,.582],Oi=20,Q0=256,nr=new Fa,Nd=new Ie;let bo=null,yo=0,So=0,Mo=!1;const ex=new I;class Ud{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=ex}=r;bo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),So=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Od(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bo,yo,So),this._renderer.xr.enabled=Mo,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$i||e.mapping===ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),So=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Lt,minFilter:Lt,generateMipmaps:!1,type:ai,format:gn,colorSpace:sn,depthBuffer:!1},s=Fd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fd(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tx(r)),this._blurMaterial=ix(r,e,t),this._ggxMaterial=nx(r,e,t)}return s}_compileMaterial(e){const t=new wt(new jt,e);this._renderer.compile(t,nr)}_sceneToCubeUV(e,t,n,s,r){const l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Nd),u.toneMapping=On,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wt(new Jn,new zi({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(Nd),p=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[E]));const C=this._cubeSize;ms(s,M*C,E>2?C:0,C,C),u.setRenderTarget(s),p&&u.render(x,l),u.render(e,l)}u.toneMapping=f,u.autoClear=h,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===$i||e.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=kd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Od());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ms(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,nr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),h=0+c*1.25,f=u*h,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Ei?n-g+Ei:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,ms(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(o,nr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,ms(e,m,p,3*x,2*x),s.setRenderTarget(e),s.render(o,nr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&we("blur direction must be either latitudinal or longitudinal!");const d=3,u=this._lodMeshes[s];u.material=c;const h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),x=r/g,m=isFinite(r)?1+Math.floor(d*x):Oi;m>Oi&&Se(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const p=[];let S=0;for(let P=0;P<Oi;++P){const v=P/x,w=Math.exp(-v*v/2);p.push(w),P===0?S+=w:P<m&&(S+=2*w)}for(let P=0;P<p.length;P++)p[P]=p[P]/S;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const M=this._sizeLods[s],C=3*M*(s>E-Ei?s-E+Ei:0),A=4*(this._cubeSize-M);ms(t,C,A,3*M,2*M),l.setRenderTarget(t),l.render(u,nr)}}function tx(i){const e=[],t=[],n=[];let s=i;const r=i-Ei+1+Dd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ei?l=Dd[a-i+Ei-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,x=3,m=2,p=1,S=new Float32Array(x*g*f),E=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let A=0;A<f;A++){const P=A%3*2/3-1,v=A>2?0:-1,w=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];S.set(w,x*g*A),E.set(h,m*g*A);const N=[A,A,A,A,A,A];M.set(N,p*g*A)}const C=new jt;C.setAttribute("position",new Ht(S,x)),C.setAttribute("uv",new Ht(E,m)),C.setAttribute("faceIndex",new Ht(M,p)),n.push(new wt(C,null)),s>Ei&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Fd(i,e,t){const n=new kn(i,e,t);return n.texture.mapping=La,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ms(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function nx(i,e,t){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Q0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Oa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function ix(i,e,t){const n=new Float32Array(Oi),s=new I(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Oa(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Od(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oa(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function kd(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Oa(){return`

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
	`}class ah extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Zu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Jn(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:ni});r.uniforms.tEquirect.value=t;const a=new wt(s,r),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Lt),new qm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function sx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){const f=h.mapping;if(f===Va||f===$a)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const x=new ah(g.height);return x.fromEquirectangularTexture(i,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,g=f===Va||f===$a,x=f===$i||f===ws;if(g||x){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Ud(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||x&&S&&l(S)?(n===null&&(n=new Ud(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",d),m.texture):null}}}return h}function o(h,f){return f===Va?h.mapping=$i:f===$a&&(h.mapping=ws),h}function l(h){let f=0;const g=6;for(let x=0;x<g;x++)h[x]!==void 0&&f++;return f===g}function c(h){const f=h.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(h){const f=h.target;f.removeEventListener("dispose",d);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function rx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Tl("WebGLRenderer: "+n+" extension not supported."),s}}}function ax(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let x=0;if(g===void 0)return;if(f!==null){const S=f.array;x=f.version;for(let E=0,M=S.length;E<M;E+=3){const C=S[E+0],A=S[E+1],P=S[E+2];h.push(C,A,A,P,P,C)}}else{const S=g.array;x=g.version;for(let E=0,M=S.length/3-1;E<M;E+=3){const C=E+0,A=E+1,P=E+2;h.push(C,A,A,P,P,C)}}const m=new(g.count>=65535?Xu:Wu)(h,1);m.version=x;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function ox(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,h){i.drawElements(n,h,r,u*a),t.update(h,n,1)}function c(u,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,u*a,f),t.update(h,n,f))}function d(u,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,u,0,f);let x=0;for(let m=0;m<f;m++)x+=h[m];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function lx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:we("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function cx(i,e,t){const n=new WeakMap,s=new dt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let N=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",N)};var f=N;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let C=o.attributes.position.count*M,A=1;C>e.maxTextureSize&&(A=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const P=new Float32Array(C*A*4*u),v=new Vu(P,C,A,u);v.type=mn,v.needsUpdate=!0;const w=M*4;for(let R=0;R<u;R++){const O=p[R],$=S[R],X=E[R],U=C*A*4*R;for(let H=0;H<O.count;H++){const B=H*w;g===!0&&(s.fromBufferAttribute(O,H),P[U+B+0]=s.x,P[U+B+1]=s.y,P[U+B+2]=s.z,P[U+B+3]=0),x===!0&&(s.fromBufferAttribute($,H),P[U+B+4]=s.x,P[U+B+5]=s.y,P[U+B+6]=s.z,P[U+B+7]=0),m===!0&&(s.fromBufferAttribute(X,H),P[U+B+8]=s.x,P[U+B+9]=s.y,P[U+B+10]=s.z,P[U+B+11]=X.itemSize===4?s.w:1)}}h={count:u,texture:v,size:new Le(C,A)},n.set(o,h),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function dx(i,e,t,n,s){let r=new WeakMap;function a(c){const d=s.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==d&&(f.update(),r.set(f,d))}return h}function o(){r=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const ux={[Tu]:"LINEAR_TONE_MAPPING",[Au]:"REINHARD_TONE_MAPPING",[wu]:"CINEON_TONE_MAPPING",[Cu]:"ACES_FILMIC_TONE_MAPPING",[Pu]:"AGX_TONE_MAPPING",[Iu]:"NEUTRAL_TONE_MAPPING",[Ru]:"CUSTOM_TONE_MAPPING"};function hx(i,e,t,n,s){const r=new kn(e,t,{type:i,depthBuffer:n,stencilBuffer:s,depthTexture:n?new Ps(e,t):void 0}),a=new kn(e,t,{type:ai,depthBuffer:!1,stencilBuffer:!1}),o=new jt;o.setAttribute("position",new Dt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Dt([0,2,0,0,2,0],2));const l=new Tm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new wt(o,l),d=new Fa(-1,1,1,-1,0,1);let u=null,h=null,f=!1,g,x=null,m=[],p=!1;this.setSize=function(S,E){r.setSize(S,E),a.setSize(S,E);for(let M=0;M<m.length;M++){const C=m[M];C.setSize&&C.setSize(S,E)}},this.setEffects=function(S){m=S,p=m.length>0&&m[0].isRenderPass===!0;const E=r.width,M=r.height;for(let C=0;C<m.length;C++){const A=m[C];A.setSize&&A.setSize(E,M)}},this.begin=function(S,E){if(f||S.toneMapping===On&&m.length===0)return!1;if(x=E,E!==null){const M=E.width,C=E.height;(r.width!==M||r.height!==C)&&this.setSize(M,C)}return p===!1&&S.setRenderTarget(r),g=S.toneMapping,S.toneMapping=On,!0},this.hasRenderPass=function(){return p},this.end=function(S,E){S.toneMapping=g,f=!0;let M=r,C=a;for(let A=0;A<m.length;A++){const P=m[A];if(P.enabled!==!1&&(P.render(S,C,M,E),P.needsSwap!==!1)){const v=M;M=C,C=v}}if(u!==S.outputColorSpace||h!==S.toneMapping){u=S.outputColorSpace,h=S.toneMapping,l.defines={},$e.getTransfer(u)===et&&(l.defines.SRGB_TRANSFER="");const A=ux[h];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,S.setRenderTarget(x),S.render(c,d),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const oh=new kt,Il=new Ps(1,1),lh=new Vu,ch=new Kp,dh=new Zu,Bd=[],zd=[],Gd=new Float32Array(16),Hd=new Float32Array(9),Vd=new Float32Array(4);function Vs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Bd[s];if(r===void 0&&(r=new Float32Array(s),Bd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Nt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ka(i,e){let t=zd[e];t===void 0&&(t=new Int32Array(e),zd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function fx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function px(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function _x(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;Vd.set(n),i.uniformMatrix2fv(this.addr,!1,Vd),Ut(t,n)}}function xx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;Hd.set(n),i.uniformMatrix3fv(this.addr,!1,Hd),Ut(t,n)}}function vx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;Gd.set(n),i.uniformMatrix4fv(this.addr,!1,Gd),Ut(t,n)}}function bx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function yx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function Mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function Ex(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Tx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function Ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function wx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function Cx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Il.compareFunction=t.isReversedDepthBuffer()?ec:Ql,r=Il):r=oh,t.setTexture2D(e||r,s)}function Rx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ch,s)}function Px(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||dh,s)}function Ix(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||lh,s)}function Lx(i){switch(i){case 5126:return fx;case 35664:return px;case 35665:return mx;case 35666:return gx;case 35674:return _x;case 35675:return xx;case 35676:return vx;case 5124:case 35670:return bx;case 35667:case 35671:return yx;case 35668:case 35672:return Sx;case 35669:case 35673:return Mx;case 5125:return Ex;case 36294:return Tx;case 36295:return Ax;case 36296:return wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Rx;case 35680:case 36300:case 36308:case 36293:return Px;case 36289:case 36303:case 36311:case 36292:return Ix}}function Dx(i,e){i.uniform1fv(this.addr,e)}function Nx(i,e){const t=Vs(e,this.size,2);i.uniform2fv(this.addr,t)}function Ux(i,e){const t=Vs(e,this.size,3);i.uniform3fv(this.addr,t)}function Fx(i,e){const t=Vs(e,this.size,4);i.uniform4fv(this.addr,t)}function Ox(i,e){const t=Vs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function kx(i,e){const t=Vs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Bx(i,e){const t=Vs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function zx(i,e){i.uniform1iv(this.addr,e)}function Gx(i,e){i.uniform2iv(this.addr,e)}function Hx(i,e){i.uniform3iv(this.addr,e)}function Vx(i,e){i.uniform4iv(this.addr,e)}function $x(i,e){i.uniform1uiv(this.addr,e)}function Wx(i,e){i.uniform2uiv(this.addr,e)}function Xx(i,e){i.uniform3uiv(this.addr,e)}function qx(i,e){i.uniform4uiv(this.addr,e)}function jx(i,e,t){const n=this.cache,s=e.length,r=ka(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Il:a=oh;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Yx(i,e,t){const n=this.cache,s=e.length,r=ka(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ch,r[a])}function Kx(i,e,t){const n=this.cache,s=e.length,r=ka(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||dh,r[a])}function Zx(i,e,t){const n=this.cache,s=e.length,r=ka(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||lh,r[a])}function Jx(i){switch(i){case 5126:return Dx;case 35664:return Nx;case 35665:return Ux;case 35666:return Fx;case 35674:return Ox;case 35675:return kx;case 35676:return Bx;case 5124:case 35670:return zx;case 35667:case 35671:return Gx;case 35668:case 35672:return Hx;case 35669:case 35673:return Vx;case 5125:return $x;case 36294:return Wx;case 36295:return Xx;case 36296:return qx;case 35678:case 36198:case 36298:case 36306:case 35682:return jx;case 35679:case 36299:case 36307:return Yx;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return Zx}}class Qx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lx(t.type)}}class ev{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jx(t.type)}}class tv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Eo=/(\w+)(\])?(\[|\.)?/g;function $d(i,e){i.seq.push(e),i.map[e.id]=e}function nv(i,e,t){const n=i.name,s=n.length;for(Eo.lastIndex=0;;){const r=Eo.exec(n),a=Eo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){$d(t,c===void 0?new Qx(o,i,e):new ev(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new tv(o),$d(t,u)),t=u}}}class pa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);nv(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Wd(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const iv=37297;let sv=0;function rv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Xd=new Ue;function av(i){$e._getMatrix(Xd,$e.workingColorSpace,i);const e=`mat3( ${Xd.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case Sa:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Se("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function qd(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+rv(i.getShaderSource(e),o)}else return r}function ov(i,e){const t=av(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const lv={[Tu]:"Linear",[Au]:"Reinhard",[wu]:"Cineon",[Cu]:"ACESFilmic",[Pu]:"AgX",[Iu]:"Neutral",[Ru]:"Custom"};function cv(i,e){const t=lv[e];return t===void 0?(Se("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ta=new I;function dv(){$e.getLuminanceCoefficients(ta);const i=ta.x.toFixed(4),e=ta.y.toFixed(4),t=ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function uv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function hv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function lr(i){return i!==""}function jd(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(i){return i.replace(pv,gv)}const mv=new Map;function gv(i,e){let t=ze[e];if(t===void 0){const n=mv.get(e);if(n!==void 0)t=ze[n],Se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ll(t)}const _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kd(i){return i.replace(_v,xv)}function xv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const vv={[la]:"SHADOWMAP_TYPE_PCF",[ar]:"SHADOWMAP_TYPE_VSM"};function bv(i){return vv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const yv={[$i]:"ENVMAP_TYPE_CUBE",[ws]:"ENVMAP_TYPE_CUBE",[La]:"ENVMAP_TYPE_CUBE_UV"};function Sv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":yv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Mv={[ws]:"ENVMAP_MODE_REFRACTION"};function Ev(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Mv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Tv={[Eu]:"ENVMAP_BLENDING_MULTIPLY",[lp]:"ENVMAP_BLENDING_MIX",[cp]:"ENVMAP_BLENDING_ADD"};function Av(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Tv[i.combine]||"ENVMAP_BLENDING_NONE"}function wv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Cv(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=bv(t),c=Sv(t),d=Ev(t),u=Av(t),h=wv(t),f=uv(t),g=hv(r),x=s.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),p.length>0&&(p+=`
`)):(m=[Zd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),p=[Zd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?ze.tonemapping_pars_fragment:"",t.toneMapping!==On?cv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,ov("linearToOutputTexel",t.outputColorSpace),dv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),a=Ll(a),a=jd(a,t),a=Yd(a,t),o=Ll(o),o=jd(o,t),o=Yd(o,t),a=Kd(a),o=Kd(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=S+m+a,M=S+p+o,C=Wd(s,s.VERTEX_SHADER,E),A=Wd(s,s.FRAGMENT_SHADER,M);s.attachShader(x,C),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(R){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(x)||"",$=s.getShaderInfoLog(C)||"",X=s.getShaderInfoLog(A)||"",U=O.trim(),H=$.trim(),B=X.trim();let ee=!0,te=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ee=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,C,A);else{const ue=qd(s,C,"vertex"),be=qd(s,A,"fragment");we("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+ue+`
`+be)}else U!==""?Se("WebGLProgram: Program Info Log:",U):(H===""||B==="")&&(te=!1);te&&(R.diagnostics={runnable:ee,programLog:U,vertexShader:{log:H,prefix:m},fragmentShader:{log:B,prefix:p}})}s.deleteShader(C),s.deleteShader(A),v=new pa(s,x),w=fv(s,x)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(x,iv)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=A,this}let Rv=0;class Pv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Iv(e),t.set(e,n)),n}}class Iv{constructor(e){this.id=Rv++,this.code=e,this.usedTimes=0}}function Lv(i){return i===Wi||i===va||i===ba}function Dv(i,e,t,n,s,r){const a=new ic,o=new Pv,l=new Set,c=[],d=new Map,u=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,w,N,R,O,$){const X=R.fog,U=O.geometry,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ee=e.get(v.envMap||H,B),te=ee&&ee.mapping===La?ee.image.height:null,ue=f[v.type];v.precision!==null&&(h=n.getMaxPrecision(v.precision),h!==v.precision&&Se("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const be=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Te=be!==void 0?be.length:0;let Ke=0;U.morphAttributes.position!==void 0&&(Ke=1),U.morphAttributes.normal!==void 0&&(Ke=2),U.morphAttributes.color!==void 0&&(Ke=3);let nt,ke,Z,pe;if(ue){const Fe=Ln[ue];nt=Fe.vertexShader,ke=Fe.fragmentShader}else nt=v.vertexShader,ke=v.fragmentShader,o.update(v),Z=o.getVertexShaderID(v),pe=o.getFragmentShaderID(v);const re=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Ne=O.isInstancedMesh===!0,Re=O.isBatchedMesh===!0,mt=!!v.map,qe=!!v.matcap,it=!!ee,ft=!!v.aoMap,Xe=!!v.lightMap,Ct=!!v.bumpMap,gt=!!v.normalMap,rn=!!v.displacementMap,D=!!v.emissiveMap,Rt=!!v.metalnessMap,je=!!v.roughnessMap,ut=v.anisotropy>0,ce=v.clearcoat>0,xt=v.dispersion>0,T=v.iridescence>0,_=v.sheen>0,k=v.transmission>0,Y=ut&&!!v.anisotropyMap,Q=ce&&!!v.clearcoatMap,ne=ce&&!!v.clearcoatNormalMap,le=ce&&!!v.clearcoatRoughnessMap,W=T&&!!v.iridescenceMap,K=T&&!!v.iridescenceThicknessMap,me=_&&!!v.sheenColorMap,xe=_&&!!v.sheenRoughnessMap,ae=!!v.specularMap,ie=!!v.specularColorMap,De=!!v.specularIntensityMap,Be=k&&!!v.transmissionMap,Je=k&&!!v.thicknessMap,L=!!v.gradientMap,se=!!v.alphaMap,j=v.alphaTest>0,ge=!!v.alphaHash,oe=!!v.extensions;let J=On;v.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(J=i.toneMapping);const Me={shaderID:ue,shaderType:v.type,shaderName:v.name,vertexShader:nt,fragmentShader:ke,defines:v.defines,customVertexShaderID:Z,customFragmentShaderID:pe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Re,batchingColor:Re&&O._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&O.instanceColor!==null,instancingMorph:Ne&&O.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:mt,matcap:qe,envMap:it,envMapMode:it&&ee.mapping,envMapCubeUVHeight:te,aoMap:ft,lightMap:Xe,bumpMap:Ct,normalMap:gt,displacementMap:rn,emissiveMap:D,normalMapObjectSpace:gt&&v.normalMapType===_p,normalMapTangentSpace:gt&&v.normalMapType===Ml,packedNormalMap:gt&&v.normalMapType===Ml&&Lv(v.normalMap.format),metalnessMap:Rt,roughnessMap:je,anisotropy:ut,anisotropyMap:Y,clearcoat:ce,clearcoatMap:Q,clearcoatNormalMap:ne,clearcoatRoughnessMap:le,dispersion:xt,iridescence:T,iridescenceMap:W,iridescenceThicknessMap:K,sheen:_,sheenColorMap:me,sheenRoughnessMap:xe,specularMap:ae,specularColorMap:ie,specularIntensityMap:De,transmission:k,transmissionMap:Be,thicknessMap:Je,gradientMap:L,opaque:v.transparent===!1&&v.blending===ys&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:j,alphaHash:ge,combine:v.combine,mapUv:mt&&g(v.map.channel),aoMapUv:ft&&g(v.aoMap.channel),lightMapUv:Xe&&g(v.lightMap.channel),bumpMapUv:Ct&&g(v.bumpMap.channel),normalMapUv:gt&&g(v.normalMap.channel),displacementMapUv:rn&&g(v.displacementMap.channel),emissiveMapUv:D&&g(v.emissiveMap.channel),metalnessMapUv:Rt&&g(v.metalnessMap.channel),roughnessMapUv:je&&g(v.roughnessMap.channel),anisotropyMapUv:Y&&g(v.anisotropyMap.channel),clearcoatMapUv:Q&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(v.sheenRoughnessMap.channel),specularMapUv:ae&&g(v.specularMap.channel),specularColorMapUv:ie&&g(v.specularColorMap.channel),specularIntensityMapUv:De&&g(v.specularIntensityMap.channel),transmissionMapUv:Be&&g(v.transmissionMap.channel),thicknessMapUv:Je&&g(v.thicknessMap.channel),alphaMapUv:se&&g(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(gt||ut),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&(mt||se),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&gt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ce,skinning:O.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ke,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:J,decodeVideoTexture:mt&&v.map.isVideoTexture===!0&&$e.getTransfer(v.map.colorSpace)===et,decodeVideoTextureEmissive:D&&v.emissiveMap.isVideoTexture===!0&&$e.getTransfer(v.emissiveMap.colorSpace)===et,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Dn,flipSided:v.side===tn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:oe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&v.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function m(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const N in v.defines)w.push(N),w.push(v.defines[N]);return v.isRawShaderMaterial===!1&&(p(w,v),S(w,v),w.push(i.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function p(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function S(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function E(v){const w=f[v.type];let N;if(w){const R=Ln[w];N=Sm.clone(R.uniforms)}else N=v.uniforms;return N}function M(v,w){let N=d.get(w);return N!==void 0?++N.usedTimes:(N=new Cv(i,w,v,s),c.push(N),d.set(w,N)),N}function C(v){if(--v.usedTimes===0){const w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:E,acquireProgram:M,releaseProgram:C,releaseShaderCache:A,programs:c,dispose:P}}function Nv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Uv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Jd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Qd(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,g,x,m,p){let S=i[e];return S===void 0?(S={id:h.id,object:h,geometry:f,material:g,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:p},i[e]=S):(S.id=h.id,S.object=h,S.geometry=f,S.material=g,S.materialVariant=a(h),S.groupOrder=x,S.renderOrder=h.renderOrder,S.z=m,S.group=p),e++,S}function l(h,f,g,x,m,p){const S=o(h,f,g,x,m,p);g.transmission>0?n.push(S):g.transparent===!0?s.push(S):t.push(S)}function c(h,f,g,x,m,p){const S=o(h,f,g,x,m,p);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function d(h,f){t.length>1&&t.sort(h||Uv),n.length>1&&n.sort(f||Jd),s.length>1&&s.sort(f||Jd)}function u(){for(let h=e,f=i.length;h<f;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:d}}function Fv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Qd,i.set(n,[a])):s>=r.length?(a=new Qd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ov(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ie};break;case"SpotLight":t={position:new I,direction:new I,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function kv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Bv=0;function zv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gv(i){const e=new Ov,t=kv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new Ge,a=new Ge;function o(c){let d=0,u=0,h=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,S=0,E=0,M=0,C=0,A=0,P=0;c.sort(zv);for(let w=0,N=c.length;w<N;w++){const R=c[w],O=R.color,$=R.intensity,X=R.distance;let U=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Wi?U=R.shadow.map.texture:U=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=O.r*$,u+=O.g*$,h+=O.b*$;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],$);P++}else if(R.isDirectionalLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const B=R.shadow,ee=t.get(R);ee.shadowIntensity=B.intensity,ee.shadowBias=B.bias,ee.shadowNormalBias=B.normalBias,ee.shadowRadius=B.radius,ee.shadowMapSize=B.mapSize,n.directionalShadow[f]=ee,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=R.shadow.matrix,S++}n.directional[f]=H,f++}else if(R.isSpotLight){const H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(O).multiplyScalar($),H.distance=X,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[x]=H;const B=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,B.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[x]=B.matrix,R.castShadow){const ee=t.get(R);ee.shadowIntensity=B.intensity,ee.shadowBias=B.bias,ee.shadowNormalBias=B.normalBias,ee.shadowRadius=B.radius,ee.shadowMapSize=B.mapSize,n.spotShadow[x]=ee,n.spotShadowMap[x]=U,M++}x++}else if(R.isRectAreaLight){const H=e.get(R);H.color.copy(O).multiplyScalar($),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=H,m++}else if(R.isPointLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const B=R.shadow,ee=t.get(R);ee.shadowIntensity=B.intensity,ee.shadowBias=B.bias,ee.shadowNormalBias=B.normalBias,ee.shadowRadius=B.radius,ee.shadowMapSize=B.mapSize,ee.shadowCameraNear=B.camera.near,ee.shadowCameraFar=B.camera.far,n.pointShadow[g]=ee,n.pointShadowMap[g]=U,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=H,g++}else if(R.isHemisphereLight){const H=e.get(R);H.skyColor.copy(R.color).multiplyScalar($),H.groundColor.copy(R.groundColor).multiplyScalar($),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const v=n.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==S||v.numPointShadows!==E||v.numSpotShadows!==M||v.numSpotMaps!==C||v.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,v.directionalLength=f,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=S,v.numPointShadows=E,v.numSpotShadows=M,v.numSpotMaps=C,v.numLightProbes=P,n.version=Bv++)}function l(c,d){let u=0,h=0,f=0,g=0,x=0;const m=d.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const E=c[p];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(E.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const M=n.hemi[x];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function eu(i){const e=new Gv(i),t=[],n=[],s=[];function r(h){u.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function d(h){e.setupView(t,h)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Hv(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new eu(i),e.set(s,[o])):r>=a.length?(o=new eu(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$v=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Wv=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Xv=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],tu=new Ge,ir=new I,To=new I;function qv(i,e,t){let n=new oc;const s=new Le,r=new Le,a=new dt,o=new Am,l=new wm,c={},d=t.maxTextureSize,u={[ri]:tn,[tn]:ri,[Dn]:Dn},h=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:Vv,fragmentShader:$v}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new jt;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new wt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=la;let p=this.type;this.render=function(A,P,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Vf&&(Se("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=la);const w=i.getRenderTarget(),N=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ni),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const $=p!==this.type;$&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(U=>U.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,U=A.length;X<U;X++){const H=A[X],B=H.shadow;if(B===void 0){Se("WebGLShadowMap:",H,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const ee=B.getFrameExtents();s.multiply(ee),r.copy(B.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ee.x),s.x=r.x*ee.x,B.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ee.y),s.y=r.y*ee.y,B.mapSize.y=r.y));const te=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=te,B.map===null||$===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===ar){if(H.isPointLight){Se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new kn(s.x,s.y,{format:Wi,type:ai,minFilter:Lt,magFilter:Lt,generateMipmaps:!1}),B.map.texture.name=H.name+".shadowMap",B.map.depthTexture=new Ps(s.x,s.y,mn),B.map.depthTexture.name=H.name+".shadowMapDepth",B.map.depthTexture.format=oi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=It,B.map.depthTexture.magFilter=It}else H.isPointLight?(B.map=new ah(s.x),B.map.depthTexture=new bm(s.x,zn)):(B.map=new kn(s.x,s.y),B.map.depthTexture=new Ps(s.x,s.y,zn)),B.map.depthTexture.name=H.name+".shadowMap",B.map.depthTexture.format=oi,this.type===la?(B.map.depthTexture.compareFunction=te?ec:Ql,B.map.depthTexture.minFilter=Lt,B.map.depthTexture.magFilter=Lt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=It,B.map.depthTexture.magFilter=It);B.camera.updateProjectionMatrix()}const ue=B.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<ue;be++){if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,be),i.clear();else{be===0&&(i.setRenderTarget(B.map),i.clear());const Te=B.getViewport(be);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),O.viewport(a)}if(H.isPointLight){const Te=B.camera,Ke=B.matrix,nt=H.distance||Te.far;nt!==Te.far&&(Te.far=nt,Te.updateProjectionMatrix()),ir.setFromMatrixPosition(H.matrixWorld),Te.position.copy(ir),To.copy(Te.position),To.add(Wv[be]),Te.up.copy(Xv[be]),Te.lookAt(To),Te.updateMatrixWorld(),Ke.makeTranslation(-ir.x,-ir.y,-ir.z),tu.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),B._frustum.setFromProjectionMatrix(tu,Te.coordinateSystem,Te.reversedDepth)}else B.updateMatrices(H);n=B.getFrustum(),M(P,v,B.camera,H,this.type)}B.isPointLightShadow!==!0&&this.type===ar&&S(B,v),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,N,R)};function S(A,P){const v=e.update(x);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new kn(s.x,s.y,{format:Wi,type:ai})),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,v,h,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,v,f,x,null)}function E(A,P,v,w){let N=null;const R=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)N=R;else if(N=v.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=N.uuid,$=P.uuid;let X=c[O];X===void 0&&(X={},c[O]=X);let U=X[$];U===void 0&&(U=N.clone(),X[$]=U,P.addEventListener("dispose",C)),N=U}if(N.visible=P.visible,N.wireframe=P.wireframe,w===ar?N.side=P.shadowSide!==null?P.shadowSide:P.side:N.side=P.shadowSide!==null?P.shadowSide:u[P.side],N.alphaMap=P.alphaMap,N.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,N.map=P.map,N.clipShadows=P.clipShadows,N.clippingPlanes=P.clippingPlanes,N.clipIntersection=P.clipIntersection,N.displacementMap=P.displacementMap,N.displacementScale=P.displacementScale,N.displacementBias=P.displacementBias,N.wireframeLinewidth=P.wireframeLinewidth,N.linewidth=P.linewidth,v.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const O=i.properties.get(N);O.light=v}return N}function M(A,P,v,w,N){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&N===ar)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const $=e.update(A),X=A.material;if(Array.isArray(X)){const U=$.groups;for(let H=0,B=U.length;H<B;H++){const ee=U[H],te=X[ee.materialIndex];if(te&&te.visible){const ue=E(A,te,w,N);A.onBeforeShadow(i,A,P,v,$,ue,ee),i.renderBufferDirect(v,null,$,ue,A,ee),A.onAfterShadow(i,A,P,v,$,ue,ee)}}}else if(X.visible){const U=E(A,X,w,N);A.onBeforeShadow(i,A,P,v,$,U,null),i.renderBufferDirect(v,null,$,U,A,null),A.onAfterShadow(i,A,P,v,$,U,null)}}const O=A.children;for(let $=0,X=O.length;$<X;$++)M(O[$],P,v,w,N)}function C(A){A.target.removeEventListener("dispose",C);for(const v in c){const w=c[v],N=A.target.uuid;N in w&&(w[N].dispose(),delete w[N])}}}function jv(i,e){function t(){let L=!1;const se=new dt;let j=null;const ge=new dt(0,0,0,0);return{setMask:function(oe){j!==oe&&!L&&(i.colorMask(oe,oe,oe,oe),j=oe)},setLocked:function(oe){L=oe},setClear:function(oe,J,Me,Fe,bt){bt===!0&&(oe*=Fe,J*=Fe,Me*=Fe),se.set(oe,J,Me,Fe),ge.equals(se)===!1&&(i.clearColor(oe,J,Me,Fe),ge.copy(se))},reset:function(){L=!1,j=null,ge.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,j=null,ge=null,oe=null;return{setReversed:function(J){if(se!==J){const Me=e.get("EXT_clip_control");J?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),se=J;const Fe=oe;oe=null,this.setClear(Fe)}},getReversed:function(){return se},setTest:function(J){J?re(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(J){j!==J&&!L&&(i.depthMask(J),j=J)},setFunc:function(J){if(se&&(J=Cp[J]),ge!==J){switch(J){case Bo:i.depthFunc(i.NEVER);break;case zo:i.depthFunc(i.ALWAYS);break;case Go:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case Ho:i.depthFunc(i.EQUAL);break;case Vo:i.depthFunc(i.GEQUAL);break;case $o:i.depthFunc(i.GREATER);break;case Wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=J}},setLocked:function(J){L=J},setClear:function(J){oe!==J&&(oe=J,se&&(J=1-J),i.clearDepth(J))},reset:function(){L=!1,j=null,ge=null,oe=null,se=!1}}}function s(){let L=!1,se=null,j=null,ge=null,oe=null,J=null,Me=null,Fe=null,bt=null;return{setTest:function(st){L||(st?re(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(st){se!==st&&!L&&(i.stencilMask(st),se=st)},setFunc:function(st,$n,wn){(j!==st||ge!==$n||oe!==wn)&&(i.stencilFunc(st,$n,wn),j=st,ge=$n,oe=wn)},setOp:function(st,$n,wn){(J!==st||Me!==$n||Fe!==wn)&&(i.stencilOp(st,$n,wn),J=st,Me=$n,Fe=wn)},setLocked:function(st){L=st},setClear:function(st){bt!==st&&(i.clearStencil(st),bt=st)},reset:function(){L=!1,se=null,j=null,ge=null,oe=null,J=null,Me=null,Fe=null,bt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h={},f=new WeakMap,g=[],x=null,m=!1,p=null,S=null,E=null,M=null,C=null,A=null,P=null,v=new Ie(0,0,0),w=0,N=!1,R=null,O=null,$=null,X=null,U=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,ee=0;const te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),B=ee>=1):te.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),B=ee>=2);let ue=null,be={};const Te=i.getParameter(i.SCISSOR_BOX),Ke=i.getParameter(i.VIEWPORT),nt=new dt().fromArray(Te),ke=new dt().fromArray(Ke);function Z(L,se,j,ge){const oe=new Uint8Array(4),J=i.createTexture();i.bindTexture(L,J),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<j;Me++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(se+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return J}const pe={};pe[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),pe[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pe[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(As),Ct(!1),gt(kc),re(i.CULL_FACE),ft(ni);function re(L){d[L]!==!0&&(i.enable(L),d[L]=!0)}function Ce(L){d[L]!==!1&&(i.disable(L),d[L]=!1)}function Ne(L,se){return h[L]!==se?(i.bindFramebuffer(L,se),h[L]=se,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Re(L,se){let j=g,ge=!1;if(L){j=f.get(se),j===void 0&&(j=[],f.set(se,j));const oe=L.textures;if(j.length!==oe.length||j[0]!==i.COLOR_ATTACHMENT0){for(let J=0,Me=oe.length;J<Me;J++)j[J]=i.COLOR_ATTACHMENT0+J;j.length=oe.length,ge=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ge=!0);ge&&i.drawBuffers(j)}function mt(L){return x!==L?(i.useProgram(L),x=L,!0):!1}const qe={[Fi]:i.FUNC_ADD,[Wf]:i.FUNC_SUBTRACT,[Xf]:i.FUNC_REVERSE_SUBTRACT};qe[qf]=i.MIN,qe[jf]=i.MAX;const it={[Yf]:i.ZERO,[Kf]:i.ONE,[Zf]:i.SRC_COLOR,[Oo]:i.SRC_ALPHA,[ip]:i.SRC_ALPHA_SATURATE,[tp]:i.DST_COLOR,[Qf]:i.DST_ALPHA,[Jf]:i.ONE_MINUS_SRC_COLOR,[ko]:i.ONE_MINUS_SRC_ALPHA,[np]:i.ONE_MINUS_DST_COLOR,[ep]:i.ONE_MINUS_DST_ALPHA,[sp]:i.CONSTANT_COLOR,[rp]:i.ONE_MINUS_CONSTANT_COLOR,[ap]:i.CONSTANT_ALPHA,[op]:i.ONE_MINUS_CONSTANT_ALPHA};function ft(L,se,j,ge,oe,J,Me,Fe,bt,st){if(L===ni){m===!0&&(Ce(i.BLEND),m=!1);return}if(m===!1&&(re(i.BLEND),m=!0),L!==$f){if(L!==p||st!==N){if((S!==Fi||C!==Fi)&&(i.blendEquation(i.FUNC_ADD),S=Fi,C=Fi),st)switch(L){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bc:i.blendFunc(i.ONE,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:we("WebGLState: Invalid blending: ",L);break}else switch(L){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zc:we("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gc:we("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:we("WebGLState: Invalid blending: ",L);break}E=null,M=null,A=null,P=null,v.set(0,0,0),w=0,p=L,N=st}return}oe=oe||se,J=J||j,Me=Me||ge,(se!==S||oe!==C)&&(i.blendEquationSeparate(qe[se],qe[oe]),S=se,C=oe),(j!==E||ge!==M||J!==A||Me!==P)&&(i.blendFuncSeparate(it[j],it[ge],it[J],it[Me]),E=j,M=ge,A=J,P=Me),(Fe.equals(v)===!1||bt!==w)&&(i.blendColor(Fe.r,Fe.g,Fe.b,bt),v.copy(Fe),w=bt),p=L,N=!1}function Xe(L,se){L.side===Dn?Ce(i.CULL_FACE):re(i.CULL_FACE);let j=L.side===tn;se&&(j=!j),Ct(j),L.blending===ys&&L.transparent===!1?ft(ni):ft(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const ge=L.stencilWrite;o.setTest(ge),ge&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),D(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(L){R!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),R=L)}function gt(L){L!==Gf?(re(i.CULL_FACE),L!==O&&(L===kc?i.cullFace(i.BACK):L===Hf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),O=L}function rn(L){L!==$&&(B&&i.lineWidth(L),$=L)}function D(L,se,j){L?(re(i.POLYGON_OFFSET_FILL),(X!==se||U!==j)&&(X=se,U=j,a.getReversed()&&(se=-se),i.polygonOffset(se,j))):Ce(i.POLYGON_OFFSET_FILL)}function Rt(L){L?re(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function je(L){L===void 0&&(L=i.TEXTURE0+H-1),ue!==L&&(i.activeTexture(L),ue=L)}function ut(L,se,j){j===void 0&&(ue===null?j=i.TEXTURE0+H-1:j=ue);let ge=be[j];ge===void 0&&(ge={type:void 0,texture:void 0},be[j]=ge),(ge.type!==L||ge.texture!==se)&&(ue!==j&&(i.activeTexture(j),ue=j),i.bindTexture(L,se||pe[L]),ge.type=L,ge.texture=se)}function ce(){const L=be[ue];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function xt(){try{i.compressedTexImage2D(...arguments)}catch(L){we("WebGLState:",L)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(L){we("WebGLState:",L)}}function _(){try{i.texSubImage2D(...arguments)}catch(L){we("WebGLState:",L)}}function k(){try{i.texSubImage3D(...arguments)}catch(L){we("WebGLState:",L)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(L){we("WebGLState:",L)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(L){we("WebGLState:",L)}}function ne(){try{i.texStorage2D(...arguments)}catch(L){we("WebGLState:",L)}}function le(){try{i.texStorage3D(...arguments)}catch(L){we("WebGLState:",L)}}function W(){try{i.texImage2D(...arguments)}catch(L){we("WebGLState:",L)}}function K(){try{i.texImage3D(...arguments)}catch(L){we("WebGLState:",L)}}function me(L){return u[L]!==void 0?u[L]:i.getParameter(L)}function xe(L,se){u[L]!==se&&(i.pixelStorei(L,se),u[L]=se)}function ae(L){nt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),nt.copy(L))}function ie(L){ke.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),ke.copy(L))}function De(L,se){let j=c.get(se);j===void 0&&(j=new WeakMap,c.set(se,j));let ge=j.get(L);ge===void 0&&(ge=i.getUniformBlockIndex(se,L.name),j.set(L,ge))}function Be(L,se){const ge=c.get(se).get(L);l.get(se)!==ge&&(i.uniformBlockBinding(se,ge,L.__bindingPointIndex),l.set(se,ge))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},u={},ue=null,be={},h={},f=new WeakMap,g=[],x=null,m=!1,p=null,S=null,E=null,M=null,C=null,A=null,P=null,v=new Ie(0,0,0),w=0,N=!1,R=null,O=null,$=null,X=null,U=null,nt.set(0,0,i.canvas.width,i.canvas.height),ke.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:Ce,bindFramebuffer:Ne,drawBuffers:Re,useProgram:mt,setBlending:ft,setMaterial:Xe,setFlipSided:Ct,setCullFace:gt,setLineWidth:rn,setPolygonOffset:D,setScissorTest:Rt,activeTexture:je,bindTexture:ut,unbindTexture:ce,compressedTexImage2D:xt,compressedTexImage3D:T,texImage2D:W,texImage3D:K,pixelStorei:xe,getParameter:me,updateUBOMapping:De,uniformBlockBinding:Be,texStorage2D:ne,texStorage3D:le,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:Y,compressedTexSubImage3D:Q,scissor:ae,viewport:ie,reset:Je}}function Yv(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Le,d=new WeakMap,u=new Set;let h;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(T,_){return g?new OffscreenCanvas(T,_):br("canvas")}function m(T,_,k){let Y=1;const Q=xt(T);if((Q.width>k||Q.height>k)&&(Y=k/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ne=Math.floor(Y*Q.width),le=Math.floor(Y*Q.height);h===void 0&&(h=x(ne,le));const W=_?x(ne,le):h;return W.width=ne,W.height=le,W.getContext("2d").drawImage(T,0,0,ne,le),Se("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ne+"x"+le+")."),W}else return"data"in T&&Se("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function p(T){return T.generateMipmaps}function S(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(T,_,k,Y,Q,ne=!1){if(T!==null){if(i[T]!==void 0)return i[T];Se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let le;Y&&(le=e.get("EXT_texture_norm16"),le||Se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=_;if(_===i.RED&&(k===i.FLOAT&&(W=i.R32F),k===i.HALF_FLOAT&&(W=i.R16F),k===i.UNSIGNED_BYTE&&(W=i.R8),k===i.UNSIGNED_SHORT&&le&&(W=le.R16_EXT),k===i.SHORT&&le&&(W=le.R16_SNORM_EXT)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.R8UI),k===i.UNSIGNED_SHORT&&(W=i.R16UI),k===i.UNSIGNED_INT&&(W=i.R32UI),k===i.BYTE&&(W=i.R8I),k===i.SHORT&&(W=i.R16I),k===i.INT&&(W=i.R32I)),_===i.RG&&(k===i.FLOAT&&(W=i.RG32F),k===i.HALF_FLOAT&&(W=i.RG16F),k===i.UNSIGNED_BYTE&&(W=i.RG8),k===i.UNSIGNED_SHORT&&le&&(W=le.RG16_EXT),k===i.SHORT&&le&&(W=le.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.RG8UI),k===i.UNSIGNED_SHORT&&(W=i.RG16UI),k===i.UNSIGNED_INT&&(W=i.RG32UI),k===i.BYTE&&(W=i.RG8I),k===i.SHORT&&(W=i.RG16I),k===i.INT&&(W=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.RGB8UI),k===i.UNSIGNED_SHORT&&(W=i.RGB16UI),k===i.UNSIGNED_INT&&(W=i.RGB32UI),k===i.BYTE&&(W=i.RGB8I),k===i.SHORT&&(W=i.RGB16I),k===i.INT&&(W=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),k===i.UNSIGNED_INT&&(W=i.RGBA32UI),k===i.BYTE&&(W=i.RGBA8I),k===i.SHORT&&(W=i.RGBA16I),k===i.INT&&(W=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_SHORT&&le&&(W=le.RGB16_EXT),k===i.SHORT&&le&&(W=le.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),_===i.RGBA){const K=ne?Sa:$e.getTransfer(Q);k===i.FLOAT&&(W=i.RGBA32F),k===i.HALF_FLOAT&&(W=i.RGBA16F),k===i.UNSIGNED_BYTE&&(W=K===et?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&le&&(W=le.RGBA16_EXT),k===i.SHORT&&le&&(W=le.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function C(T,_){let k;return T?_===null||_===zn||_===gr?k=i.DEPTH24_STENCIL8:_===mn?k=i.DEPTH32F_STENCIL8:_===mr&&(k=i.DEPTH24_STENCIL8,Se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===zn||_===gr?k=i.DEPTH_COMPONENT24:_===mn?k=i.DEPTH_COMPONENT32F:_===mr&&(k=i.DEPTH_COMPONENT16),k}function A(T,_){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==It&&T.minFilter!==Lt?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function P(T){const _=T.target;_.removeEventListener("dispose",P),w(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&u.delete(_)}function v(T){const _=T.target;_.removeEventListener("dispose",v),R(_)}function w(T){const _=n.get(T);if(_.__webglInit===void 0)return;const k=T.source,Y=f.get(k);if(Y){const Q=Y[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&N(T),Object.keys(Y).length===0&&f.delete(k)}n.remove(T)}function N(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const k=T.source,Y=f.get(k);delete Y[_.__cacheKey],a.memory.textures--}function R(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let Q=0;Q<_.__webglFramebuffer[Y].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[Y][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=T.textures;for(let Y=0,Q=k.length;Y<Q;Y++){const ne=n.get(k[Y]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(k[Y])}n.remove(T)}let O=0;function $(){O=0}function X(){return O}function U(T){O=T}function H(){const T=O;return T>=s.maxTextures&&Se("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),O+=1,T}function B(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function ee(T,_){const k=n.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&k.__version!==T.version){const Y=T.image;if(Y===null)Se("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Se("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(k,T,_);return}}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function te(T,_){const k=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Ce(k,T,_);return}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function ue(T,_){const k=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Ce(k,T,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function be(T,_){const k=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&k.__version!==T.version){Ne(k,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}const Te={[Cs]:i.REPEAT,[Nn]:i.CLAMP_TO_EDGE,[xa]:i.MIRRORED_REPEAT},Ke={[It]:i.NEAREST,[Du]:i.NEAREST_MIPMAP_NEAREST,[or]:i.NEAREST_MIPMAP_LINEAR,[Lt]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},nt={[xp]:i.NEVER,[Mp]:i.ALWAYS,[vp]:i.LESS,[Ql]:i.LEQUAL,[bp]:i.EQUAL,[ec]:i.GEQUAL,[yp]:i.GREATER,[Sp]:i.NOTEQUAL};function ke(T,_){if(_.type===mn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Lt||_.magFilter===ca||_.magFilter===or||_.magFilter===Zn||_.minFilter===Lt||_.minFilter===ca||_.minFilter===or||_.minFilter===Zn)&&Se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Te[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Te[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Te[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Ke[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Ke[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,nt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===It||_.minFilter!==or&&_.minFilter!==Zn||_.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Z(T,_){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",P));const Y=_.source;let Q=f.get(Y);Q===void 0&&(Q={},f.set(Y,Q));const ne=B(_);if(ne!==T.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[ne].usedTimes++;const le=Q[T.__cacheKey];le!==void 0&&(Q[T.__cacheKey].usedTimes--,le.usedTimes===0&&N(_)),T.__cacheKey=ne,T.__webglTexture=Q[ne].texture}return k}function pe(T,_,k){return Math.floor(Math.floor(T/k)/_)}function re(T,_,k,Y){const ne=T.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,Y,_.data);else{ne.sort((xe,ae)=>xe.start-ae.start);let le=0;for(let xe=1;xe<ne.length;xe++){const ae=ne[le],ie=ne[xe],De=ae.start+ae.count,Be=pe(ie.start,_.width,4),Je=pe(ae.start,_.width,4);ie.start<=De+1&&Be===Je&&pe(ie.start+ie.count-1,_.width,4)===Be?ae.count=Math.max(ae.count,ie.start+ie.count-ae.start):(++le,ne[le]=ie)}ne.length=le+1;const W=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let xe=0,ae=ne.length;xe<ae;xe++){const ie=ne[xe],De=Math.floor(ie.start/4),Be=Math.ceil(ie.count/4),Je=De%_.width,L=Math.floor(De/_.width),se=Be,j=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,Je,L,se,j,k,Y,_.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,W),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function Ce(T,_,k){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const Q=Z(T,_),ne=_.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+k);const le=n.get(ne);if(ne.version!==le.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const j=$e.getPrimaries($e.workingColorSpace),ge=_.colorSpace===Mi?null:$e.getPrimaries(_.colorSpace),oe=_.colorSpace===Mi||j===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let K=m(_.image,!1,s.maxTextureSize);K=ce(_,K);const me=r.convert(_.format,_.colorSpace),xe=r.convert(_.type);let ae=M(_.internalFormat,me,xe,_.normalized,_.colorSpace,_.isVideoTexture);ke(Y,_);let ie;const De=_.mipmaps,Be=_.isVideoTexture!==!0,Je=le.__version===void 0||Q===!0,L=ne.dataReady,se=A(_,K);if(_.isDepthTexture)ae=C(_.format===Bi,_.type),Je&&(Be?t.texStorage2D(i.TEXTURE_2D,1,ae,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,ae,K.width,K.height,0,me,xe,null));else if(_.isDataTexture)if(De.length>0){Be&&Je&&t.texStorage2D(i.TEXTURE_2D,se,ae,De[0].width,De[0].height);for(let j=0,ge=De.length;j<ge;j++)ie=De[j],Be?L&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,ie.width,ie.height,me,xe,ie.data):t.texImage2D(i.TEXTURE_2D,j,ae,ie.width,ie.height,0,me,xe,ie.data);_.generateMipmaps=!1}else Be?(Je&&t.texStorage2D(i.TEXTURE_2D,se,ae,K.width,K.height),L&&re(_,K,me,xe)):t.texImage2D(i.TEXTURE_2D,0,ae,K.width,K.height,0,me,xe,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Be&&Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,ae,De[0].width,De[0].height,K.depth);for(let j=0,ge=De.length;j<ge;j++)if(ie=De[j],_.format!==gn)if(me!==null)if(Be){if(L)if(_.layerUpdates.size>0){const oe=Ld(ie.width,ie.height,_.format,_.type);for(const J of _.layerUpdates){const Me=ie.data.subarray(J*oe/ie.data.BYTES_PER_ELEMENT,(J+1)*oe/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,J,ie.width,ie.height,1,me,Me)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ie.width,ie.height,K.depth,me,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,ae,ie.width,ie.height,K.depth,0,ie.data,0,0);else Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ie.width,ie.height,K.depth,me,xe,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,j,ae,ie.width,ie.height,K.depth,0,me,xe,ie.data)}else{Be&&Je&&t.texStorage2D(i.TEXTURE_2D,se,ae,De[0].width,De[0].height);for(let j=0,ge=De.length;j<ge;j++)ie=De[j],_.format!==gn?me!==null?Be?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,ie.width,ie.height,me,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,j,ae,ie.width,ie.height,0,ie.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?L&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,ie.width,ie.height,me,xe,ie.data):t.texImage2D(i.TEXTURE_2D,j,ae,ie.width,ie.height,0,me,xe,ie.data)}else if(_.isDataArrayTexture)if(Be){if(Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,ae,K.width,K.height,K.depth),L)if(_.layerUpdates.size>0){const j=Ld(K.width,K.height,_.format,_.type);for(const ge of _.layerUpdates){const oe=K.data.subarray(ge*j/K.data.BYTES_PER_ELEMENT,(ge+1)*j/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,K.width,K.height,1,me,xe,oe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,me,xe,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ae,K.width,K.height,K.depth,0,me,xe,K.data);else if(_.isData3DTexture)Be?(Je&&t.texStorage3D(i.TEXTURE_3D,se,ae,K.width,K.height,K.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,me,xe,K.data)):t.texImage3D(i.TEXTURE_3D,0,ae,K.width,K.height,K.depth,0,me,xe,K.data);else if(_.isFramebufferTexture){if(Je)if(Be)t.texStorage2D(i.TEXTURE_2D,se,ae,K.width,K.height);else{let j=K.width,ge=K.height;for(let oe=0;oe<se;oe++)t.texImage2D(i.TEXTURE_2D,oe,ae,j,ge,0,me,xe,null),j>>=1,ge>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),K.parentNode!==j){j.appendChild(K),u.add(_),j.onpaint=Fe=>{const bt=Fe.changedElements;for(const st of u)bt.includes(st.image)&&(st.needsUpdate=!0)},j.requestPaint();return}const ge=0,oe=i.RGBA,J=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,ge,oe,J,Me,K),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Be&&Je){const j=xt(De[0]);t.texStorage2D(i.TEXTURE_2D,se,ae,j.width,j.height)}for(let j=0,ge=De.length;j<ge;j++)ie=De[j],Be?L&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,me,xe,ie):t.texImage2D(i.TEXTURE_2D,j,ae,me,xe,ie);_.generateMipmaps=!1}else if(Be){if(Je){const j=xt(K);t.texStorage2D(i.TEXTURE_2D,se,ae,j.width,j.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,xe,K)}else t.texImage2D(i.TEXTURE_2D,0,ae,me,xe,K);p(_)&&S(Y),le.__version=ne.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ne(T,_,k){if(_.image.length!==6)return;const Y=Z(T,_),Q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+k);const ne=n.get(Q);if(Q.version!==ne.__version||Y===!0){t.activeTexture(i.TEXTURE0+k);const le=$e.getPrimaries($e.workingColorSpace),W=_.colorSpace===Mi?null:$e.getPrimaries(_.colorSpace),K=_.colorSpace===Mi||le===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const me=_.isCompressedTexture||_.image[0].isCompressedTexture,xe=_.image[0]&&_.image[0].isDataTexture,ae=[];for(let J=0;J<6;J++)!me&&!xe?ae[J]=m(_.image[J],!0,s.maxCubemapSize):ae[J]=xe?_.image[J].image:_.image[J],ae[J]=ce(_,ae[J]);const ie=ae[0],De=r.convert(_.format,_.colorSpace),Be=r.convert(_.type),Je=M(_.internalFormat,De,Be,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,se=ne.__version===void 0||Y===!0,j=Q.dataReady;let ge=A(_,ie);ke(i.TEXTURE_CUBE_MAP,_);let oe;if(me){L&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Je,ie.width,ie.height);for(let J=0;J<6;J++){oe=ae[J].mipmaps;for(let Me=0;Me<oe.length;Me++){const Fe=oe[Me];_.format!==gn?De!==null?L?j&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,Fe.width,Fe.height,De,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,Je,Fe.width,Fe.height,0,Fe.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?j&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,Fe.width,Fe.height,De,Be,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,Je,Fe.width,Fe.height,0,De,Be,Fe.data)}}}else{if(oe=_.mipmaps,L&&se){oe.length>0&&ge++;const J=xt(ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Je,J.width,J.height)}for(let J=0;J<6;J++)if(xe){L?j&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ae[J].width,ae[J].height,De,Be,ae[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Je,ae[J].width,ae[J].height,0,De,Be,ae[J].data);for(let Me=0;Me<oe.length;Me++){const bt=oe[Me].image[J].image;L?j&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,bt.width,bt.height,De,Be,bt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,Je,bt.width,bt.height,0,De,Be,bt.data)}}else{L?j&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,De,Be,ae[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Je,De,Be,ae[J]);for(let Me=0;Me<oe.length;Me++){const Fe=oe[Me];L?j&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,De,Be,Fe.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,Je,De,Be,Fe.image[J])}}}p(_)&&S(i.TEXTURE_CUBE_MAP),ne.__version=Q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Re(T,_,k,Y,Q,ne){const le=r.convert(k.format,k.colorSpace),W=r.convert(k.type),K=M(k.internalFormat,le,W,k.normalized,k.colorSpace),me=n.get(_),xe=n.get(k);if(xe.__renderTarget=_,!me.__hasExternalTextures){const ae=Math.max(1,_.width>>ne),ie=Math.max(1,_.height>>ne);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,K,ae,ie,_.depth,0,le,W,null):t.texImage2D(Q,ne,K,ae,ie,0,le,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),je(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Q,xe.__webglTexture,0,Rt(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Q,xe.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(T,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const Y=_.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,ne=C(_.stencilBuffer,Q),le=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;je(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt(_),ne,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt(_),ne,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ne,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,T)}else{const Y=_.textures;for(let Q=0;Q<Y.length;Q++){const ne=Y[Q],le=r.convert(ne.format,ne.colorSpace),W=r.convert(ne.type),K=M(ne.internalFormat,le,W,ne.normalized,ne.colorSpace);je(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt(_),K,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt(_),K,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,K,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function qe(T,_,k){const Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_.depthTexture);const me=r.convert(_.depthTexture.format),xe=r.convert(_.depthTexture.type);let ae;_.depthTexture.format===oi?ae=i.DEPTH_COMPONENT24:_.depthTexture.format===Bi&&(ae=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ae,_.width,_.height,0,me,xe,null)}}else ee(_.depthTexture,0);const ne=Q.__webglTexture,le=Rt(_),W=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,K=_.depthTexture.format===Bi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===oi)je(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,W,ne,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,K,W,ne,0);else if(_.depthTexture.format===Bi)je(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,W,ne,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,K,W,ne,0);else throw new Error("Unknown depthTexture format")}function it(T){const _=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=Y}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let Y=0;Y<6;Y++)qe(_.__webglFramebuffer[Y],T,Y);else{const Y=T.texture.mipmaps;Y&&Y.length>0?qe(_.__webglFramebuffer[0],T,0):qe(_.__webglFramebuffer,T,0)}else if(k){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),mt(_.__webglDepthbuffer[Y],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}else{const Y=T.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),mt(_.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(T,_,k){const Y=n.get(T);_!==void 0&&Re(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&it(T)}function Xe(T){const _=T.texture,k=n.get(T),Y=n.get(_);T.addEventListener("dispose",v);const Q=T.textures,ne=T.isWebGLCubeRenderTarget===!0,le=Q.length>1;if(le||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),ne){k.__webglFramebuffer=[];for(let W=0;W<6;W++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[W]=[];for(let K=0;K<_.mipmaps.length;K++)k.__webglFramebuffer[W][K]=i.createFramebuffer()}else k.__webglFramebuffer[W]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let W=0;W<_.mipmaps.length;W++)k.__webglFramebuffer[W]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(le)for(let W=0,K=Q.length;W<K;W++){const me=n.get(Q[W]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&je(T)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let W=0;W<Q.length;W++){const K=Q[W];k.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[W]);const me=r.convert(K.format,K.colorSpace),xe=r.convert(K.type),ae=M(K.internalFormat,me,xe,K.normalized,K.colorSpace,T.isXRRenderTarget===!0),ie=Rt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,ae,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,k.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),mt(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_);for(let W=0;W<6;W++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Re(k.__webglFramebuffer[W][K],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,K);else Re(k.__webglFramebuffer[W],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);p(_)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let W=0,K=Q.length;W<K;W++){const me=Q[W],xe=n.get(me);let ae=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ae=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,xe.__webglTexture),ke(ae,me),Re(k.__webglFramebuffer,T,me,i.COLOR_ATTACHMENT0+W,ae,0),p(me)&&S(ae)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(W=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,Y.__webglTexture),ke(W,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Re(k.__webglFramebuffer[K],T,_,i.COLOR_ATTACHMENT0,W,K);else Re(k.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,W,0);p(_)&&S(W),t.unbindTexture()}T.depthBuffer&&it(T)}function Ct(T){const _=T.textures;for(let k=0,Y=_.length;k<Y;k++){const Q=_[k];if(p(Q)){const ne=E(T),le=n.get(Q).__webglTexture;t.bindTexture(ne,le),S(ne),t.unbindTexture()}}}const gt=[],rn=[];function D(T){if(T.samples>0){if(je(T)===!1){const _=T.textures,k=T.width,Y=T.height;let Q=i.COLOR_BUFFER_BIT;const ne=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(T),W=_.length>1;if(W)for(let me=0;me<_.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const K=T.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let me=0;me<_.length;me++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const xe=n.get(_[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,xe,0)}i.blitFramebuffer(0,0,k,Y,0,0,k,Y,Q,i.NEAREST),l===!0&&(gt.length=0,rn.length=0,gt.push(i.COLOR_ATTACHMENT0+me),T.depthBuffer&&T.resolveDepthBuffer===!1&&(gt.push(ne),rn.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,rn)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let me=0;me<_.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const xe=n.get(_[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Rt(T){return Math.min(s.maxSamples,T.samples)}function je(T){const _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ut(T){const _=a.render.frame;d.get(T)!==_&&(d.set(T,_),T.update())}function ce(T,_){const k=T.colorSpace,Y=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==sn&&k!==Mi&&($e.getTransfer(k)===et?(Y!==gn||Q!==cn)&&Se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):we("WebGLTextures: Unsupported texture color space:",k)),_}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=$,this.getTextureUnits=X,this.setTextureUnits=U,this.setTexture2D=ee,this.setTexture2DArray=te,this.setTexture3D=ue,this.setTextureCube=be,this.rebindTextures=ft,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Kv(i,e){function t(n,s=Mi){let r;const a=$e.getTransfer(s);if(n===cn)return i.UNSIGNED_BYTE;if(n===Xl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ou)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nu)return i.BYTE;if(n===Uu)return i.SHORT;if(n===mr)return i.UNSIGNED_SHORT;if(n===Wl)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===ai)return i.HALF_FLOAT;if(n===ku)return i.ALPHA;if(n===Bu)return i.RGB;if(n===gn)return i.RGBA;if(n===oi)return i.DEPTH_COMPONENT;if(n===Bi)return i.DEPTH_STENCIL;if(n===jl)return i.RED;if(n===Yl)return i.RED_INTEGER;if(n===Wi)return i.RG;if(n===Kl)return i.RG_INTEGER;if(n===Zl)return i.RGBA_INTEGER;if(n===da||n===ua||n===ha||n===fa)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xo||n===qo||n===jo||n===Yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ko||n===Zo||n===Jo||n===Qo||n===el||n===va||n===tl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ko||n===Zo)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Jo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Qo)return r.COMPRESSED_R11_EAC;if(n===el)return r.COMPRESSED_SIGNED_R11_EAC;if(n===va)return r.COMPRESSED_RG11_EAC;if(n===tl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===dl||n===ul||n===hl||n===fl||n===pl||n===ml)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===nl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===il)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===al)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ol)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ll)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===cl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ul)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ml)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gl||n===_l||n===xl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===gl)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vl||n===bl||n===ba||n===yl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===vl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Zv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Qv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ju(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gn({vertexShader:Zv,fragmentShader:Jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wt(new Na(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class eb extends li{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new Qv,p={},S=t.getContextAttributes();let E=null,M=null;const C=[],A=[],P=new Le;let v=null;const w=new Jt;w.viewport=new dt;const N=new Jt;N.viewport=new dt;const R=[w,N],O=new jm;let $=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let pe=C[Z];return pe===void 0&&(pe=new Za,C[Z]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(Z){let pe=C[Z];return pe===void 0&&(pe=new Za,C[Z]=pe),pe.getGripSpace()},this.getHand=function(Z){let pe=C[Z];return pe===void 0&&(pe=new Za,C[Z]=pe),pe.getHandSpace()};function U(Z){const pe=A.indexOf(Z.inputSource);if(pe===-1)return;const re=C[pe];re!==void 0&&(re.update(Z.inputSource,Z.frame,c||a),re.dispatchEvent({type:Z.type,data:Z.inputSource}))}function H(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",B);for(let Z=0;Z<C.length;Z++){const pe=A[Z];pe!==null&&(A[Z]=null,C[Z].disconnect(pe))}$=null,X=null,m.reset();for(const Z in p)delete p[Z];e.setRenderTarget(E),f=null,h=null,u=null,s=null,M=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",H),s.addEventListener("inputsourceschange",B),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ce=null,Ne=null;S.depth&&(Ne=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=S.stencil?Bi:oi,Ce=S.stencil?gr:zn);const Re={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(Re),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new kn(h.textureWidth,h.textureHeight,{format:gn,type:cn,depthTexture:new Ps(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const re={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new kn(f.framebufferWidth,f.framebufferHeight,{format:gn,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ke.setContext(s),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B(Z){for(let pe=0;pe<Z.removed.length;pe++){const re=Z.removed[pe],Ce=A.indexOf(re);Ce>=0&&(A[Ce]=null,C[Ce].disconnect(re))}for(let pe=0;pe<Z.added.length;pe++){const re=Z.added[pe];let Ce=A.indexOf(re);if(Ce===-1){for(let Re=0;Re<C.length;Re++)if(Re>=A.length){A.push(re),Ce=Re;break}else if(A[Re]===null){A[Re]=re,Ce=Re;break}if(Ce===-1)break}const Ne=C[Ce];Ne&&Ne.connect(re)}}const ee=new I,te=new I;function ue(Z,pe,re){ee.setFromMatrixPosition(pe.matrixWorld),te.setFromMatrixPosition(re.matrixWorld);const Ce=ee.distanceTo(te),Ne=pe.projectionMatrix.elements,Re=re.projectionMatrix.elements,mt=Ne[14]/(Ne[10]-1),qe=Ne[14]/(Ne[10]+1),it=(Ne[9]+1)/Ne[5],ft=(Ne[9]-1)/Ne[5],Xe=(Ne[8]-1)/Ne[0],Ct=(Re[8]+1)/Re[0],gt=mt*Xe,rn=mt*Ct,D=Ce/(-Xe+Ct),Rt=D*-Xe;if(pe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Rt),Z.translateZ(D),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ne[10]===-1)Z.projectionMatrix.copy(pe.projectionMatrix),Z.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const je=mt+D,ut=qe+D,ce=gt-Rt,xt=rn+(Ce-Rt),T=it*qe/ut*je,_=ft*qe/ut*je;Z.projectionMatrix.makePerspective(ce,xt,T,_,je,ut),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function be(Z,pe){pe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(pe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let pe=Z.near,re=Z.far;m.texture!==null&&(m.depthNear>0&&(pe=m.depthNear),m.depthFar>0&&(re=m.depthFar)),O.near=N.near=w.near=pe,O.far=N.far=w.far=re,($!==O.near||X!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),$=O.near,X=O.far),O.layers.mask=Z.layers.mask|6,w.layers.mask=O.layers.mask&-5,N.layers.mask=O.layers.mask&-3;const Ce=Z.parent,Ne=O.cameras;be(O,Ce);for(let Re=0;Re<Ne.length;Re++)be(Ne[Re],Ce);Ne.length===2?ue(O,w,N):O.projectionMatrix.copy(w.projectionMatrix),Te(Z,O,Ce)};function Te(Z,pe,re){re===null?Z.matrix.copy(pe.matrixWorld):(Z.matrix.copy(re.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(pe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(pe.projectionMatrix),Z.projectionMatrixInverse.copy(pe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Rs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Z){return p[Z]};let Ke=null;function nt(Z,pe){if(d=pe.getViewerPose(c||a),g=pe,d!==null){const re=d.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ce=!1;re.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let qe=0;qe<re.length;qe++){const it=re[qe];let ft=null;if(f!==null)ft=f.getViewport(it);else{const Ct=u.getViewSubImage(h,it);ft=Ct.viewport,qe===0&&(e.setRenderTargetTextures(M,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(M))}let Xe=R[qe];Xe===void 0&&(Xe=new Jt,Xe.layers.enable(qe),Xe.viewport=new dt,R[qe]=Xe),Xe.matrix.fromArray(it.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(it.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(ft.x,ft.y,ft.width,ft.height),qe===0&&(O.matrix.copy(Xe.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(Xe)}const Ne=s.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const qe=u.getDepthInformation(re[0]);qe&&qe.isValid&&qe.texture&&m.init(qe,s.renderState)}if(Ne&&Ne.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<re.length;qe++){const it=re[qe].camera;if(it){let ft=p[it];ft||(ft=new Ju,p[it]=ft);const Xe=u.getCameraImage(it);ft.sourceTexture=Xe}}}}for(let re=0;re<C.length;re++){const Ce=A[re],Ne=C[re];Ce!==null&&Ne!==void 0&&Ne.update(Ce,pe,c||a)}Ke&&Ke(Z,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),g=null}const ke=new sh;ke.setAnimationLoop(nt),this.setAnimationLoop=function(Z){Ke=Z},this.dispose=function(){}}}const tb=new Ge,uh=new Ue;uh.set(-1,0,0,0,1,0,0,0,1);function nb(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,E,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),E=S.envMap,M=S.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(tb.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(uh),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ib(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,E){const M=E.program;n.uniformBlockBinding(S,M)}function c(S,E){let M=s[S.id];M===void 0&&(g(S),M=d(S),s[S.id]=M,S.addEventListener("dispose",m));const C=E.program;n.updateUBOMapping(S,C);const A=e.render.frame;r[S.id]!==A&&(h(S),r[S.id]=A)}function d(S){const E=u();S.__bindingPointIndex=E;const M=i.createBuffer(),C=S.__size,A=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return we("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const E=s[S.id],M=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,P=M.length;A<P;A++){const v=Array.isArray(M[A])?M[A]:[M[A]];for(let w=0,N=v.length;w<N;w++){const R=v[w];if(f(R,A,w,C)===!0){const O=R.__offset,$=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let U=0;U<$.length;U++){const H=$[U],B=x(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,O+X,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):ArrayBuffer.isView(H)?R.__data.set(new H.constructor(H.buffer,H.byteOffset,R.__data.length)):(H.toArray(R.__data,X),X+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,E,M,C){const A=S.value,P=E+"_"+M;if(C[P]===void 0)return typeof A=="number"||typeof A=="boolean"?C[P]=A:ArrayBuffer.isView(A)?C[P]=A.slice():C[P]=A.clone(),!0;{const v=C[P];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return C[P]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(v.equals(A)===!1)return v.copy(A),!0}}return!1}function g(S){const E=S.uniforms;let M=0;const C=16;for(let P=0,v=E.length;P<v;P++){const w=Array.isArray(E[P])?E[P]:[E[P]];for(let N=0,R=w.length;N<R;N++){const O=w[N],$=Array.isArray(O.value)?O.value:[O.value];for(let X=0,U=$.length;X<U;X++){const H=$[X],B=x(H),ee=M%C,te=ee%B.boundary,ue=ee+te;M+=te,ue!==0&&C-ue<B.storage&&(M+=C-ue),O.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=B.storage}}}const A=M%C;return A>0&&(M+=C-A),S.__size=M,S.__cache={},this}function x(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?Se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(E.boundary=16,E.storage=S.byteLength):Se("WebGLRenderer: Unsupported uniform value type.",S),E}function m(S){const E=S.target;E.removeEventListener("dispose",m);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}const sb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Pn=null;function rb(){return Pn===null&&(Pn=new rc(sb,16,16,Wi,ai),Pn.name="DFG_LUT",Pn.minFilter=Lt,Pn.magFilter=Lt,Pn.wrapS=Nn,Pn.wrapT=Nn,Pn.generateMipmaps=!1,Pn.needsUpdate=!0),Pn}class ab{constructor(e={}){const{canvas:t=Ap(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:f=cn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=f,m=new Set([Zl,Kl,Yl]),p=new Set([cn,zn,mr,gr,Xl,ql]),S=new Uint32Array(4),E=new Int32Array(4),M=new I;let C=null,A=null;const P=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let R=!1,O=null;this._outputColorSpace=Mt;let $=0,X=0,U=null,H=-1,B=null;const ee=new dt,te=new dt;let ue=null;const be=new Ie(0);let Te=0,Ke=t.width,nt=t.height,ke=1,Z=null,pe=null;const re=new dt(0,0,Ke,nt),Ce=new dt(0,0,Ke,nt);let Ne=!1;const Re=new oc;let mt=!1,qe=!1;const it=new Ge,ft=new I,Xe=new dt,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function rn(){return U===null?ke:1}let D=n;function Rt(y,F){return t.getContext(y,F)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$l}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",Fe,!1),D===null){const F="webgl2";if(D=Rt(F,y),D===null)throw Rt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw we("WebGLRenderer: "+y.message),y}let je,ut,ce,xt,T,_,k,Y,Q,ne,le,W,K,me,xe,ae,ie,De,Be,Je,L,se,j;function ge(){je=new rx(D),je.init(),L=new Kv(D,je),ut=new Z0(D,je,e,L),ce=new jv(D,je),ut.reversedDepthBuffer&&h&&ce.buffers.depth.setReversed(!0),xt=new lx(D),T=new Nv,_=new Yv(D,je,ce,T,ut,L,xt),k=new sx(N),Y=new hg(D),se=new Y0(D,Y),Q=new ax(D,Y,xt,se),ne=new dx(D,Q,Y,se,xt),De=new cx(D,ut,_),xe=new J0(T),le=new Dv(N,k,je,ut,se,xe),W=new nb(N,T),K=new Fv,me=new Hv(je),ie=new j0(N,k,ce,ne,g,l),ae=new qv(N,ne,ut),j=new ib(D,xt,ut,ce),Be=new K0(D,je,xt),Je=new ox(D,je,xt),xt.programs=le.programs,N.capabilities=ut,N.extensions=je,N.properties=T,N.renderLists=K,N.shadowMap=ae,N.state=ce,N.info=xt}ge(),x!==cn&&(w=new hx(x,t.width,t.height,s,r));const oe=new eb(N,D);this.xr=oe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const y=je.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=je.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ke},this.setPixelRatio=function(y){y!==void 0&&(ke=y,this.setSize(Ke,nt,!1))},this.getSize=function(y){return y.set(Ke,nt)},this.setSize=function(y,F,V=!0){if(oe.isPresenting){Se("WebGLRenderer: Can't change size while VR device is presenting.");return}Ke=y,nt=F,t.width=Math.floor(y*ke),t.height=Math.floor(F*ke),V===!0&&(t.style.width=y+"px",t.style.height=F+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,y,F)},this.getDrawingBufferSize=function(y){return y.set(Ke*ke,nt*ke).floor()},this.setDrawingBufferSize=function(y,F,V){Ke=y,nt=F,ke=V,t.width=Math.floor(y*V),t.height=Math.floor(F*V),this.setViewport(0,0,y,F)},this.setEffects=function(y){if(x===cn){we("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let F=0;F<y.length;F++)if(y[F].isOutputPass===!0){Se("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ee)},this.getViewport=function(y){return y.copy(re)},this.setViewport=function(y,F,V,z){y.isVector4?re.set(y.x,y.y,y.z,y.w):re.set(y,F,V,z),ce.viewport(ee.copy(re).multiplyScalar(ke).round())},this.getScissor=function(y){return y.copy(Ce)},this.setScissor=function(y,F,V,z){y.isVector4?Ce.set(y.x,y.y,y.z,y.w):Ce.set(y,F,V,z),ce.scissor(te.copy(Ce).multiplyScalar(ke).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(y){ce.setScissorTest(Ne=y)},this.setOpaqueSort=function(y){Z=y},this.setTransparentSort=function(y){pe=y},this.getClearColor=function(y){return y.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(y=!0,F=!0,V=!0){let z=0;if(y){let G=!1;if(U!==null){const fe=U.texture.format;G=m.has(fe)}if(G){const fe=U.texture.type,ve=p.has(fe),he=ie.getClearColor(),ye=ie.getClearAlpha(),Ee=he.r,Oe=he.g,He=he.b;ve?(S[0]=Ee,S[1]=Oe,S[2]=He,S[3]=ye,D.clearBufferuiv(D.COLOR,0,S)):(E[0]=Ee,E[1]=Oe,E[2]=He,E[3]=ye,D.clearBufferiv(D.COLOR,0,E))}else z|=D.COLOR_BUFFER_BIT}F&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),O=y},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",Fe,!1),ie.dispose(),K.dispose(),me.dispose(),T.dispose(),k.dispose(),ne.dispose(),se.dispose(),j.dispose(),le.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Pc),oe.removeEventListener("sessionend",Ic),Ci.stop()};function J(y){y.preventDefault(),Ma("WebGLRenderer: Context Lost."),R=!0}function Me(){Ma("WebGLRenderer: Context Restored."),R=!1;const y=xt.autoReset,F=ae.enabled,V=ae.autoUpdate,z=ae.needsUpdate,G=ae.type;ge(),xt.autoReset=y,ae.enabled=F,ae.autoUpdate=V,ae.needsUpdate=z,ae.type=G}function Fe(y){we("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function bt(y){const F=y.target;F.removeEventListener("dispose",bt),st(F)}function st(y){$n(y),T.remove(y)}function $n(y){const F=T.get(y).programs;F!==void 0&&(F.forEach(function(V){le.releaseProgram(V)}),y.isShaderMaterial&&le.releaseShaderCache(y))}this.renderBufferDirect=function(y,F,V,z,G,fe){F===null&&(F=Ct);const ve=G.isMesh&&G.matrixWorld.determinant()<0,he=Df(y,F,V,z,G);ce.setMaterial(z,ve);let ye=V.index,Ee=1;if(z.wireframe===!0){if(ye=Q.getWireframeAttribute(V),ye===void 0)return;Ee=2}const Oe=V.drawRange,He=V.attributes.position;let Ae=Oe.start*Ee,rt=(Oe.start+Oe.count)*Ee;fe!==null&&(Ae=Math.max(Ae,fe.start*Ee),rt=Math.min(rt,(fe.start+fe.count)*Ee)),ye!==null?(Ae=Math.max(Ae,0),rt=Math.min(rt,ye.count)):He!=null&&(Ae=Math.max(Ae,0),rt=Math.min(rt,He.count));const yt=rt-Ae;if(yt<0||yt===1/0)return;se.setup(G,z,he,V,ye);let vt,lt=Be;if(ye!==null&&(vt=Y.get(ye),lt=Je,lt.setIndex(vt)),G.isMesh)z.wireframe===!0?(ce.setLineWidth(z.wireframeLinewidth*rn()),lt.setMode(D.LINES)):lt.setMode(D.TRIANGLES);else if(G.isLine){let $t=z.linewidth;$t===void 0&&($t=1),ce.setLineWidth($t*rn()),G.isLineSegments?lt.setMode(D.LINES):G.isLineLoop?lt.setMode(D.LINE_LOOP):lt.setMode(D.LINE_STRIP)}else G.isPoints?lt.setMode(D.POINTS):G.isSprite&&lt.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(je.get("WEBGL_multi_draw"))lt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const $t=G._multiDrawStarts,_e=G._multiDrawCounts,an=G._multiDrawCount,Ze=ye?Y.get(ye).bytesPerElement:1,dn=T.get(z).currentProgram.getUniforms();for(let Cn=0;Cn<an;Cn++)dn.setValue(D,"_gl_DrawID",Cn),lt.render($t[Cn]/Ze,_e[Cn])}else if(G.isInstancedMesh)lt.renderInstances(Ae,yt,G.count);else if(V.isInstancedBufferGeometry){const $t=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,_e=Math.min(V.instanceCount,$t);lt.renderInstances(Ae,yt,_e)}else lt.render(Ae,yt)};function wn(y,F,V){y.transparent===!0&&y.side===Dn&&y.forceSinglePass===!1?(y.side=tn,y.needsUpdate=!0,wr(y,F,V),y.side=ri,y.needsUpdate=!0,wr(y,F,V),y.side=Dn):wr(y,F,V)}this.compile=function(y,F,V=null){V===null&&(V=y),A=me.get(V),A.init(F),v.push(A),V.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(A.pushLight(G),G.castShadow&&A.pushShadow(G))}),y!==V&&y.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(A.pushLight(G),G.castShadow&&A.pushShadow(G))}),A.setupLights();const z=new Set;return y.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const fe=G.material;if(fe)if(Array.isArray(fe))for(let ve=0;ve<fe.length;ve++){const he=fe[ve];wn(he,V,G),z.add(he)}else wn(fe,V,G),z.add(fe)}),A=v.pop(),z},this.compileAsync=function(y,F,V=null){const z=this.compile(y,F,V);return new Promise(G=>{function fe(){if(z.forEach(function(ve){T.get(ve).currentProgram.isReady()&&z.delete(ve)}),z.size===0){G(y);return}setTimeout(fe,10)}je.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Ga=null;function If(y){Ga&&Ga(y)}function Pc(){Ci.stop()}function Ic(){Ci.start()}const Ci=new sh;Ci.setAnimationLoop(If),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(y){Ga=y,oe.setAnimationLoop(y),y===null?Ci.stop():Ci.start()},oe.addEventListener("sessionstart",Pc),oe.addEventListener("sessionend",Ic),this.render=function(y,F){if(F!==void 0&&F.isCamera!==!0){we("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;O!==null&&O.renderStart(y,F);const V=oe.enabled===!0&&oe.isPresenting===!0,z=w!==null&&(U===null||V)&&w.begin(N,U);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(F),F=oe.getCamera()),y.isScene===!0&&y.onBeforeRender(N,y,F,U),A=me.get(y,v.length),A.init(F),A.state.textureUnits=_.getTextureUnits(),v.push(A),it.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Re.setFromProjectionMatrix(it,Un,F.reversedDepth),qe=this.localClippingEnabled,mt=xe.init(this.clippingPlanes,qe),C=K.get(y,P.length),C.init(),P.push(C),oe.enabled===!0&&oe.isPresenting===!0){const ve=N.xr.getDepthSensingMesh();ve!==null&&Ha(ve,F,-1/0,N.sortObjects)}Ha(y,F,0,N.sortObjects),C.finish(),N.sortObjects===!0&&C.sort(Z,pe),gt=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,gt&&ie.addToRenderList(C,y),this.info.render.frame++,mt===!0&&xe.beginShadows();const G=A.state.shadowsArray;if(ae.render(G,y,F),mt===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&w.hasRenderPass())===!1){const ve=C.opaque,he=C.transmissive;if(A.setupLights(),F.isArrayCamera){const ye=F.cameras;if(he.length>0)for(let Ee=0,Oe=ye.length;Ee<Oe;Ee++){const He=ye[Ee];Dc(ve,he,y,He)}gt&&ie.render(y);for(let Ee=0,Oe=ye.length;Ee<Oe;Ee++){const He=ye[Ee];Lc(C,y,He,He.viewport)}}else he.length>0&&Dc(ve,he,y,F),gt&&ie.render(y),Lc(C,y,F)}U!==null&&X===0&&(_.updateMultisampleRenderTarget(U),_.updateRenderTargetMipmap(U)),z&&w.end(N),y.isScene===!0&&y.onAfterRender(N,y,F),se.resetDefaultState(),H=-1,B=null,v.pop(),v.length>0?(A=v[v.length-1],_.setTextureUnits(A.state.textureUnits),mt===!0&&xe.setGlobalState(N.clippingPlanes,A.state.camera)):A=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,O!==null&&O.renderEnd()};function Ha(y,F,V,z){if(y.visible===!1)return;if(y.layers.test(F.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(F);else if(y.isLightProbeGrid)A.pushLightProbeGrid(y);else if(y.isLight)A.pushLight(y),y.castShadow&&A.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Re.intersectsSprite(y)){z&&Xe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(it);const ve=ne.update(y),he=y.material;he.visible&&C.push(y,ve,he,V,Xe.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Re.intersectsObject(y))){const ve=ne.update(y),he=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Xe.copy(y.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Xe.copy(ve.boundingSphere.center)),Xe.applyMatrix4(y.matrixWorld).applyMatrix4(it)),Array.isArray(he)){const ye=ve.groups;for(let Ee=0,Oe=ye.length;Ee<Oe;Ee++){const He=ye[Ee],Ae=he[He.materialIndex];Ae&&Ae.visible&&C.push(y,ve,Ae,V,Xe.z,He)}}else he.visible&&C.push(y,ve,he,V,Xe.z,null)}}const fe=y.children;for(let ve=0,he=fe.length;ve<he;ve++)Ha(fe[ve],F,V,z)}function Lc(y,F,V,z){const{opaque:G,transmissive:fe,transparent:ve}=y;A.setupLightsView(V),mt===!0&&xe.setGlobalState(N.clippingPlanes,V),z&&ce.viewport(ee.copy(z)),G.length>0&&Ar(G,F,V),fe.length>0&&Ar(fe,F,V),ve.length>0&&Ar(ve,F,V),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Dc(y,F,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[z.id]===void 0){const Ae=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[z.id]=new kn(1,1,{generateMipmaps:!0,type:Ae?ai:cn,minFilter:Zn,samples:Math.max(4,ut.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const fe=A.state.transmissionRenderTarget[z.id],ve=z.viewport||ee;fe.setSize(ve.z*N.transmissionResolutionScale,ve.w*N.transmissionResolutionScale);const he=N.getRenderTarget(),ye=N.getActiveCubeFace(),Ee=N.getActiveMipmapLevel();N.setRenderTarget(fe),N.getClearColor(be),Te=N.getClearAlpha(),Te<1&&N.setClearColor(16777215,.5),N.clear(),gt&&ie.render(V);const Oe=N.toneMapping;N.toneMapping=On;const He=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),A.setupLightsView(z),mt===!0&&xe.setGlobalState(N.clippingPlanes,z),Ar(y,V,z),_.updateMultisampleRenderTarget(fe),_.updateRenderTargetMipmap(fe),je.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let rt=0,yt=F.length;rt<yt;rt++){const vt=F[rt],{object:lt,geometry:$t,material:_e,group:an}=vt;if(_e.side===Dn&&lt.layers.test(z.layers)){const Ze=_e.side;_e.side=tn,_e.needsUpdate=!0,Nc(lt,V,z,$t,_e,an),_e.side=Ze,_e.needsUpdate=!0,Ae=!0}}Ae===!0&&(_.updateMultisampleRenderTarget(fe),_.updateRenderTargetMipmap(fe))}N.setRenderTarget(he,ye,Ee),N.setClearColor(be,Te),He!==void 0&&(z.viewport=He),N.toneMapping=Oe}function Ar(y,F,V){const z=F.isScene===!0?F.overrideMaterial:null;for(let G=0,fe=y.length;G<fe;G++){const ve=y[G],{object:he,geometry:ye,group:Ee}=ve;let Oe=ve.material;Oe.allowOverride===!0&&z!==null&&(Oe=z),he.layers.test(V.layers)&&Nc(he,F,V,ye,Oe,Ee)}}function Nc(y,F,V,z,G,fe){y.onBeforeRender(N,F,V,z,G,fe),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),G.onBeforeRender(N,F,V,z,y,fe),G.transparent===!0&&G.side===Dn&&G.forceSinglePass===!1?(G.side=tn,G.needsUpdate=!0,N.renderBufferDirect(V,F,z,G,y,fe),G.side=ri,G.needsUpdate=!0,N.renderBufferDirect(V,F,z,G,y,fe),G.side=Dn):N.renderBufferDirect(V,F,z,G,y,fe),y.onAfterRender(N,F,V,z,G,fe)}function wr(y,F,V){F.isScene!==!0&&(F=Ct);const z=T.get(y),G=A.state.lights,fe=A.state.shadowsArray,ve=G.state.version,he=le.getParameters(y,G.state,fe,F,V,A.state.lightProbeGridArray),ye=le.getProgramCacheKey(he);let Ee=z.programs;z.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const Oe=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;z.envMap=k.get(y.envMap||z.environment,Oe),z.envMapRotation=z.environment!==null&&y.envMap===null?F.environmentRotation:y.envMapRotation,Ee===void 0&&(y.addEventListener("dispose",bt),Ee=new Map,z.programs=Ee);let He=Ee.get(ye);if(He!==void 0){if(z.currentProgram===He&&z.lightsStateVersion===ve)return Fc(y,he),He}else he.uniforms=le.getUniforms(y),O!==null&&y.isNodeMaterial&&O.build(y,V,he),y.onBeforeCompile(he,N),He=le.acquireProgram(he,ye),Ee.set(ye,He),z.uniforms=he.uniforms;const Ae=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ae.clippingPlanes=xe.uniform),Fc(y,he),z.needsLights=Uf(y),z.lightsStateVersion=ve,z.needsLights&&(Ae.ambientLightColor.value=G.state.ambient,Ae.lightProbe.value=G.state.probe,Ae.directionalLights.value=G.state.directional,Ae.directionalLightShadows.value=G.state.directionalShadow,Ae.spotLights.value=G.state.spot,Ae.spotLightShadows.value=G.state.spotShadow,Ae.rectAreaLights.value=G.state.rectArea,Ae.ltc_1.value=G.state.rectAreaLTC1,Ae.ltc_2.value=G.state.rectAreaLTC2,Ae.pointLights.value=G.state.point,Ae.pointLightShadows.value=G.state.pointShadow,Ae.hemisphereLights.value=G.state.hemi,Ae.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ae.spotLightMatrix.value=G.state.spotLightMatrix,Ae.spotLightMap.value=G.state.spotLightMap,Ae.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=A.state.lightProbeGridArray.length>0,z.currentProgram=He,z.uniformsList=null,He}function Uc(y){if(y.uniformsList===null){const F=y.currentProgram.getUniforms();y.uniformsList=pa.seqWithValue(F.seq,y.uniforms)}return y.uniformsList}function Fc(y,F){const V=T.get(y);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function Lf(y,F){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let V=0,z=y.length;V<z;V++){const G=y[V];if(G.texture!==null&&G.boundingBox.containsPoint(M))return G}return null}function Df(y,F,V,z,G){F.isScene!==!0&&(F=Ct),_.resetTextureUnits();const fe=F.fog,ve=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,he=U===null?N.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:$e.workingColorSpace,ye=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ee=k.get(z.envMap||ve,ye),Oe=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,He=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ae=!!V.morphAttributes.position,rt=!!V.morphAttributes.normal,yt=!!V.morphAttributes.color;let vt=On;z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(vt=N.toneMapping);const lt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,$t=lt!==void 0?lt.length:0,_e=T.get(z),an=A.state.lights;if(mt===!0&&(qe===!0||y!==B)){const ht=y===B&&z.id===H;xe.setState(z,y,ht)}let Ze=!1;z.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==an.state.version||_e.outputColorSpace!==he||G.isBatchedMesh&&_e.batching===!1||!G.isBatchedMesh&&_e.batching===!0||G.isBatchedMesh&&_e.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&_e.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&_e.instancing===!1||!G.isInstancedMesh&&_e.instancing===!0||G.isSkinnedMesh&&_e.skinning===!1||!G.isSkinnedMesh&&_e.skinning===!0||G.isInstancedMesh&&_e.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_e.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_e.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_e.instancingMorph===!1&&G.morphTexture!==null||_e.envMap!==Ee||z.fog===!0&&_e.fog!==fe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==xe.numPlanes||_e.numIntersection!==xe.numIntersection)||_e.vertexAlphas!==Oe||_e.vertexTangents!==He||_e.morphTargets!==Ae||_e.morphNormals!==rt||_e.morphColors!==yt||_e.toneMapping!==vt||_e.morphTargetsCount!==$t||!!_e.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,_e.__version=z.version);let dn=_e.currentProgram;Ze===!0&&(dn=wr(z,F,G),O&&z.isNodeMaterial&&O.onUpdateProgram(z,dn,_e));let Cn=!1,di=!1,Ji=!1;const ct=dn.getUniforms(),St=_e.uniforms;if(ce.useProgram(dn.program)&&(Cn=!0,di=!0,Ji=!0),z.id!==H&&(H=z.id,di=!0),_e.needsLights){const ht=Lf(A.state.lightProbeGridArray,G);_e.lightProbeGrid!==ht&&(_e.lightProbeGrid=ht,di=!0)}if(Cn||B!==y){ce.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ct.setValue(D,"projectionMatrix",y.projectionMatrix),ct.setValue(D,"viewMatrix",y.matrixWorldInverse);const hi=ct.map.cameraPosition;hi!==void 0&&hi.setValue(D,ft.setFromMatrixPosition(y.matrixWorld)),ut.logarithmicDepthBuffer&&ct.setValue(D,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ct.setValue(D,"isOrthographic",y.isOrthographicCamera===!0),B!==y&&(B=y,di=!0,Ji=!0)}if(_e.needsLights&&(an.state.directionalShadowMap.length>0&&ct.setValue(D,"directionalShadowMap",an.state.directionalShadowMap,_),an.state.spotShadowMap.length>0&&ct.setValue(D,"spotShadowMap",an.state.spotShadowMap,_),an.state.pointShadowMap.length>0&&ct.setValue(D,"pointShadowMap",an.state.pointShadowMap,_)),G.isSkinnedMesh){ct.setOptional(D,G,"bindMatrix"),ct.setOptional(D,G,"bindMatrixInverse");const ht=G.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),ct.setValue(D,"boneTexture",ht.boneTexture,_))}G.isBatchedMesh&&(ct.setOptional(D,G,"batchingTexture"),ct.setValue(D,"batchingTexture",G._matricesTexture,_),ct.setOptional(D,G,"batchingIdTexture"),ct.setValue(D,"batchingIdTexture",G._indirectTexture,_),ct.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&ct.setValue(D,"batchingColorTexture",G._colorsTexture,_));const ui=V.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&De.update(G,V,dn),(di||_e.receiveShadow!==G.receiveShadow)&&(_e.receiveShadow=G.receiveShadow,ct.setValue(D,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(St.envMapIntensity.value=F.environmentIntensity),St.dfgLUT!==void 0&&(St.dfgLUT.value=rb()),di){if(ct.setValue(D,"toneMappingExposure",N.toneMappingExposure),_e.needsLights&&Nf(St,Ji),fe&&z.fog===!0&&W.refreshFogUniforms(St,fe),W.refreshMaterialUniforms(St,z,ke,nt,A.state.transmissionRenderTarget[y.id]),_e.needsLights&&_e.lightProbeGrid){const ht=_e.lightProbeGrid;St.probesSH.value=ht.texture,St.probesMin.value.copy(ht.boundingBox.min),St.probesMax.value.copy(ht.boundingBox.max),St.probesResolution.value.copy(ht.resolution)}pa.upload(D,Uc(_e),St,_)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(pa.upload(D,Uc(_e),St,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ct.setValue(D,"center",G.center),ct.setValue(D,"modelViewMatrix",G.modelViewMatrix),ct.setValue(D,"normalMatrix",G.normalMatrix),ct.setValue(D,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const ht=z.uniformsGroups;for(let hi=0,Qi=ht.length;hi<Qi;hi++){const Oc=ht[hi];j.update(Oc,dn),j.bind(Oc,dn)}}return dn}function Nf(y,F){y.ambientLightColor.needsUpdate=F,y.lightProbe.needsUpdate=F,y.directionalLights.needsUpdate=F,y.directionalLightShadows.needsUpdate=F,y.pointLights.needsUpdate=F,y.pointLightShadows.needsUpdate=F,y.spotLights.needsUpdate=F,y.spotLightShadows.needsUpdate=F,y.rectAreaLights.needsUpdate=F,y.hemisphereLights.needsUpdate=F}function Uf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(y,F,V){const z=T.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),T.get(y.texture).__webglTexture=F,T.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,F){const V=T.get(y);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};const Ff=D.createFramebuffer();this.setRenderTarget=function(y,F=0,V=0){U=y,$=F,X=V;let z=null,G=!1,fe=!1;if(y){const he=T.get(y);if(he.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(D.FRAMEBUFFER,he.__webglFramebuffer),ee.copy(y.viewport),te.copy(y.scissor),ue=y.scissorTest,ce.viewport(ee),ce.scissor(te),ce.setScissorTest(ue),H=-1;return}else if(he.__webglFramebuffer===void 0)_.setupRenderTarget(y);else if(he.__hasExternalTextures)_.rebindTextures(y,T.get(y.texture).__webglTexture,T.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Oe=y.depthTexture;if(he.__boundDepthTexture!==Oe){if(Oe!==null&&T.has(Oe)&&(y.width!==Oe.image.width||y.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(y)}}const ye=y.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(fe=!0);const Ee=T.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ee[F])?z=Ee[F][V]:z=Ee[F],G=!0):y.samples>0&&_.useMultisampledRTT(y)===!1?z=T.get(y).__webglMultisampledFramebuffer:Array.isArray(Ee)?z=Ee[V]:z=Ee,ee.copy(y.viewport),te.copy(y.scissor),ue=y.scissorTest}else ee.copy(re).multiplyScalar(ke).floor(),te.copy(Ce).multiplyScalar(ke).floor(),ue=Ne;if(V!==0&&(z=Ff),ce.bindFramebuffer(D.FRAMEBUFFER,z)&&ce.drawBuffers(y,z),ce.viewport(ee),ce.scissor(te),ce.setScissorTest(ue),G){const he=T.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,he.__webglTexture,V)}else if(fe){const he=F;for(let ye=0;ye<y.textures.length;ye++){const Ee=T.get(y.textures[ye]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ye,Ee.__webglTexture,V,he)}}else if(y!==null&&V!==0){const he=T.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,he.__webglTexture,V)}H=-1},this.readRenderTargetPixels=function(y,F,V,z,G,fe,ve,he=0){if(!(y&&y.isWebGLRenderTarget)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=T.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){ce.bindFramebuffer(D.FRAMEBUFFER,ye);try{const Ee=y.textures[he],Oe=Ee.format,He=Ee.type;if(y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+he),!ut.textureFormatReadable(Oe)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(He)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=y.width-z&&V>=0&&V<=y.height-G&&D.readPixels(F,V,z,G,L.convert(Oe),L.convert(He),fe)}finally{const Ee=U!==null?T.get(U).__webglFramebuffer:null;ce.bindFramebuffer(D.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(y,F,V,z,G,fe,ve,he=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=T.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye)if(F>=0&&F<=y.width-z&&V>=0&&V<=y.height-G){ce.bindFramebuffer(D.FRAMEBUFFER,ye);const Ee=y.textures[he],Oe=Ee.format,He=Ee.type;if(y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+he),!ut.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ae),D.bufferData(D.PIXEL_PACK_BUFFER,fe.byteLength,D.STREAM_READ),D.readPixels(F,V,z,G,L.convert(Oe),L.convert(He),0);const rt=U!==null?T.get(U).__webglFramebuffer:null;ce.bindFramebuffer(D.FRAMEBUFFER,rt);const yt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await wp(D,yt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ae),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,fe),D.deleteBuffer(Ae),D.deleteSync(yt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,F=null,V=0){const z=Math.pow(2,-V),G=Math.floor(y.image.width*z),fe=Math.floor(y.image.height*z),ve=F!==null?F.x:0,he=F!==null?F.y:0;_.setTexture2D(y,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,ve,he,G,fe),ce.unbindTexture()};const Of=D.createFramebuffer(),kf=D.createFramebuffer();this.copyTextureToTexture=function(y,F,V=null,z=null,G=0,fe=0){let ve,he,ye,Ee,Oe,He,Ae,rt,yt;const vt=y.isCompressedTexture?y.mipmaps[fe]:y.image;if(V!==null)ve=V.max.x-V.min.x,he=V.max.y-V.min.y,ye=V.isBox3?V.max.z-V.min.z:1,Ee=V.min.x,Oe=V.min.y,He=V.isBox3?V.min.z:0;else{const St=Math.pow(2,-G);ve=Math.floor(vt.width*St),he=Math.floor(vt.height*St),y.isDataArrayTexture?ye=vt.depth:y.isData3DTexture?ye=Math.floor(vt.depth*St):ye=1,Ee=0,Oe=0,He=0}z!==null?(Ae=z.x,rt=z.y,yt=z.z):(Ae=0,rt=0,yt=0);const lt=L.convert(F.format),$t=L.convert(F.type);let _e;F.isData3DTexture?(_.setTexture3D(F,0),_e=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(_.setTexture2DArray(F,0),_e=D.TEXTURE_2D_ARRAY):(_.setTexture2D(F,0),_e=D.TEXTURE_2D),ce.activeTexture(D.TEXTURE0),ce.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),ce.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),ce.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const an=ce.getParameter(D.UNPACK_ROW_LENGTH),Ze=ce.getParameter(D.UNPACK_IMAGE_HEIGHT),dn=ce.getParameter(D.UNPACK_SKIP_PIXELS),Cn=ce.getParameter(D.UNPACK_SKIP_ROWS),di=ce.getParameter(D.UNPACK_SKIP_IMAGES);ce.pixelStorei(D.UNPACK_ROW_LENGTH,vt.width),ce.pixelStorei(D.UNPACK_IMAGE_HEIGHT,vt.height),ce.pixelStorei(D.UNPACK_SKIP_PIXELS,Ee),ce.pixelStorei(D.UNPACK_SKIP_ROWS,Oe),ce.pixelStorei(D.UNPACK_SKIP_IMAGES,He);const Ji=y.isDataArrayTexture||y.isData3DTexture,ct=F.isDataArrayTexture||F.isData3DTexture;if(y.isDepthTexture){const St=T.get(y),ui=T.get(F),ht=T.get(St.__renderTarget),hi=T.get(ui.__renderTarget);ce.bindFramebuffer(D.READ_FRAMEBUFFER,ht.__webglFramebuffer),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,hi.__webglFramebuffer);for(let Qi=0;Qi<ye;Qi++)Ji&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,T.get(y).__webglTexture,G,He+Qi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,T.get(F).__webglTexture,fe,yt+Qi)),D.blitFramebuffer(Ee,Oe,ve,he,Ae,rt,ve,he,D.DEPTH_BUFFER_BIT,D.NEAREST);ce.bindFramebuffer(D.READ_FRAMEBUFFER,null),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||y.isRenderTargetTexture||T.has(y)){const St=T.get(y),ui=T.get(F);ce.bindFramebuffer(D.READ_FRAMEBUFFER,Of),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,kf);for(let ht=0;ht<ye;ht++)Ji?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,St.__webglTexture,G,He+ht):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,St.__webglTexture,G),ct?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ui.__webglTexture,fe,yt+ht):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ui.__webglTexture,fe),G!==0?D.blitFramebuffer(Ee,Oe,ve,he,Ae,rt,ve,he,D.COLOR_BUFFER_BIT,D.NEAREST):ct?D.copyTexSubImage3D(_e,fe,Ae,rt,yt+ht,Ee,Oe,ve,he):D.copyTexSubImage2D(_e,fe,Ae,rt,Ee,Oe,ve,he);ce.bindFramebuffer(D.READ_FRAMEBUFFER,null),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ct?y.isDataTexture||y.isData3DTexture?D.texSubImage3D(_e,fe,Ae,rt,yt,ve,he,ye,lt,$t,vt.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(_e,fe,Ae,rt,yt,ve,he,ye,lt,vt.data):D.texSubImage3D(_e,fe,Ae,rt,yt,ve,he,ye,lt,$t,vt):y.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,fe,Ae,rt,ve,he,lt,$t,vt.data):y.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,fe,Ae,rt,vt.width,vt.height,lt,vt.data):D.texSubImage2D(D.TEXTURE_2D,fe,Ae,rt,ve,he,lt,$t,vt);ce.pixelStorei(D.UNPACK_ROW_LENGTH,an),ce.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ze),ce.pixelStorei(D.UNPACK_SKIP_PIXELS,dn),ce.pixelStorei(D.UNPACK_SKIP_ROWS,Cn),ce.pixelStorei(D.UNPACK_SKIP_IMAGES,di),fe===0&&F.generateMipmaps&&D.generateMipmap(_e),ce.unbindTexture()},this.initRenderTarget=function(y){T.get(y).__webglFramebuffer===void 0&&_.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?_.setTextureCube(y,0):y.isData3DTexture?_.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?_.setTexture2DArray(y,0):_.setTexture2D(y,0),ce.unbindTexture()},this.resetState=function(){$=0,X=0,U=null,ce.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const nu={type:"change"},pc={type:"start"},hh={type:"end"},na=new Bs,iu=new Si,ob=Math.cos(70*Hu.DEG2RAD),Pt=new I,Qt=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ao=1e-6;class lb extends dg{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bs.ROTATE,MIDDLE:bs.DOLLY,RIGHT:bs.PAN},this.touches={ONE:_s.ROTATE,TWO:_s.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new nn,this._lastTargetPosition=new I,this._quat=new nn().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Pd,this._sphericalDelta=new Pd,this._scale=1,this._panOffset=new I,this._rotateStart=new Le,this._rotateEnd=new Le,this._rotateDelta=new Le,this._panStart=new Le,this._panEnd=new Le,this._panDelta=new Le,this._dollyStart=new Le,this._dollyEnd=new Le,this._dollyDelta=new Le,this._dollyDirection=new I,this._mouse=new Le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=db.bind(this),this._onPointerDown=cb.bind(this),this._onPointerUp=ub.bind(this),this._onContextMenu=xb.bind(this),this._onMouseWheel=pb.bind(this),this._onKeyDown=mb.bind(this),this._onTouchStart=gb.bind(this),this._onTouchMove=_b.bind(this),this._onMouseDown=hb.bind(this),this._onMouseMove=fb.bind(this),this._interceptControlDown=vb.bind(this),this._interceptControlUp=bb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nu),this.update(),this.state=ot.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Qt:n>Math.PI&&(n-=Qt),s<-Math.PI?s+=Qt:s>Math.PI&&(s-=Qt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Pt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(na.origin.copy(this.object.position),na.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(na.direction))<ob?this.object.lookAt(this.target):(iu.setFromNormalAndCoplanarPoint(this.object.up,this.target),na.intersectPlane(iu,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ao||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ao||this._lastTargetPosition.distanceToSquared(this.target)>Ao?(this.dispatchEvent(nu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pt.copy(s).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function cb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function db(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ub(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hh),this.state=ot.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function hb(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ot.DOLLY;break;case bs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}break;case bs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(pc)}function fb(i){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function pb(i){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(i.preventDefault(),this.dispatchEvent(pc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(hh))}function mb(i){this.enabled!==!1&&this._handleKeyDown(i)}function gb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case _s.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ot.TOUCH_ROTATE;break;case _s.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case _s.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ot.TOUCH_DOLLY_PAN;break;case _s.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(pc)}function _b(i){switch(this._trackPointer(i),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ot.NONE}}function xb(i){this.enabled!==!1&&i.preventDefault()}function vb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wo=new WeakMap;class yb extends ji{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){const r=new wa(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Mt,n).catch(n)}decodeDracoFile(e,t,n,s,r=sn,a=()=>{}){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){const n=JSON.stringify(t);if(wo.has(e)){const l=wo.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s;const r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,d)=>{s._callbacks[r]={resolve:c,reject:d},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),wo.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new jt;e.index&&t.setIndex(new Ht(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const{name:s,array:r,itemSize:a,stride:o,vertexColorSpace:l}=e.attributes[n];let c;if(a===o)c=new Ht(r,a);else{const d=new qu(r,o);c=new Da(d,a,0)}s==="color"&&(this._assignVertexColorSpace(c,l),c.normalized=!(r instanceof Float32Array)),t.setAttribute(s,c)}return t}_assignVertexColorSpace(e,t){if(t!==Mt)return;const n=new Ie;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),$e.colorSpaceToWorking(n,Mt),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new wa(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const r=Sb.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){const a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function Sb(){let i,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(d){i.onModuleLoaded=function(u){d({draco:u})},DracoDecoderModule(i)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(d=>{const u=d.draco,h=new u.Decoder;try{const f=t(u,h,new Int8Array(l),c),g=f.attributes.map(x=>x.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{u.destroy(h)}});break}};function t(a,o,l,c){const d=c.attributeIDs,u=c.attributeTypes;let h,f;const g=o.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)h=new a.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,h);else if(g===a.POINT_CLOUD)h=new a.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,h);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||h.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const x={index:null,attributes:[]};for(const m in d){const p=self[u[m]];let S,E;if(c.useUniqueIDs)E=d[m],S=o.GetAttributeByUniqueId(h,E);else{if(E=o.GetAttributeId(h,a[d[m]]),E===-1)continue;S=o.GetAttribute(h,E)}const M=s(a,o,h,m,p,S);m==="color"&&(M.vertexColorSpace=c.vertexColorSpace),x.attributes.push(M)}return g===a.TRIANGULAR_MESH&&(x.index=n(a,o,h)),a.destroy(h),x}function n(a,o,l){const d=l.num_faces()*3,u=d*4,h=a._malloc(u);o.GetTrianglesUInt32Array(l,u,h);const f=new Uint32Array(a.HEAPF32.buffer,h,d).slice();return a._free(h),{array:f,itemSize:1}}function s(a,o,l,c,d,u){const h=l.num_points(),f=u.num_components(),g=r(a,d),x=f*d.BYTES_PER_ELEMENT,m=Math.ceil(x/4)*4,p=m/d.BYTES_PER_ELEMENT,S=h*x,E=h*m,M=a._malloc(S);o.GetAttributeDataArrayForAllPoints(l,u,g,S,M);const C=new d(a.HEAPF32.buffer,M,S/d.BYTES_PER_ELEMENT);let A;if(x===m)A=C.slice();else{A=new d(E/d.BYTES_PER_ELEMENT);let P=0;for(let v=0,w=C.length;v<w;v++){for(let N=0;N<f;N++)A[P+N]=C[v*f+N];P+=p}}return a._free(M),{name:c,count:h,itemSize:f,array:A,stride:p}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}function su(i,e){if(e===mp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Sl||e===zu){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Sl)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Mb(i){const e=new Map,t=new Map,n=i.clone();return fh(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function fh(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)fh(i.children[n],e.children[n],t)}class Eb extends ji{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Rb(t)}),this.register(function(t){return new Pb(t)}),this.register(function(t){return new Bb(t)}),this.register(function(t){return new zb(t)}),this.register(function(t){return new Gb(t)}),this.register(function(t){return new Lb(t)}),this.register(function(t){return new Db(t)}),this.register(function(t){return new Nb(t)}),this.register(function(t){return new Ub(t)}),this.register(function(t){return new Cb(t)}),this.register(function(t){return new Fb(t)}),this.register(function(t){return new Ib(t)}),this.register(function(t){return new kb(t)}),this.register(function(t){return new Ob(t)}),this.register(function(t){return new Ab(t)}),this.register(function(t){return new ru(t,We.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new ru(t,We.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Hb(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=hr.extractUrlBase(e);a=hr.resolveURL(c,this.path)}else a=hr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new wa(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){t(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===ph){try{a[We.KHR_BINARY_GLTF]=new Vb(e)}catch(u){s&&s(u);return}r=JSON.parse(a[We.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new ny(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const u=r.extensionsUsed[d],h=r.extensionsRequired||[];switch(u){case We.KHR_MATERIALS_UNLIT:a[u]=new wb;break;case We.KHR_DRACO_MESH_COMPRESSION:a[u]=new $b(r,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:a[u]=new Wb;break;case We.KHR_MESH_QUANTIZATION:a[u]=new Xb;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Tb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Tt(i,e,t){const n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ab{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const d=new Ie(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],sn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Rl(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Vm(d),c.distance=u;break;case"spot":c=new Gm(d),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),In(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class wb{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return zi}extendParams(e,t,n){const s=[];e.color=new Ie(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],sn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Mt))}return Promise.all(s)}}class Cb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Rb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Le(r,r)}return Promise.all(s)}}class Pb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Ib{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}}class Lb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];if(t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],sn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Mt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}}class Db{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}}class Nb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(r[0],r[1],r[2],sn),Promise.all(s)}}class Ub{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Fb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(r[0],r[1],r[2],sn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Mt)),Promise.all(s)}}class Ob{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}}class kb{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?Vn:null}extendMaterialParams(e,t){const n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}}class Bb{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class zb{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Gb{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class ru{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(f),d,u,h,s.mode,s.filter),f})})}else return null}}class Hb{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==hn.TRIANGLES&&c.mode!==hn.TRIANGLE_STRIP&&c.mode!==hn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const d=c.pop(),u=d.isGroup?d.children:[d],h=c[0].count,f=[];for(const g of u){const x=new Ge,m=new I,p=new nn,S=new I(1,1,1),E=new pm(g.geometry,g.material,h);for(let M=0;M<h;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,M),l.SCALE&&S.fromBufferAttribute(l.SCALE,M),E.setMatrixAt(M,x.compose(m,p,S));for(const M in l)if(M==="_COLOR_0"){const C=l[M];E.instanceColor=new Al(C.array,C.itemSize,C.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);_t.prototype.copy.call(E,g),this.parser.assignFinalMaterial(E),f.push(E)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}}const ph="glTF",sr=12,au={JSON:1313821514,BIN:5130562};class Vb{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,sr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ph)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-sr,r=new DataView(e,sr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===au.JSON){const c=new Uint8Array(e,sr+a,o);this.content=n.decode(c)}else if(l===au.BIN){const c=sr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class $b{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const d in a){const u=Dl[d]||d.toLowerCase();o[u]=a[d]}for(const d in e.attributes){const u=Dl[d]||d.toLowerCase();if(a[d]!==void 0){const h=n.accessors[e.attributes[d]],f=Ms[h.componentType];c[u]=f.name,l[u]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(u,h){s.decodeDracoFile(d,function(f){for(const g in f.attributes){const x=f.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}u(f)},o,c,sn,h)})})}}class Wb{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Xb{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class mh extends zs{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=s-t,u=(n-t)/d,h=u*u,f=h*u,g=e*c,x=g-c,m=-2*f+3*h,p=f-h,S=1-m,E=p-h+u;for(let M=0;M!==o;M++){const C=a[x+M+o],A=a[x+M+l]*d,P=a[g+M+o],v=a[g+M]*d;r[M]=S*C+E*A+m*P+p*v}return r}}const qb=new nn;class jb extends mh{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return qb.fromArray(r).normalize().toArray(r),r}}const hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ou={9728:It,9729:Lt,9984:Du,9985:ca,9986:or,9987:Zn},lu={33071:Nn,33648:xa,10497:Cs},Co={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Dl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Yb={CUBICSPLINE:void 0,LINEAR:xr,STEP:_r},Ro={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Kb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Qn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ri})),i.DefaultMaterial}function Di(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function In(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Zb(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,d=e.length;c<d;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){const u=e[c];if(n){const h=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(h)}if(s){const h=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(h)}if(r){const h=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const d=c[0],u=c[1],h=c[2];return n&&(i.morphAttributes.position=d),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function Jb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Qb(i){let e;const t=i.extensions&&i.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Po(t.attributes):e=i.indices+":"+Po(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Po(i.targets[n]);return e}function Po(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Nl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ey(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const ty=new Ge;class ny{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Tb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Bm(this.options.manager):this.textureLoader=new Xm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new wa(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Di(r,o,s),In(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,d]of a.children.entries())r(d,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(hr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Co[s.type],o=Ms[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Ht(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Co[s.type],c=Ms[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(f&&f!==u){const p=Math.floor(h/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let E=t.cache.get(S);E||(x=new c(o,p*f,s.count*f/d),E=new qu(x,f/d),t.cache.add(S,E)),m=new Da(E,l,h%f/d,g)}else o===null?x=new c(s.count*l):x=new c(o,h,s.count*l),m=new Ht(x,l,g);if(s.sparse!==void 0){const p=Co.SCALAR,S=Ms[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,C=new S(a[1],E,s.sparse.count*p),A=new c(a[2],M,s.sparse.count*l);o!==null&&(m=new Ht(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let P=0,v=C.length;P<v;P++){const w=C[P];if(m.setX(w,A[P*l]),l>=2&&m.setY(w,A[P*l+1]),l>=3&&m.setZ(w,A[P*l+2]),l>=4&&m.setW(w,A[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);const h=(r.samplers||{})[a.sampler]||{};return d.magFilter=ou[h.magFilter]||Lt,d.minFilter=ou[h.minFilter]||Zn,d.wrapS=lu[h.wrapS]||Cs,d.wrapT=lu[h.wrapT]||Cs,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==It&&d.minFilter!==Lt,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const h=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(l).then(function(u){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(x){const m=new kt(x);m.needsUpdate=!0,h(m)}),t.load(hr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),In(u,a),u.userData.mimeType=a.mimeType||ey(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[We.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ku,Bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new lc,Bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Qn}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[We.KHR_MATERIALS_UNLIT]){const u=s[We.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],sn),o.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Mt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Dn);const d=r.alphaMode||Ro.OPAQUE;if(d===Ro.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===Ro.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==zi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Le(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==zi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==zi){const u=r.emissiveFactor;o.emissive=new Ie().setRGB(u[0],u[1],u[2],sn)}return r.emissiveTexture!==void 0&&a!==zi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Mt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),In(u,r),t.associations.set(u,{materials:e}),r.extensions&&Di(s,u,r),u})}createUniqueName(e){const t=Qe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return cu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],d=Qb(c),u=s[d];if(u)a.push(u.promise);else{let h;c.extensions&&c.extensions[We.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=cu(new jt,c,t),s[d]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const d=a[l].material===void 0?Kb(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),d=l[l.length-1],u=[];for(let f=0,g=d.length;f<g;f++){const x=d[f],m=a[f];let p;const S=c[f];if(m.mode===hn.TRIANGLES||m.mode===hn.TRIANGLE_STRIP||m.mode===hn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new um(x,S):new wt(x,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===hn.TRIANGLE_STRIP?p.geometry=su(p.geometry,zu):m.mode===hn.TRIANGLE_FAN&&(p.geometry=su(p.geometry,Sl));else if(m.mode===hn.LINES)p=new Yu(x,S);else if(m.mode===hn.LINE_STRIP)p=new cc(x,S);else if(m.mode===hn.LINE_LOOP)p=new xm(x,S);else if(m.mode===hn.POINTS)p=new vm(x,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Jb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),In(p,r),m.extensions&&Di(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Di(s,u[0],r),u[0];const h=new Mn;r.extensions&&Di(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Jt(Hu.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Fa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),In(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,d=a.length;c<d;c++){const u=a[c];if(u){o.push(u);const h=new Ge;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ac(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let u=0,h=s.channels.length;u<h;u++){const f=s.channels[u],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(g),d.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(u){const h=u[0],f=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let E=0,M=h.length;E<M;E++){const C=h[E],A=f[E],P=g[E],v=x[E],w=m[E];if(C===void 0)continue;C.updateMatrix&&C.updateMatrix();const N=n._createAnimationTracks(C,A,P,v,w);if(N)for(let R=0;R<N.length;R++)p.push(N[R])}const S=new Cl(r,void 0,p);return In(S,s),S})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,d=o.length;c<d;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const d=c[0],u=c[1],h=c[2];h!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(h,ty)});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);if(d.userData.pivot!==void 0&&u.length>0){const f=d.userData.pivot,g=u[0];d.pivot=new I().fromArray(f),d.position.x-=f[0],d.position.y-=f[1],d.position.z-=f[2],g.position.set(0,0,0),delete d.userData.pivot}return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new ju:c.length>1?d=new Mn:c.length===1?d=c[0]:d=new _t,d!==c[0])for(let u=0,h=c.length;u<h;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),In(d,r),r.extensions&&Di(n,d,r),r.matrix!==void 0){const u=new Ge;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(d);s.associations.set(d,{...u})}return s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Mn;n.name&&(r.name=s.createUniqueName(n.name)),In(r,n),n.extensions&&Di(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,u=l.length;d<u;d++){const h=l[d];h.parent!==null?r.add(Mb(h)):r.add(h)}const c=d=>{const u=new Map;for(const[h,f]of s.associations)(h instanceof Bn||h instanceof kt)&&u.set(h,f);return d.traverse(h=>{const f=s.associations.get(h);f!=null&&u.set(h,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}vi[r.path]===vi.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let d;switch(vi[r.path]){case vi.weights:d=Ls;break;case vi.rotation:d=Ds;break;case vi.translation:case vi.scale:d=Ns;break;default:switch(n.itemSize){case 1:d=Ls;break;case 2:case 3:default:d=Ns;break}break}const u=s.interpolation!==void 0?Yb[s.interpolation]:xr,h=this._getArrayFromAccessor(n);for(let f=0,g=l.length;f<g;f++){const x=new d(l[f]+"."+vi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Nl(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Ds?jb:mh;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function iy(i,e,t){const n=e.attributes,s=new Zt;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){const d=Nl(Ms[o.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new I,l=new I;for(let c=0,d=r.length;c<d;c++){const u=r[c];if(u.POSITION!==void 0){const h=t.json.accessors[u.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){const x=Nl(Ms[h.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Hn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function cu(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=Dl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return $e.workingColorSpace!==sn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),In(i,e),iy(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Zb(i,e.targets,t):i})}function mc(i){return`/qianfeng-windops-platform/${i.replace(/^\//,"")}`}const sy=mc("models/first-version/equipment.glb"),ry=mc("models/first-version/skeleton.glb"),ay=mc("js/draco/gltf/"),oy={blade:[/blade/i,/pitch/i,/叶片/,/变桨/],hub:[/hub/i,/rotor/i,/shaft/i,/主轴/,/轮毂/,/转子/],nacelle:[/nacelle/i,/generator/i,/机舱/,/发电/],tower:[/tower/i,/mast/i,/塔筒/],foundation:[/base/i,/foundation/i,/anchor/i,/基础/,/锚/],gearbox:[/gear/i,/box/i,/齿轮/]};function gh(i){if(Array.isArray(i)){i.forEach(e=>e.dispose());return}i.dispose()}function ly(i){i.traverse(e=>{var n;const t=e;t.isMesh&&((n=t.geometry)==null||n.dispose(),t.material&&gh(t.material))})}function ma(i){return i?Array.isArray(i)?i:[i]:[]}function cy(i,e){ma(i.material).forEach(t=>{t.transparent=e<1,t.opacity=e,t.depthWrite=e>=.78})}function dy(){const i=new Mn;i.name="fallback_first_version_turbine";const e=new Qn({color:14678527,roughness:.46,metalness:.22}),t=new Qn({color:2415350,opacity:.38,transparent:!0,wireframe:!0}),n=new Qn({color:16756768,roughness:.5,metalness:.12}),s=new wt(new Aa(.12,.22,2.9,32),e);s.name="tower_fallback",s.position.set(0,-.9,0);const r=new wt(new Jn(1.52,.42,.42),t);r.name="nacelle_fallback",r.position.set(.72,.78,0);const a=new wt(new Jn(.28,.28,.28),n);a.name="gearbox_fallback",a.position.set(.34,.78,0);const o=new wt(new Jn(.38,.3,.3),e);o.name="generator_fallback",o.position.set(.88,.78,0);const l=new wt(new dc(.2,32,16),e);l.name="hub_fallback",l.position.set(-.15,.78,0);const c=new Mn;c.name="blade_group_fallback";const d=new Qn({color:16121343,roughness:.52});for(let h=0;h<3;h+=1){const f=new wt(new Jn(.08,1.26,.045),d);f.name=`blade_${h+1}_fallback`,f.geometry.translate(0,.62,0),f.rotation.z=Math.PI*2*h/3,c.add(f)}c.position.copy(l.position),c.rotation.y=Math.PI/2;const u=new wt(new Aa(.42,.48,.12,32),e);return u.name="foundation_fallback",u.position.set(0,-2.38,0),i.add(u,s,r,a,o,l,c),i.rotation.y=-.72,i.position.y=.65,i.scale.setScalar(1.08),i}class uy{constructor(e){pt(this,"container");pt(this,"onPartPicked");pt(this,"onStatus");pt(this,"selectableMeshes",[]);pt(this,"originalPositions",new Map);pt(this,"selectedMaterials",new Map);pt(this,"explodableObjects",[]);pt(this,"mixers",[]);pt(this,"objectTransitions",new Map);pt(this,"scene");pt(this,"camera");pt(this,"renderer");pt(this,"controls");pt(this,"rootGroup");pt(this,"animationFrame",0);pt(this,"lastFrameAt",0);pt(this,"warningPulseActive",!1);pt(this,"warningStartedAt",0);pt(this,"warningTargets",[]);pt(this,"initPromise");pt(this,"resizeObserver");pt(this,"disposed",!1);pt(this,"animate",()=>{var n;if(this.disposed||!this.renderer||!this.scene||!this.camera)return;this.animationFrame=window.requestAnimationFrame(this.animate);const e=window.performance.now(),t=this.lastFrameAt>0?(e-this.lastFrameAt)/1e3:0;this.lastFrameAt=e,this.mixers.forEach(s=>s.update(t)),this.updateTransitions(e),this.updateWarningPulse(e),(n=this.controls)==null||n.update(),this.renderer.render(this.scene,this.camera)});pt(this,"pickPart",e=>{var o,l,c;if(!this.renderer||!this.camera)return;const t=this.renderer.domElement.getBoundingClientRect(),n=new Le((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),s=new lg;s.setFromCamera(n,this.camera);const r=(o=s.intersectObjects(this.selectableMeshes,!0)[0])==null?void 0:o.object;if(!r)return;this.applyHighlight([r]);const a=r.name||((l=r.parent)==null?void 0:l.name)||"BIM part";this.setStatus(`已选中构件：${a}`),(c=this.onPartPicked)==null||c.call(this,a)});this.container=e.container,this.onPartPicked=e.onPartPicked,this.onStatus=e.onStatus}initialize(){return this.initPromise||(this.initPromise=this.setup()),this.initPromise}resize(){if(!this.renderer||!this.camera)return;const e=Math.max(this.container.clientWidth,640),t=Math.max(this.container.clientHeight,420);this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}async decompose(){var n;await this.initialize();const e=this.explodableObjects.length>0?this.explodableObjects:((n=this.rootGroup)==null?void 0:n.children)??[],t=new Map;e.forEach((s,r)=>{const a=this.originalPositions.get(s)??s.position.clone(),o=this.toLocalOffset(s,this.componentExplodeOffset(s,r));t.set(s,a.clone().add(o))}),this.transitionObjects(t,760),this.setStatus("模型拆解中：内部设备构件已按传动链、冷却与控制链路展开")}async compose(){await this.initialize();const e=new Map;this.originalPositions.forEach((t,n)=>{e.set(n,t.clone())}),this.transitionObjects(e,680),this.setStatus("模型复原中：回到整机 BIM 状态")}async focusPart(e){await this.initialize();const t=this.findPartMeshes(e);this.applyHighlight(t),this.focusCameraOnMeshes(t,e),this.setStatus(t.length>0?`已定位 ${this.partLabel(e)} 构件`:`${this.partLabel(e)} 未匹配到明确构件，已保留整机视图`)}toggleWarning(){return this.warningPulseActive?(this.stopWarning(),!1):(this.startWarning(),!0)}stopWarning(){this.warningPulseActive=!1,this.applyWarningEmissive(!1),this.setStatus("告警闪烁已停止")}dispose(){var e,t,n,s;this.disposed=!0,this.stopWarning(),this.animationFrame&&window.cancelAnimationFrame(this.animationFrame),(e=this.resizeObserver)==null||e.disconnect(),(t=this.renderer)==null||t.domElement.removeEventListener("pointerdown",this.pickPart),(n=this.controls)==null||n.dispose(),this.rootGroup&&ly(this.rootGroup),(s=this.renderer)==null||s.dispose(),this.container.replaceChildren()}async setup(){this.disposed=!1,this.setStatus("正在加载整机 BIM 模型...");const e=new sm;e.background=new Ie(133909),e.fog=new sc(133909,5.4,10.8);const t=new Jt(42,1,.01,120);t.position.set(2.15,1.05,2.45);const n=new ab({antialias:!0,alpha:!0});n.domElement.className="bim-webgl",n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=Mt,n.shadowMap.enabled=!0,this.container.replaceChildren(n.domElement);const s=new lb(t,n.domElement);s.enableDamping=!0,s.dampingFactor=.08,s.target.set(.1,.06,.02),s.minDistance=.9,s.maxDistance=7.2,s.update(),this.scene=e,this.camera=t,this.renderer=n,this.controls=s,this.addLights(e),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),window.addEventListener("resize",()=>this.resize(),{passive:!0}),n.domElement.addEventListener("pointerdown",this.pickPart),this.resize(),this.animate(),await this.loadModels(e),this.resize()}addLights(e){e.add(new Wm(9166847,.88));const t=new Rl(16777215,3.8);t.position.set(4,5,6),e.add(t);const n=new Rl(2415094,2.2);n.position.set(-5,3,-4),e.add(n);const s=new cg(5.4,28,2415094,997975);s.name="bim_reference_grid",s.position.y=-2.42,ma(s.material).forEach(r=>{r.transparent=!0,r.opacity=.15}),e.add(s)}async loadModels(e){const t=new Eb,n=new yb;n.setDecoderPath(ay),t.setDRACOLoader(n);const s=new Mn;s.name="windops_first_version_bim_root";try{const[r,a]=await Promise.all([t.loadAsync(sy),t.loadAsync(ry)]),o=new Mn;o.name="first_version_aligned_layers";const l=this.prepareModelLayer(a.scene,"first_version_skeleton",{selectable:!1}),c=this.prepareModelLayer(r.scene,"first_version_equipment",{selectable:!0});this.playAnimations(l,a.animations),this.playAnimations(c,r.animations),l.traverse(d=>{const u=d;u.isMesh&&(gh(u.material),u.material=new Qn({color:1694975,emissive:688804,emissiveIntensity:.52,opacity:.36,transparent:!0,wireframe:!0,depthWrite:!1,roughness:.42}))}),o.add(l,c),s.add(this.fitModelToFocus(o,c,5.15)),this.setStatus("整机透视：设备实体层与蓝色骨架层已对齐")}catch(r){console.warn("[WindOps BIM] failed to load detailed BIM model, using fallback",r);const a=dy();this.prepareModelLayer(a,"first_version_equipment",{selectable:!0}),s.add(this.fitModelToStage(a,4.2)),this.setStatus("BIM 模型加载失败，已启用安全备用模型")}finally{n.dispose()}s.rotation.set(-.08,-.38,.01),e.add(s),this.rootGroup=s,this.prepareExplodeTargets(s)}prepareModelLayer(e,t,n){return e.name=t,e.traverse(s=>{const r=s;r.isMesh&&(r.name||(r.name=`${t}_part`),r.castShadow=!0,r.receiveShadow=!0,r.material=Array.isArray(r.material)?r.material.map(a=>a.clone()):r.material.clone(),r.userData.layerName=t,r.userData.selectable=n.selectable,n.selectable&&this.selectableMeshes.push(r),cy(r,t==="first_version_skeleton"?.34:.92))}),e}fitModelToStage(e,t){const n=new Zt().setFromObject(e),s=n.getSize(new I),r=Math.max(s.x,s.y,s.z);if(Number.isFinite(r)&&r>0){e.scale.multiplyScalar(t/r),n.setFromObject(e);const a=n.getCenter(new I);e.position.sub(a)}return e}fitModelToFocus(e,t,n){const s=new Zt().setFromObject(t),r=s.getSize(new I),a=Math.max(r.x,r.y,r.z);if(Number.isFinite(a)&&a>0){const o=n/a,l=s.getCenter(new I);e.scale.multiplyScalar(o),e.position.set(-l.x*o-.12,-l.y*o-.02,-l.z*o)}return e}prepareExplodeTargets(e){this.explodableObjects.length=0,this.originalPositions.clear();const t=new Map;e.traverse(n=>{if(n===e)return;const s=n,r=n.name||"",a=s.isMesh&&s.userData.selectable===!0,o=/fallback/i.test(r);!a&&!o||/(blade|pitch|hub|rotor|shaft|gear|generator|cool|cabinet|yaw|tower|foundation|叶|变桨|转子|主轴|齿轮|发电|油冷|风冷|冷|柜|偏航|塔筒|基础)/i.test(r)&&t.set(r||n.uuid,n)}),t.forEach(n=>{this.explodableObjects.push(n),this.originalPositions.set(n,n.position.clone())})}findPartMeshes(e){const t=oy[e],n=this.selectableMeshes.filter(r=>{var o,l,c;const a=[r.name,(o=r.parent)==null?void 0:o.name,(c=(l=r.parent)==null?void 0:l.parent)==null?void 0:c.name].filter(Boolean).join(" ");return t.some(d=>d.test(a))});if(n.length>0)return this.rankPartMeshes(e,n).slice(0,e==="gearbox"?10:24);const s=this.meshBounds(this.selectableMeshes);return e==="tower"?s.filter(({center:r})=>r.y<-.25).map(({mesh:r})=>r).slice(0,18):e==="foundation"?s.filter(({center:r})=>r.y<-1.6).map(({mesh:r})=>r).slice(0,18):e==="blade"?s.filter(({center:r})=>r.x<-.35||r.y>.65).map(({mesh:r})=>r).slice(0,18):e==="gearbox"?this.rankPartMeshes(e,s.map(({mesh:r})=>r)).slice(0,10):e==="nacelle"?s.filter(({center:r})=>r.y>.1&&r.x>-.25).map(({mesh:r})=>r).slice(0,18):s.filter(({center:r})=>r.y>.1&&r.x<.4).map(({mesh:r})=>r).slice(0,18)}meshBounds(e){return e.map(t=>{const n=new Zt().setFromObject(t);return{box:n,center:n.getCenter(new I),mesh:t,size:n.getSize(new I)}})}rankPartMeshes(e,t){if(e!=="gearbox")return t;const n=this.meshBounds(t),s=new Zt;n.forEach(({box:l})=>s.union(l));const r=s.getSize(new I),a=s.min,o=new I(.47,.62,.5);return n.map(l=>{var g,x,m;const c=new I(r.x>0?(l.center.x-a.x)/r.x:.5,r.y>0?(l.center.y-a.y)/r.y:.5,r.z>0?(l.center.z-a.z)/r.z:.5),d=Math.max(1e-4,l.size.x*l.size.y*l.size.z),u=[l.mesh.name,(g=l.mesh.parent)==null?void 0:g.name,(m=(x=l.mesh.parent)==null?void 0:x.parent)==null?void 0:m.name].filter(Boolean).join(" "),h=/gearbox|gear box|gear_box|齿轮箱|齿轮/i.test(u)?-.8:0,f=d>.08?.45:0;return{mesh:l.mesh,score:c.distanceTo(o)+f+h}}).sort((l,c)=>l.score-c.score).map(({mesh:l})=>l)}focusCameraOnMeshes(e,t){if(!this.camera||!this.controls||e.length===0)return;const n=new Zt;e.forEach(c=>n.union(new Zt().setFromObject(c)));const s=n.getCenter(new I),r=n.getSize(new I),a=Math.max(r.x,r.y,r.z,.32),l={blade:new I(1.1,.72,1.18),foundation:new I(1.05,.5,1.18),gearbox:new I(1.05,.36,1),hub:new I(1,.38,.95),nacelle:new I(1.18,.42,1.08),tower:new I(1.08,.58,1.12)}[t].clone().normalize().multiplyScalar(Math.max(1.05,a*2.9));this.controls.target.copy(s),this.camera.position.copy(s.clone().add(l)),this.camera.near=.01,this.camera.updateProjectionMatrix(),this.controls.update()}applyHighlight(e){this.selectedMaterials.forEach((t,n)=>{n.material=t}),this.selectedMaterials.clear(),e.forEach(t=>{this.selectedMaterials.set(t,t.material),t.material=new Qn({color:16756768,emissive:16734751,emissiveIntensity:.42,opacity:.96,transparent:!0,roughness:.38,metalness:.2})})}startWarning(){this.initialize().then(()=>{this.warningTargets=this.findPartMeshes("gearbox"),this.warningTargets.length===0&&(this.warningTargets=this.selectableMeshes.slice(0,24)),this.warningPulseActive=!0,this.warningStartedAt=window.performance.now(),this.setStatus("告警闪烁中：疑似部件进入橙色预警态")}).catch(()=>{})}applyWarningEmissive(e){(this.warningTargets.length>0?this.warningTargets:this.findPartMeshes("gearbox")).forEach(n=>{ma(n.material).forEach(s=>{const r=s;r.emissive&&(r.emissive.set(e?16734751:0),r.emissiveIntensity=e?1.2:0)})})}updateWarningPulse(e){if(!this.warningPulseActive)return;const t=.38+(Math.sin((e-this.warningStartedAt)/118)+1)/2*1.5;this.warningTargets.forEach(n=>{ma(n.material).forEach(s=>{const r=s;r.emissive&&(r.emissive.set(16734751),r.emissiveIntensity=t)})})}playAnimations(e,t){if(t.length===0)return;const n=new og(e);t.forEach(s=>n.clipAction(s).play()),this.mixers.push(n)}componentExplodeOffset(e,t){const n=e.name;if(/油冷|oil/i.test(n))return new I(.08,.58,.22);if(/风冷|cool/i.test(n))return new I(.26,.36,.24);if(/控制|柜|cabinet/i.test(n))return new I(.48,.26,.22);if(/变桨|扇叶|blade|pitch/i.test(n))return new I(-.72,.18,.34);if(/转子|rotor/i.test(n))return new I(-.52,.1,.22);if(/主轴|shaft/i.test(n))return new I(-.3,.08,.18);if(/齿轮|gear/i.test(n))return new I(-.04,.1,.42);if(/发电|generator/i.test(n))return new I(.36,.1,.16);if(/偏航|yaw/i.test(n))return new I(.02,-.24,-.28);const s=t%2===0?.16:-.16,r=t%3===0?.18:-.18;return new I(s,.04+t%4*.03,r)}toLocalOffset(e,t){var s;const n=((s=e.parent)==null?void 0:s.getWorldScale(new I))??new I(1,1,1);return new I(n.x?t.x/n.x:t.x,n.y?t.y/n.y:t.y,n.z?t.z/n.z:t.z)}transitionObjects(e,t){const n=window.performance.now();e.forEach((s,r)=>{this.objectTransitions.set(r,{duration:t,from:r.position.clone(),start:n,to:s})})}updateTransitions(e){this.objectTransitions.forEach((t,n)=>{const s=Math.min(1,(e-t.start)/t.duration),r=s<.5?2*s*s:1-(-2*s+2)**2/2;n.position.lerpVectors(t.from,t.to,r),s>=1&&this.objectTransitions.delete(n)})}partLabel(e){return{blade:"叶片/变桨系统",hub:"转子/主轴",nacelle:"机舱/发电机",tower:"塔筒结构",foundation:"基础/锚栓",gearbox:"齿轮箱"}[e]}setStatus(e){var t;(t=this.onStatus)==null||t.call(this,e)}}function hy(i){if(!i.startsWith("/"))throw new Error(`Expected an absolute local path, got: ${i}`);return`/@fs${i.split("/").map(e=>encodeURIComponent(e)).join("/")}`}const Ul={origin:{longitude:106.6,latitude:26.5,height:1250},turbines:[Io("HS-WTG-01","normal",{east:-500,north:-330,up:136},94),Io("HS-WTG-02","warning",{east:-20,north:-210,up:137},94),Io("HS-WTG-03","warning",{east:460,north:-90,up:134},94)]};function Io(i,e,t,n){return{name:i,turbineId:i,absolutePath:"/Users/rudy/Downloads/wind_turbine/scene.gltf",publicPath:"models/wind-turbine/scene.gltf",scale:2.8,offset:t,headingDegrees:n,hasRotorAnimation:!0,geometry:{towerHeight:126,towerRadius:5,nacelleLength:64,bladeRadius:74},credit:'This work is based on "Wind Turbine" by Sket_h, licensed under CC-BY-4.0.',riskLevel:e}}const _h=new Cesium.HeadingPitchRange(5.66,-.24,1180),xh=new Cesium.HeadingPitchRange(5.82,-.22,520);async function fy({container:i,config:e,onIntroComplete:t,onTurbineSelected:n}){const s=new Cesium.Viewer(i,{animation:!1,baseLayer:!1,baseLayerPicker:!1,fullscreenButton:!1,geocoder:!1,homeButton:!1,infoBox:!1,navigationHelpButton:!1,sceneModePicker:!1,selectionIndicator:!1,skyBox:!1,timeline:!1,terrainProvider:new Cesium.EllipsoidTerrainProvider,useBrowserRecommendedResolution:!1});s.scene.globe.show=!0,s.scene.globe.baseColor=Cesium.Color.fromCssColorString("#102129"),s.scene.globe.enableLighting=!1,s.scene.skyAtmosphere=void 0,s.scene.backgroundColor=Cesium.Color.fromCssColorString("#172129"),s.scene.highDynamicRange=!1,s.scene.fog.enabled=!1,s.scene.light=new Cesium.DirectionalLight({direction:Cesium.Cartesian3.normalize(new Cesium.Cartesian3(.35,.58,-.74),new Cesium.Cartesian3),color:Cesium.Color.WHITE,intensity:3.4}),s.resolutionScale=1,Ay(s);const r=Cesium.Cartesian3.fromDegrees(e.origin.longitude,e.origin.latitude,e.origin.height),a=Cesium.Transforms.eastNorthUpToFixedFrame(r);my(s,e);let o=e.turbines[0];const l=new Map,c=new Map;let d;if(!o)throw new Error("Scene config must include at least one turbine.");for(const E of e.turbines)gy(s,a,E),l.set(E.turbineId,_y(s,a,E)),E.publicPath&&xy(s,a,E).then(M=>{c.set(E.turbineId,M),Lo(c,d)}).catch(M=>{console.warn(`[WindOps GIS] failed to load ${E.turbineId} local wind turbine model.`,M)});const u=()=>{Lo(c,d)};s.scene.preRender.addEventListener(u);const h=pn(a,Sy(e.turbines)),f=()=>{s.camera.flyToBoundingSphere(new Cesium.BoundingSphere(h,780),{duration:2.6,offset:_h})},g=E=>{d=E,l.forEach((M,C)=>{M.forEach(A=>{A.show=C===E})}),Lo(c,d)},x=()=>{n==null||n(o),s.camera.lookAt(pn(a,yr(o)),xh),s.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)},m=E=>{if(!E){x();return}const M=e.turbines.find(C=>C.turbineId===E);M&&(o=M,g(M.turbineId),x())},p=e.turbines.find(E=>E.riskLevel!=="normal")??o;py(s,r,h,pn(a,yr(p)),()=>{o=p,g(p.turbineId),t==null||t(p)});const S=new Cesium.ScreenSpaceEventHandler(s.canvas);return S.setInputAction(E=>{var v,w;const M=s.scene.pick(E.position),C=(v=M==null?void 0:M.primitive)==null?void 0:v.id,A=typeof((w=M==null?void 0:M.id)==null?void 0:w.id)=="string"?M.id.id:"",P=(C==null?void 0:C.kind)==="turbine"?C.turbineId:My(A)??Ey(s,a,e,E.position);P&&m(P)},Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),{focusTurbine:m,showMountainOverview:f,showTurbineAlert:g,destroy:()=>{s.scene.preRender.removeEventListener(u),S.destroy(),s.destroy()}}}function py(i,e,t,n,s){i.camera.lookAt(e,new Cesium.HeadingPitchRange(5.08,-1.12,8200)),i.camera.lookAtTransform(Cesium.Matrix4.IDENTITY),window.setTimeout(()=>{i.camera.flyToBoundingSphere(new Cesium.BoundingSphere(t,780),{duration:2.7,offset:_h,complete:()=>{i.camera.flyToBoundingSphere(new Cesium.BoundingSphere(n,180),{duration:2.3,offset:xh,complete:s})}})},700)}function my(i,e,t){const n=e.origin.longitude,s=e.origin.latitude,r=.023,a=.0182;i.entities.add({id:"laoyeling-mountain-surface",rectangle:{coordinates:Cesium.Rectangle.fromDegrees(n-r,s-a,n+r,s+a),height:e.origin.height+8,material:new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString("rgba(84, 118, 94, 0.78)"))}})}function gy(i,e,t){const n=vh(t),s=pn(e,{...n,up:n.up-2});i.entities.add({id:`${t.turbineId}-ridge-pad`,position:pn(e,{...n,up:n.up+1}),ellipse:{semiMajorAxis:36,semiMinorAxis:24,material:Cesium.Color.fromCssColorString("rgba(169, 190, 154, 0.18)"),outline:!1}}),i.entities.add({id:`${t.turbineId}-foundation`,position:s,cylinder:{length:8,topRadius:13,bottomRadius:18,material:Cesium.Color.fromCssColorString("rgba(194, 205, 185, 0.62)"),outline:!1}});const r=[pn(e,{east:t.offset.east-155,north:t.offset.north-70,up:n.up}),pn(e,{east:t.offset.east-72,north:t.offset.north-34,up:n.up+1}),pn(e,{east:t.offset.east+16,north:t.offset.north,up:n.up+1})];i.entities.add({id:`${t.turbineId}-service-road`,corridor:{positions:r,width:8,material:Cesium.Color.fromCssColorString("rgba(226, 214, 164, 0.62)")}})}function _y(i,e,t){var u,h;if(t.riskLevel==="normal")return[];const n=yr(t),s=vh(t),r=pn(e,{...n,up:n.up+16}),a=pn(e,{...s,up:s.up+10}),o=((h=(u=t.turbineId.match(/(\d+)$/))==null?void 0:u[1])==null?void 0:h.replace(/^0+/,""))??t.turbineId,l=new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(()=>{const f=.14+(Math.sin(Date.now()/160)+1)/2*.26;return Cesium.Color.fromCssColorString(`rgba(255, 36, 36, ${f.toFixed(3)})`)},!1)),c=i.entities.add({id:`${t.turbineId}-risk-ring`,position:a,show:!1,ellipse:{semiMajorAxis:84,semiMinorAxis:58,material:l,outline:!0,outlineColor:Cesium.Color.fromCssColorString("rgba(255, 68, 68, 0.95)")}}),d=i.entities.add({id:`${t.turbineId}-risk-beacon`,position:r,show:!1,point:{color:Cesium.Color.fromCssColorString("#ff3030"),outlineColor:Cesium.Color.fromCssColorString("#ffe0e0"),outlineWidth:2,pixelSize:new Cesium.CallbackProperty(()=>14+(Math.sin(Date.now()/150)+1)/2*7,!1)},label:{text:`${o}号机 一级预警`,fillColor:Cesium.Color.WHITE,font:"700 18px sans-serif",outlineColor:Cesium.Color.fromCssColorString("#4b0000"),outlineWidth:3,pixelOffset:new Cesium.Cartesian2(0,-34),showBackground:!0,backgroundColor:Cesium.Color.fromCssColorString("rgba(62, 0, 0, 0.84)")}});return[c,d]}async function xy(i,e,t){const n=vy(t),s=await fetch(n,{method:"HEAD"}),r=s.headers.get("content-type")??"";if(!s.ok||r.includes("text/html"))throw new Error(`Wind turbine GLTF is not available at ${n}`);const a=await Cesium.Model.fromGltfAsync({url:n,modelMatrix:yy(e,t),scale:t.scale,minimumPixelSize:64});return a.id={kind:"turbine",turbineId:t.turbineId},i.scene.primitives.add(a),t.hasRotorAnimation&&by(a),a}function vy(i){return i.publicPath?`/qianfeng-windops-platform/${i.publicPath.replace(/^\//,"")}`:hy(i.absolutePath)}function Lo(i,e){const t=.34+(Math.sin(Date.now()/150)+1)/2*.46;i.forEach((n,s)=>{if(n.isDestroyed())return;const r=s===e;n.colorBlendMode=Cesium.ColorBlendMode.MIX,n.colorBlendAmount=r?t:0,n.color=r?Cesium.Color.fromCssColorString(`rgba(255, 20, 20, ${Math.min(.98,t+.2).toFixed(3)})`):Cesium.Color.WHITE,n.silhouetteColor=r?Cesium.Color.fromCssColorString(`rgba(255, 48, 48, ${Math.min(1,t+.24).toFixed(3)})`):Cesium.Color.TRANSPARENT,n.silhouetteSize=r?1.6+t*3.2:0})}function by(i){const e=()=>{i.isDestroyed()||i.activeAnimations.length>0||(i.activeAnimations.animateWhilePaused=!0,i.activeAnimations.addAll({loop:Cesium.ModelAnimationLoop.REPEAT,animationTime:t=>Date.now()/1e3%Math.max(t,.001)}))};if(i.ready){window.setTimeout(e,0);return}i.readyEvent.addEventListener(e)}function yy(i,e){return Cesium.Transforms.headingPitchRollToFixedFrame(pn(i,e.offset),new Cesium.HeadingPitchRoll(Ty(e.headingDegrees),0,0))}function yr(i){return{east:i.offset.east+10,north:i.offset.north,up:i.offset.up+8}}function vh(i){return{east:i.offset.east,north:i.offset.north,up:i.offset.up-i.geometry.towerHeight}}function Sy(i){const e=i.reduce((n,s)=>{const r=yr(s);return{east:n.east+r.east,north:n.north+r.north,up:n.up+r.up}},{east:0,north:0,up:0}),t=Math.max(i.length,1);return{east:e.east/t,north:e.north/t,up:e.up/t-24}}function My(i){var e;return(e=i.match(/^HS-WTG-\d{2}/))==null?void 0:e[0]}function Ey(i,e,t,n){let s;for(const r of t.turbines){const a=Cesium.SceneTransforms.worldToWindowCoordinates(i.scene,pn(e,yr(r)));if(!a)continue;const o=Cesium.Cartesian2.distance(n,a);(!s||o<s.distance)&&(s={turbineId:r.turbineId,distance:o})}return s&&s.distance<=120?s.turbineId:void 0}function Ty(i){return i*Math.PI/180}function pn(i,e){return Cesium.Matrix4.multiplyByPoint(i,new Cesium.Cartesian3(e.east,e.north,e.up),new Cesium.Cartesian3)}function Ay(i){const e=i.cesiumWidget.creditContainer;e&&(e.style.display="none")}const bh={caseDate:"20260621",cmsBaselineAmplitude:.8,cmsPeaks:[{amplitude:.32,frequencyHz:18,label:"1P 转频",status:"normal"},{amplitude:.58,frequencyHz:48,label:"轴承通过频率",status:"normal"},{amplitude:1.68,frequencyHz:96,label:"齿轮啮合频率 GMF",status:"warning"},{amplitude:1.22,frequencyHz:108,label:"GMF + 边带",status:"warning"},{amplitude:.74,frequencyHz:142,label:"结构耦合峰",status:"normal"}],eventCode:"gearbox_bearing_wear",focusScadaSampleIndex:3,maintenance:{actionWindowHours:"48 - 72 h",estimatedRemainingHours:168,parts:"高速轴轴承 / 油液包",strategy:"利用明晚低风速窗口停机 2h，先做油液取样与内窥复核，若铁谱异常则升级检修。",workMode:"限功率 80%"},peerOilTempC:66.2,scadaSamples:[{expectedKw:260,oilTempC:66.8,powerKw:255,timestamp:"08:00",windSpeed:4.2},{expectedKw:430,oilTempC:68.7,powerKw:414,timestamp:"09:00",windSpeed:5.1},{expectedKw:680,oilTempC:70.1,powerKw:648,timestamp:"10:00",windSpeed:5.9},{expectedKw:930,oilTempC:74.6,powerKw:812,timestamp:"11:00",windSpeed:6.7},{expectedKw:1120,oilTempC:75.2,powerKw:976,timestamp:"12:00",windSpeed:7.4},{expectedKw:1310,oilTempC:76.1,powerKw:1152,timestamp:"13:00",windSpeed:8}],thresholds:{boltRelaxationWarningPct:8,cmsSidebandRatio:1.8,oilTempDeltaC:6,scadaPowerShortfallPct:10},turbineId:"HS-WTG-02"},wy={caseDate:"20260621",cmsBaselineAmplitude:.82,cmsPeaks:[{amplitude:.35,frequencyHz:18,label:"1P 转频",status:"normal"},{amplitude:.74,frequencyHz:48,label:"轴承通过频率",status:"normal"},{amplitude:1.94,frequencyHz:96,label:"齿轮啮合频率 GMF",status:"warning"},{amplitude:1.48,frequencyHz:108,label:"GMF + 边带",status:"warning"},{amplitude:.88,frequencyHz:142,label:"结构耦合峰",status:"normal"}],eventCode:"gearbox_bearing_wear_escalation",focusScadaSampleIndex:4,maintenance:{actionWindowHours:"24 - 48 h",estimatedRemainingHours:96,parts:"高速轴轴承 / 齿轮箱油液 / 内窥检测包",strategy:"优先安排最近低风速窗口停机复核；若铁谱或内窥存在剥落痕迹，升级为计划检修。",workMode:"限功率 70%"},peerOilTempC:66.4,scadaSamples:[{expectedKw:280,oilTempC:68.1,powerKw:270,timestamp:"08:00",windSpeed:4.4},{expectedKw:470,oilTempC:70.2,powerKw:438,timestamp:"09:00",windSpeed:5.3},{expectedKw:710,oilTempC:73.8,powerKw:632,timestamp:"10:00",windSpeed:6},{expectedKw:960,oilTempC:77.6,powerKw:812,timestamp:"11:00",windSpeed:6.8},{expectedKw:1160,oilTempC:79.4,powerKw:948,timestamp:"12:00",windSpeed:7.5},{expectedKw:1360,oilTempC:80.3,powerKw:1120,timestamp:"13:00",windSpeed:8.1}],thresholds:{boltRelaxationWarningPct:8,cmsSidebandRatio:1.8,oilTempDeltaC:6,scadaPowerShortfallPct:10},turbineId:"HS-WTG-03"},Us=[{id:"hs-wtg-02-gearbox-bearing",input:bh,scenario:"齿轮箱高速轴轴承早期磨损",severity:"orange",title:"HS-WTG-02 齿轮箱 P1 预警闭环"},{id:"hs-wtg-03-gearbox-escalation",input:wy,scenario:"齿轮箱侧频与油温同步升级",severity:"red",title:"HS-WTG-03 齿轮箱升级复核"}],yh=bh;function ga(i,e=1){const t=10**e;return Math.round(i*t)/t}function at(i,e=1){return i.toFixed(e)}function bi(i){return`${i>=0?"+":""}${at(i)}%`}function Cy(i){var e,t;return((t=(e=i.match(/(\d+)$/))==null?void 0:e[1])==null?void 0:t.padStart(2,"0"))??"00"}function du(i){var t;const e=(t=i.match(/(\d+)$/))==null?void 0:t[1];return e?`${Number(e)}号机`:i}function Sh(i){return i.expectedKw<=0?0:ga((i.expectedKw-i.powerKw)/i.expectedKw*100)}function Mh(i){return{baselineLabel:"OpenOA 风速-功率基线",points:i.scadaSamples.map(e=>{const t=Sh(e);return{expectedKw:e.expectedKw,powerKw:e.powerKw,residualPct:t,timestamp:e.timestamp,windSpeed:e.windSpeed,abnormal:t>=i.thresholds.scadaPowerShortfallPct}}),sampleWindow:"10 min SCADA / 最近 6 个采样窗",title:"风速-功率残差诊断",xAxis:{label:"风速 m/s",max:9,min:3,ticks:[3,5,7,9]},yAxis:{label:"有功功率 kW",max:1500,min:0,ticks:[0,500,1e3,1500]}}}function Eh(i){return{channels:[{angle:0,id:"B01",preloadKn:291.4,relaxationPct:2.1,status:"normal"},{angle:45,id:"B05",preloadKn:287.9,relaxationPct:3.4,status:"normal"},{angle:90,id:"B09",preloadKn:282.5,relaxationPct:5.2,status:"watch"},{angle:135,id:"B13",preloadKn:279.1,relaxationPct:6.4,status:"watch"},{angle:180,id:"B17",preloadKn:263.1,relaxationPct:9.6,status:"warning"},{angle:225,id:"B21",preloadKn:284.2,relaxationPct:4.8,status:"normal"},{angle:270,id:"B25",preloadKn:289.6,relaxationPct:2.9,status:"normal"},{angle:315,id:"B29",preloadKn:292.3,relaxationPct:1.8,status:"normal"}].map(n=>({...n,status:n.relaxationPct>=i.thresholds.boltRelaxationWarningPct?"warning":n.status})),nominalPreloadKn:290,title:"叶根螺栓预紧力环形监测",warningRelaxationPct:i.thresholds.boltRelaxationWarningPct}}function Ry(i){return i.reduce((e,t)=>t.preloadKn<e.preloadKn?t:e,i[0])}function Th(i=yh){const e=Mh(i),t=i.scadaSamples[i.focusScadaSampleIndex]??i.scadaSamples[0],n=Sh(t),s=Math.max(...e.points.map(g=>g.residualPct)),r=i.cmsPeaks.find(g=>g.status==="warning")??i.cmsPeaks[0],a=ga(r.amplitude/(r.baselineAmplitude??i.cmsBaselineAmplitude)),o=Eh(i),l=Ry(o.channels),c=ga(o.channels.reduce((g,x)=>g+x.preloadKn,0)/o.channels.length),d=o.channels.filter(g=>g.status==="warning").length,u=ga(t.oilTempC-i.peerOilTempC),h=Math.max(0,Math.round(100-s*.55-(a-1)*8-d*4-u*.4)),f=Math.min(96,Math.round(65+s*.7+(a-1)*10+d*2));return{boltAveragePreloadKn:c,boltLowestChannel:l,boltWarningChannels:d,cmsSidebandRatio:a,focusSample:t,focusShortfallPct:n,healthScore:h,maxPowerShortfallPct:s,oilTempDeltaC:u,riskConfidencePct:f,scadaAbnormalSamples:e.points.filter(g=>g.abnormal).length}}function Ah(i=yh){const e=Th(i),t=Mh(i),n={peaks:i.cmsPeaks.map(({baselineAmplitude:d,...u})=>u),sampleWindow:"CMS 高频采样 / 20 kHz / 60 s 包络谱",threshold:{label:"ISO 10816 关注线",value:1.2},title:"齿轮箱包络频谱",xAxis:{label:"频率 Hz",max:160,min:0,ticks:[0,40,80,120,160]},yAxis:{label:"振动幅值 mm/s",max:2,min:0,ticks:[0,.5,1,1.5,2]}},s=Eh(i),r=e.maxPowerShortfallPct>=i.thresholds.scadaPowerShortfallPct,a=e.cmsSidebandRatio>=i.thresholds.cmsSidebandRatio,o=e.oilTempDeltaC>=i.thresholds.oilTempDeltaC,l=e.boltWarningChannels>0,c=[r,a,o].filter(Boolean).length;return{component:"齿轮箱",componentRisks:[{component:"blade-root",module:"bolts",part:"blade",status:"稳定监视",title:"叶根螺栓"},{component:"drivetrain",module:"cms",part:"hub",status:"侧频复核",title:"传动链"},{component:"gearbox",module:"alerts",part:"gearbox",status:"P1 预警闭环",title:"齿轮箱"},{component:"tower",module:"bolts",part:"tower",status:"载荷校核",title:"塔筒结构"}],eventCode:i.eventCode,eventTimeline:[{description:`${du(i.turbineId)}触发齿轮箱一级预警，系统已生成短播报并锁定当前事件。`,id:"ai-alert",module:"brief",owner:"集控值班员",status:"done",title:"预警触发"},{description:`SCADA、CMS、油温与螺栓/结构监测进入同一证据包，核心证据越限 ${c}/3。`,id:"evidence-review",module:"fusion",owner:"诊断工程师",status:"active",title:"证据复核"},{description:"BIM 定位到齿轮箱与传动链，辅助现场人员理解疑似部件和反证部件。",id:"bim-location",module:"alerts",owner:"可视化系统",status:"pending",title:"BIM 定位"},{description:`按 ${i.maintenance.actionWindowHours} 生成现场复核工单草案，包含油液、内窥和 CMS 复测。`,id:"workorder-draft",module:"workorder",owner:"集控值班长",status:"pending",title:"工单草案"},{description:"停机、登塔和检修动作必须由现场工程师确认后执行，系统不自动派单或自动停机。",id:"human-confirm",module:"workorder",owner:"现场工程师",status:"review",title:"人工确认"},{description:"复核完成后回写油液、内窥、复测频谱和样本标签，用于下一次模型校准。",id:"review-writeback",module:"workorder",owner:"运维主管",status:"pending",title:"复盘回写"}],moduleOrder:["brief","health","fusion","scada","cms","bolts","alerts","inspection","maintenance","workorder"],modules:{brief:{action:{label:"展开证据链",module:"fusion",primary:!0},aiBrief:{broadcast:`黔风智维提醒：${du(i.turbineId)}齿轮箱出现一级预警，请进入告警研判查看证据链。`,conclusion:`${i.turbineId} 当前不是孤立阈值报警，而是运行残差、振动频谱和热异常共同指向齿轮箱高速轴轴承早期磨损。系统建议按预测维护流程生成巡检工单，复核前执行 ${i.maintenance.workMode}。`,decisionSteps:[{detail:"只把同一时间窗内可互相解释的数据放进本次事件，避免把不同时间的零散告警拼成假结论。",id:"data-ingest",input:`SCADA ${i.scadaSamples.length} 个 10 min 窗口、CMS 60 s 高频包、螺栓 ${s.channels.length} 路、油温对标`,model:"数据质量门 + 时间窗对齐",module:"fusion",result:"形成同一事件证据包",title:"接入并对齐数据"},{detail:"SCADA 先发现性能残差，CMS 再定位传动链特征，油温增强摩擦/润滑异常判断，螺栓作为结构反证。",id:"model-run",input:"功率残差、GMF 侧频、油温残差、叶根预紧力",model:"OpenOA 基线 + GMF 包络谱 + 热平衡残差 + 结构排查",module:"fusion",result:`核心证据越限 ${c}/3`,title:"运行模型判据"},{detail:"只有当运行异常和部件机理证据同向时，才升级为预测维护事件；结构监测未把主故障转移到叶根。",id:"decision",input:`置信度 ${e.riskConfidencePct}%、健康评分 ${e.healthScore}`,model:"证据融合门控",module:"alerts",result:"齿轮箱 P1 预警闭环",title:"给出值班结论"},{detail:"系统只生成工单草案和复核建议；限功率、停机、登塔和检修仍由值长与现场工程师确认。",id:"human-action",input:`${i.maintenance.actionWindowHours}、${i.maintenance.workMode}、备件 ${i.maintenance.parts}`,model:"预测维护规则 + 人工确认边界",module:"workorder",result:"生成复核工单草案",title:"转成人工动作"}],evidence:[`SCADA 最大功率缺口 ${bi(e.maxPowerShortfallPct)}，异常窗口 ${e.scadaAbnormalSamples}/${i.scadaSamples.length}`,`CMS 齿轮啮合侧频达到 ${at(e.cmsSidebandRatio)}x 基线`,`油温较同场同机型偏高 ${at(e.oilTempDeltaC)} ℃`,`螺栓/结构监测发现 ${e.boltWarningChannels} 路关注项，用于排除叶根结构主故障并跟踪山地阵风载荷`],operatorFocus:{decision:"先复核多源证据是否同向",humanCheck:"值班员确认非限电、非人为降载、非通信异常后，才进入告警研判和工单草案。",primaryQuestion:"先看融合判据",recommendedModule:"fusion",why:"系统先把 SCADA、CMS、油温和螺栓/结构证据放到同一事件窗口，避免用户只看一张曲线就误判。"},operatorQuestions:["为什么判定为齿轮箱风险？","关键证据来自哪些传感器？","下一步工单应该怎么安排？"],primaryAction:{label:"运行融合判据",module:"fusion",primary:!0},primaryFinding:"齿轮箱高速轴轴承早期磨损风险",recommendedAction:`进入证据链并生成 ${i.maintenance.actionWindowHours} 现场复核工单`,riskLevel:c>=3?"red":"orange"},body:"系统将多源监测结果整理成值班可读的告警研判：先给结论，再列证据、反证和下一步动作。大模型只基于该结构化证据生成专业报告，不直接替代安全决策。",kicker:"智能值班",metrics:[{label:"研判结论",value:"P1 预测维护"},{label:"疑似部件",value:"齿轮箱高速轴轴承"},{label:"证据来源",value:"SCADA / CMS / 螺栓 / 油温"},{label:"置信度",value:`${e.riskConfidencePct}%`}],title:`${i.turbineId} 告警研判`},health:{action:{label:"查看融合判据",module:"fusion"},hero:{score:String(e.healthScore),scoreLabel:"综合健康",summary:"齿轮箱链路进入 P1 关注",text:"风机仍可限功率运行，但需在低风速窗口完成 CMS 复核与油液取样。"},kicker:"Asset Health",metrics:[{label:"传动链健康",value:`${Math.max(0,e.healthScore-5)} / 100`},{label:"功率曲线偏差",value:bi(e.maxPowerShortfallPct)},{label:"风险置信度",value:`${e.riskConfidencePct}%`}],title:`${i.turbineId} 健康评分`},fusion:{action:{label:"进入告警研判",module:"alerts",primary:!0},body:`复核逻辑：先确认 SCADA/CMS/油温/螺栓都来自同一事件窗口，再按“运行异常 -> 部件定位 -> 热异常增强 -> 结构反证”的顺序过判据门。三项核心证据中 ${c}/3 项越限，螺栓/结构监测不改写主故障，只作为山地阵风载荷放大因素跟踪。`,decision:{confirm:"诊断工程师确认时间窗对齐、采样质量和结构反证后，才把事件从数据异常升级为 P1 预测维护预警。",evidence:`核心证据 ${c}/3 越限；SCADA 残差、CMS 侧频、油温热异常同向，螺栓监测作为结构反证保留，未发现足以改写主故障的环向扩展。`,input:"同一事件窗口内的 SCADA 功率曲线、CMS 包络谱、油温对标、螺栓/结构监测",model:"OpenOA 功率基线 + GMF 包络谱 + 热平衡残差 + 结构排查门控",operation:"运行融合判据",result:c>=2?"升级为齿轮箱 P1 预测维护事件":"继续观察，不生成工单"},fusionSignals:[{contribution:"运行异常主证据",metric:`最大功率缺口 ${bi(e.maxPowerShortfallPct)}`,quality:`${i.scadaSamples.length}/${i.scadaSamples.length} 个 10 min 窗口有效`,rule:`残差 >= ${i.thresholds.scadaPowerShortfallPct}%`,source:"SCADA 功率曲线",status:r?"alarm":"normal",window:"最近 60 min"},{contribution:"部件故障主证据",metric:`GMF 侧频 ${at(e.cmsSidebandRatio)}x 基线`,quality:"20 kHz 高频采样 / 60 s 包络谱",rule:`侧频 >= ${at(i.thresholds.cmsSidebandRatio)}x 基线`,source:"CMS 振动频谱",status:a?"alarm":"watch",window:"最近一次高频包"},{contribution:"热异常辅助证据",metric:`油温同场偏高 ${at(e.oilTempDeltaC)} ℃`,quality:"同场同机型对标完成",rule:`温差 >= ${i.thresholds.oilTempDeltaC} ℃`,source:"SCADA 油温",status:o?"alarm":"watch",window:"最近 6 h"},{contribution:"结构风险排查",metric:`${e.boltWarningChannels} 路预紧力关注`,quality:`${s.channels.length} 路叶根螺栓通道在线`,rule:`单通道松弛 >= ${i.thresholds.boltRelaxationWarningPct}% 进入结构关注，不直接归因为齿轮箱主故障`,source:"螺栓/结构监测",status:l?"watch":"normal",window:"日内滚动"}],kicker:"Fusion / Mechanism + Data Model",metrics:[{label:"核心证据越限",value:`${c} / 3`},{label:"融合结论",value:"齿轮箱 P1 预警"},{label:"处置门槛",value:c>=2?"进入现场复核":"继续观察"},{label:"人工复核",value:"时间窗 / 采样质量 / 结构反证"}],modelGates:[{layer:"数值模型",method:"OpenOA 风速-功率基线",result:`残差 ${bi(e.maxPowerShortfallPct)}`,rule:"同风速段功率低于期望曲线且连续越限",status:r?"block":"pass"},{layer:"机理模型",method:"齿轮啮合频率 + 边带",result:`${at(e.cmsSidebandRatio)}x 基线`,rule:"GMF 与边带同步抬升指向齿轮箱轴承/啮合异常",status:a?"block":"watch"},{layer:"热平衡校核",method:"同场同机型油温对标",result:`${at(e.oilTempDeltaC)} ℃`,rule:"油温偏高用于增强传动链摩擦/润滑异常判断",status:o?"block":"watch"},{layer:"排查项",method:"叶根螺栓预紧力",result:`${e.boltLowestChannel.id} ${at(e.boltLowestChannel.relaxationPct)}% 松弛`,rule:"若螺栓松弛未形成环向扩展，则作为载荷放大因素跟踪，主闭环仍指向齿轮箱",status:l?"watch":"pass"}],title:"多源融合与模型判据"},scada:{action:{label:"联动 CMS 振动",module:"cms"},body:`判断：同风速段输出持续低于期望功率曲线，最大功率缺口 ${at(e.maxPowerShortfallPct)}%，超过 ${i.thresholds.scadaPowerShortfallPct}% 预警线，同时油温较同类机组高 ${at(e.oilTempDeltaC)} ℃。`,decision:{confirm:"值班员确认该时段未发生限电、通信丢包或人为降载后，再把功率残差作为有效主证据。",evidence:`${i.scadaSamples.length} 个 10 min SCADA 采样窗中 ${e.scadaAbnormalSamples} 个异常，最大功率缺口 ${bi(e.maxPowerShortfallPct)}，油温偏高 ${at(e.oilTempDeltaC)} ℃。`,input:`${i.scadaSamples.length} 个 10 min 风速、功率、油温窗口`,model:"OpenOA 风速-功率基线 + 同场同机型油温对标",operation:"运行 SCADA 残差校核",result:r?"运行侧异常成立，转入 CMS 部件证据复核":"运行侧未形成连续异常"},kicker:"Evidence 01 / SCADA",metrics:[{label:"风速",value:`${at(e.focusSample.windSpeed)} m/s`},{label:"有功功率",value:`${e.focusSample.powerKw} kW`},{label:"功率残差",value:bi(e.focusShortfallPct)},{label:"齿轮箱油温",value:`${at(e.focusSample.oilTempC)} ℃`}],scadaChart:t,title:"运行状态与模型残差"},cms:{action:{label:"进入告警研判",module:"alerts"},body:`机理+数值判断：啮合频率及两侧边带同步抬升，当前侧频 ${at(e.cmsSidebandRatio)}x 基线，超过 ${at(i.thresholds.cmsSidebandRatio)}x 关注阈值；结合 SCADA 残差，指向齿轮箱早期磨损。`,decision:{confirm:"诊断工程师确认采样质量和转速工况后，再把侧频证据作为部件定位依据。",evidence:`CMS 高频包络谱显示 GMF 侧频 ${at(e.cmsSidebandRatio)}x 基线，超过 ${at(i.thresholds.cmsSidebandRatio)}x 关注阈值。`,input:"20 kHz 高频振动包络谱、转速工况、GMF 频率及边带",model:"齿轮啮合频率 GMF + 边带幅值比 + ISO 10816 关注线",operation:"运行 CMS 侧频复核",result:a?"部件证据指向齿轮箱高速轴轴承早期磨损":"振动证据不足，回到观察"},cmsChart:n,kicker:"Evidence 02 / CMS",metrics:[{label:"RMS 振动",value:"2.562 mm/s"},{label:"啮合侧频",value:`${at(e.cmsSidebandRatio)}x 基线`},{label:"疑似部件",value:"齿轮箱高速轴轴承"}],title:"齿轮箱振动诊断"},bolts:{action:{label:"回到告警研判",module:"alerts"},body:"排查结论：当前主风险不来自叶根螺栓，但山地阵风载荷会放大传动链冲击，保留联动监视。",decision:{confirm:"结构工程师确认螺栓松弛未形成环向扩展后，才把它作为载荷放大因素而不是主故障。",evidence:`${s.channels.length} 路叶根螺栓在线，最低通道 ${e.boltLowestChannel.id} 松弛 ${at(e.boltLowestChannel.relaxationPct)}%，关注通道 ${e.boltWarningChannels} 路。`,input:`${s.channels.length} 路叶根螺栓预紧力、塔筒一阶频率、山地阵风载荷`,model:"预紧力松弛阈值 + 环向扩展排查 + 结构反证",operation:"运行结构反证校核",result:l?"结构侧进入关注，但不改写齿轮箱主故障判断":"结构侧无显著异常"},boltChart:s,kicker:"Evidence 03 / Bolt & Structure",metrics:[{label:"叶根平均预紧力",value:`${at(e.boltAveragePreloadKn)} kN`},{label:"最低通道",value:`${e.boltLowestChannel.id} / ${at(e.boltLowestChannel.preloadKn)} kN`},{label:"温漂补偿",value:"已启用"},{label:"塔筒一阶频率",value:"0.329 Hz"}],title:"螺栓与结构监测"},alerts:{action:{label:"进入隐患排查",module:"inspection",primary:!0},body:"告警中心只承接已经通过融合判据的事件：SCADA 残差、油温与 CMS 侧频三项证据一致后，先在 BIM 中定位齿轮箱主疑似部件，再把叶根螺栓和塔筒结构作为反证项进入隐患排查。",decision:{confirm:"值长确认告警级别、BIM 疑似部件和结构反证项后，才进入隐患排查清单。",evidence:"告警不是单阈值触发，而是由 SCADA、CMS、油温三类主证据共同支撑，并由 BIM 定位到齿轮箱高速轴轴承。",input:"融合判据输出、BIM 齿轮箱定位、叶根/塔筒反证项、智能值班建议",model:"P1 告警分级规则 + BIM 部件映射 + 人工值班确认边界",operation:"确认告警闭环",result:"锁定齿轮箱主疑似部件，带着反证项进入隐患排查"},evidenceRows:[{confidence:"0.84",label:"证据 1",model:"OpenOA 风速-功率基线 + 同场同机型对标",source:"SCADA",threshold:`残差预警线 ${i.thresholds.scadaPowerShortfallPct}%`,value:`同风速段最大功率缺口 ${bi(e.maxPowerShortfallPct)}`,window:`${i.scadaSamples.length} 个 10 min 采样窗 / ${e.scadaAbnormalSamples} 个异常`},{confidence:"0.87",label:"证据 2",model:"包络谱 / GMF 侧频诊断",source:"CMS",threshold:`啮合侧频 > ${at(i.thresholds.cmsSidebandRatio)}x 基线`,value:`齿轮啮合侧频 ${at(e.cmsSidebandRatio)}x 基线`,window:"60 s 高频采样"},{confidence:"0.76",label:"证据 3",model:"热平衡残差 + 环境温度补偿",source:"SCADA/Oil Temp",threshold:`同类机组温差 > ${i.thresholds.oilTempDeltaC} ℃`,value:`油温高于同类机组 ${at(e.oilTempDeltaC)} ℃`,window:"最近 6 h"}],kicker:"Decision / Alarm Center",title:"齿轮箱 P1 预警研判"},inspection:{action:{label:"形成维护策略",module:"maintenance",primary:!0},body:"排查原则：先锁定传动链主风险，再排除叶根/塔筒结构主风险；现场复核只保留能改变处置策略、工单范围或运行限制的动作。",decision:{confirm:"现场班组确认复核动作可执行后，才转为预测维护策略，不把所有告警都派成检修单。",evidence:"主风险已锁定齿轮箱高速轴轴承；叶根结构主故障被排除；油液、内窥、CMS 复测会决定是否升级计划检修。",input:"告警证据、BIM 定位、结构反证、现场可执行窗口",model:"故障树排查 + 能改变决策的最小检查项",operation:"生成隐患排查路径",result:"保留 4 项排查动作：1 项锁定维护对象、1 项排除无关工单、2 项决定升级条件"},inspectionItems:[{basis:`SCADA 最大功率缺口 ${bi(e.maxPowerShortfallPct)}，CMS 侧频 ${at(e.cmsSidebandRatio)}x 基线`,decisionEffect:"维护对象锁定为齿轮箱高速轴轴承，后续工单不再泛化为整机巡检。",owner:"诊断工程师",result:"齿轮箱高速轴轴承早期磨损作为主隐患",status:"confirmed",step:"锁定主风险"},{basis:`最低螺栓通道 ${e.boltLowestChannel.id}，松弛 ${at(e.boltLowestChannel.relaxationPct)}%`,decisionEffect:"叶根/塔筒不生成独立检修单，只作为山地阵风载荷放大因素继续跟踪。",owner:"结构工程师",result:"作为载荷放大因素跟踪，暂不升级为叶根结构主故障",status:"excluded",step:"排除结构主故障"},{basis:`油温同场偏高 ${at(e.oilTempDeltaC)} ℃，建议 ${i.maintenance.actionWindowHours} 内复核`,decisionEffect:"若铁谱或内窥异常，预测维护升级为低风速窗口计划检修。",owner:"现场班组",result:"停机窗口执行油液取样、铁谱和内窥复核",status:"pending",step:"现场复核动作"},{basis:`预计剩余可运行 ${i.maintenance.estimatedRemainingHours} h，当前策略 ${i.maintenance.workMode}`,decisionEffect:"复核前维持限功率策略；若复测回落，工单降级为跟踪观察。",owner:"值长/调度",result:"复核前按建议限功率运行，若铁谱异常则升级计划检修",status:"pending",step:"运行限制与升级"}],kicker:"Troubleshooting / Hidden Risk",metrics:[{label:"主风险",value:"齿轮箱高速轴轴承"},{label:"排除项",value:"叶根结构主故障"},{label:"复核动作",value:"油液 + 内窥 + CMS 复测"}],title:"隐患排查清单"},maintenance:{action:{label:"生成运维工单",module:"workorder",primary:!0},body:`策略：${i.maintenance.strategy}。该策略只承接隐患排查保留下来的齿轮箱主风险：复核前执行 ${i.maintenance.workMode}，${i.maintenance.actionWindowHours} 内优先寻找低风速窗口；若油液、内窥或 CMS 复测异常，则升级为计划检修，否则降级为跟踪观察。`,decision:{confirm:"集控值班长确认低风速窗口、备件和安全许可后，才生成可执行工单。",evidence:`隐患排查已锁定齿轮箱高速轴轴承，预计剩余可运行 ${i.maintenance.estimatedRemainingHours} h；建议 ${i.maintenance.actionWindowHours} 内复核，复核前执行 ${i.maintenance.workMode}。`,input:"隐患排查结果、剩余可运行时间、低风速窗口、备件和班组资源",model:"预测维护策略规则 + 风险窗口排序 + 人工派工门控",operation:"计算处置策略",result:`${i.maintenance.strategy}；满足窗口、许可、资源、回写责任后生成工单草案`},kicker:"Action Plan / Predictive Maintenance",metrics:[{label:"建议处置窗口",value:i.maintenance.actionWindowHours},{label:"预计剩余可运行",value:`${i.maintenance.estimatedRemainingHours} h`},{label:"建议运行方式",value:i.maintenance.workMode},{label:"备件",value:i.maintenance.parts}],title:"预测性维护建议"},workorder:{decision:{confirm:"工单草案必须由值长与现场工程师确认后才执行；完成后回写油液、内窥、CMS 复测和样本标签。",evidence:`工单对象 ${i.turbineId} 齿轮箱高速轴轴承，作业窗口 ${i.maintenance.actionWindowHours}，作业前提 ${i.maintenance.workMode}。`,input:"AI 诊断结论、预测维护策略、安全许可和工器具",model:"工单模板 + 人工确认 + 复盘回写",operation:"生成复核工单草案",result:`待生成 ${i.turbineId} 现场复核工单`},kicker:"Closed Loop / Work Order",ticket:{acceptanceCriteria:["油液铁谱/颗粒度报告完成上传","内窥照片覆盖高速轴轴承与齿面","复测 CMS 侧频低于预警线或形成检修建议","AI 诊断样本回写完成"],asset:`${i.turbineId} / 齿轮箱高速轴轴承`,assignee:"传动链专业班组",closeActionLabel:"标记现场复核完成",closedActionLabel:"现场复核已完成",closedState:"现场复核完成",confirmationChecks:[{detail:"低风速 2h 停机窗口已由集控确认，避免高风速登塔和带病长时间运行。",id:"window",label:"低风速作业窗口",owner:"集控值班长"},{detail:"限功率策略、停机许可、登塔风速许可和双人作业要求已确认。",id:"safety",label:"安全许可与运行方式",owner:"安全员 / 值长"},{detail:"高速轴轴承备件、油液取样瓶、内窥镜和 CMS 复测采集器已可用。",id:"resources",label:"备件与工器具",owner:"检修班组"},{detail:"油液、内窥照片、CMS 复测和样本标签必须回写，用于模型校准。",id:"writeback",label:"复盘回写责任",owner:"运维主管"}],draftCode:"WO-GX-待创建",dueWindow:`${i.maintenance.actionWindowHours} / 低风速窗口优先`,dispatchedState:"已派发待现场复核",dispatchActionLabel:"确认派发工单",finalCode:`WO-GX-${i.caseDate}-${Cy(i.turbineId)}`,generatedState:"已生成",initialState:"待生成",location:"黔西南山地风场 / 3 号山脊检修道路",materials:["内窥镜","油液取样瓶","振动复测采集器",i.maintenance.parts],precondition:i.maintenance.workMode,priority:i.eventCode.includes("RED")?"P0 紧急":"P1 高优先级",safetyRequirement:"复核前保持限载策略；登塔作业执行双人确认和风速许可。",steps:[{action:"调度低风速停机窗口并锁定远程运行策略",owner:"集控值班长",output:"停机/限载许可记录"},{action:"执行齿轮箱油液取样与内窥复核",owner:"传动链检修工程师",output:"油液报告、内窥照片"},{action:"完成 CMS 振动复测并与告警前窗口对比",owner:"诊断工程师",output:"复测频谱和结论"},{action:"关闭告警并回写诊断样本",owner:"运维主管",output:"闭环记录和样本标签"}],writebackItems:[{label:"油液铁谱/颗粒度",value:"待现场上传"},{label:"内窥照片",value:"待覆盖高速轴轴承与齿面"},{label:"CMS 复测频谱",value:"待与告警窗口对比"},{label:"AI 样本标签",value:"待写入复盘样本"}]},title:"运维工单"}},partNamePattern:/齿轮|gearbox|gear/i,statuses:{componentEntry:"齿轮箱预警闭环：从部件风险进入证据研判",locked:`齿轮箱预警闭环：已锁定 ${i.turbineId} 高速轴轴承风险`,ticketClosed:"工单回写完成：齿轮箱油液与内窥结果已进入复盘样本",ticketCreated:"已生成齿轮箱预测维护工单：等待现场复核"},turbineId:i.turbineId}}const Py=Ah();function qt(i){return Math.max(0,Math.min(100,Math.round(i)))}function rr(i){return i<70?"alarm":i<85?"watch":"normal"}function Iy(i){return i.turbineId.endsWith("03")?8:0}function Ly(i){const e=i.filter(n=>n.level===1),t=e.reduce((n,s)=>n+s.weightPct,0);return t===0?0:qt(e.reduce((n,s)=>n+s.score*s.weightPct,0)/t)}function wh(i){var h;const e=((h=Us.find(f=>f.input.turbineId===i.turbineId))==null?void 0:h.input)??Us[0].input,t=Th(e),n=Iy(i),s=qt(t.healthScore-6-n),r=qt(s+5),a=qt(83-t.boltWarningChannels*5-n/2),o=qt(82-Math.max(0,t.oilTempDeltaC-5)*1.5-n/2),l=[{dataSources:["uav","ai-video","weather"],key:"foundation",label:"基础",level:1,nextAction:"结合无人机巡检影像复核基础沉降、冲刷和道路边坡风险。",reason:"当前无基础沉降越限证据，山地降雨与边坡风险保持例行跟踪。",score:qt(92-n/3),screening:"广谱筛查通过",specialMonitoring:"雨后边坡与基础外观专项巡检",status:"normal",weightPct:8},{dataSources:["scada","bolt","flange-gap","weather"],key:"tower",label:"塔筒",level:1,nextAction:"维持塔筒一阶频率和法兰间隙趋势跟踪，异常扩大时进入结构专项。",reason:"塔筒结构侧未形成主故障证据，但山地阵风会放大结构载荷。",score:qt(88-t.boltWarningChannels*2-n/2),screening:"结构侧作为反证项",specialMonitoring:"塔筒频率、法兰间隙、振动响应联动监测",status:"normal",weightPct:10},{dataSources:["uav","ai-video","scada","weather"],key:"blade",label:"叶片",level:1,nextAction:"保留无人机叶片巡检入口；若视频识别裂纹或覆冰，转为叶片专项。",reason:"当前功率残差不能单独解释为叶片气动退化，需与影像证据联合判断。",score:qt(86-t.scadaAbnormalSamples-n/3),screening:"未升级为主疑似",specialMonitoring:"叶片裂纹、覆冰、雷击点 AI 视频/无人机复核",status:"normal",weightPct:14},{dataSources:["scada","cms"],key:"drivetrain",label:"传动链",level:1,nextAction:"进入齿轮箱与高速轴专项监测，复核 CMS 包络谱和油液铁谱。",reason:"SCADA 功率残差、CMS 侧频和油温残差同向，传动链为当前主风险系统。",score:r,screening:"广谱筛查异常",specialMonitoring:"主轴、齿轮箱、发电机专项重点监测",status:rr(r),weightPct:32},{dataSources:["scada","cms"],key:"pitch",label:"变桨系统",level:1,nextAction:"对比桨距角偏差与变桨电机电流，确认是否存在跟随误差。",reason:"当前无桨距跟随异常主证据，保留为运行侧解释项。",score:qt(89-n/3),screening:"广谱筛查通过",specialMonitoring:"桨距角偏差和变桨电流专项",status:"normal",weightPct:8},{dataSources:["scada","weather"],key:"yaw",label:"偏航系统",level:1,nextAction:"结合山地风向切变查看偏航误差，避免把偏航损失误判为传动链故障。",reason:"偏航误差未解释当前 CMS 侧频，作为反证项持续监控。",score:qt(87-n/3),screening:"反证项通过",specialMonitoring:"偏航误差与风向切变监测",status:"normal",weightPct:7},{dataSources:["scada","ai-video"],key:"converter",label:"变流器",level:1,nextAction:"复核柜内温度与故障码，确认功率缺口不是电气限载导致。",reason:"当前功率残差需排除电气侧限载，但没有变流器主告警。",score:qt(88-n/4),screening:"未发现主故障",specialMonitoring:"变流器温度、故障码、谐波异常监测",status:"normal",weightPct:8},{dataSources:["ai-video","scada"],key:"electrical-joint",label:"电气接头过热",level:1,nextAction:"接入红外/AI 视频后复核柜内接头温升，当前不作为主故障。",reason:"无电气接头过热证据；该项保留为安全边界监测。",score:qt(85-n/3),screening:"安全项跟踪",specialMonitoring:"红外热像与柜内视频识别",status:"normal",weightPct:6},{dataSources:["bolt","flange-gap","weather"],key:"structural-fastener",label:"螺栓/法兰",level:1,nextAction:"对松弛通道和法兰间隙进行趋势复核，确认是否需要登塔复检。",reason:`${t.boltWarningChannels} 路螺栓关注项存在，但当前更多支持结构侧跟踪和反证。`,score:qt(a*.55+o*.45),screening:"结构紧固件关注",specialMonitoring:"螺栓预紧力与法兰间隙专项",status:rr(qt(a*.55+o*.45)),weightPct:7},{dataSources:["cms"],key:"main-shaft",label:"主轴",level:2,nextAction:"用阶次谱排除主轴不平衡或对中异常。",parentKey:"drivetrain",reason:"CMS 未显示主轴转频为最高风险峰。",score:qt(82-n/2),screening:"传动链子项关注",specialMonitoring:"1P/2P 阶次复核",status:"watch",weightPct:25},{dataSources:["scada","cms"],key:"gearbox",label:"齿轮箱",level:2,nextAction:"安排油液取样、内窥复核和 CMS 复测，确认高速轴轴承早期磨损。",parentKey:"drivetrain",reason:`GMF 侧频 ${t.cmsSidebandRatio.toFixed(1)}x 基线，油温偏高 ${t.oilTempDeltaC.toFixed(1)} ℃。`,score:s,screening:"主疑似部件",specialMonitoring:"高速轴轴承、油液铁谱、内窥专项",status:rr(s),weightPct:45},{dataSources:["scada","cms"],key:"generator",label:"发电机",level:2,nextAction:"核对发电机轴承与温升，作为传动链相邻部件排查。",parentKey:"drivetrain",reason:"发电机侧没有成为当前主峰，但需防止相邻部件误归因。",score:qt(86-n/3),screening:"相邻部件排查",specialMonitoring:"发电机轴承温升和振动复核",status:"normal",weightPct:30},{dataSources:["bolt"],key:"bolt",label:"螺栓监测",level:2,nextAction:"复核最低预紧力通道和温漂补偿参数。",parentKey:"structural-fastener",reason:`最低通道 ${t.boltLowestChannel.id}，预紧力 ${t.boltLowestChannel.preloadKn.toFixed(1)} kN。`,score:a,screening:"紧固件关注",specialMonitoring:"叶根/塔筒螺栓预紧力趋势",status:rr(a),weightPct:55},{dataSources:["flange-gap"],key:"flange-gap",label:"法兰间隙监测",level:2,nextAction:"接入真实法兰间隙系统后，与螺栓松弛和塔筒频率做联合判据。",parentKey:"structural-fastener",reason:"当前为演示接入位，用于体现赛题要求的数据融合边界。",score:o,screening:"待真实系统校准",specialMonitoring:"法兰间隙趋势与螺栓松弛联动",status:rr(o),weightPct:45}],c=Ly(l),d=l.filter(f=>f.level===1&&f.status==="alarm"),u=l.filter(f=>f.level===1&&f.status==="watch");return{broadScreeningSummary:`广谱健康筛查覆盖 ${l.filter(f=>f.level===1).length} 个系统层级；当前主异常集中在传动链，结构紧固件作为关注与反证项。`,componentScores:l,coverageGap:"无人机、AI视频和法兰间隙当前为演示接入位；真实参赛交付需接入场站边缘视频流、无人机巡检结果和法兰间隙监测系统，不能把模拟数据说成现场实测。",dataSources:[{boundary:"样例数据来自当前诊断包，可替换为场站实时 SCADA。",key:"scada",label:"SCADA",latest:`${e.scadaSamples.length} 个 10 min 窗口`,role:"运行残差、功率曲线、偏航/变桨/变流器排查",status:"connected"},{boundary:"样例频谱用于演示 CMS 机理判据。",key:"cms",label:"CMS",latest:"20 kHz / 60 s 包络谱",role:"传动链部件定位与振动特征提取",status:"connected"},{boundary:"样例通道用于演示螺栓预紧力趋势。",key:"bolt",label:"螺栓监测",latest:`${t.boltWarningChannels} 路关注`,role:"结构紧固件健康与反证",status:"connected"},{boundary:"当前无真实法兰间隙设备接入，先保留标准接口与判据位。",key:"flange-gap",label:"法兰间隙",latest:"接口待接入",role:"塔筒/法兰结构专项监测",status:"demo"},{boundary:"当前为巡检结果入口，后续接无人机缺陷识别输出。",key:"uav",label:"无人机巡检",latest:"示例缺陷清单",role:"叶片、基础、道路边坡外观证据",status:"demo"},{boundary:"当前为边缘视频识别入口，后续接红外和可见光算法。",key:"ai-video",label:"AI视频",latest:"边缘识别接口位",role:"覆冰、烟雾、过热、人员安全监控",status:"demo"},{boundary:"山地气象为场景和风险修正项，当前使用演示气象。",key:"weather",label:"山地气象",latest:"阵风/降雨风险",role:"复杂地形载荷修正和作业窗口判断",status:"demo"}],overallScore:c,specialMonitoringSummary:"专项重点监测建议聚焦齿轮箱高速轴轴承、螺栓预紧力和法兰间隙；停机、登塔、检修仍需人工确认。",status:d.length>0?"alarm":u.length>0?"watch":"normal",systemWeights:l.filter(f=>f.level===1).map(f=>({component:f.key,label:f.label,score:f.score,weightPct:f.weightPct})),turbineId:i.turbineId}}function Ch(i){var d,u;const e=i.modules.brief.aiBrief,t=i.modules.scada.decision,n=i.modules.cms.decision,s=i.modules.bolts.decision,r=i.modules.fusion.decision,a=i.modules.maintenance.decision,o=i.modules.workorder.ticket,l=[{id:"turbine",label:i.turbineId,position:{x:12,y:18},status:"watch",summary:"当前事件对象，连接 GIS 场景、BIM 部件、监测证据、工单和复盘样本。",type:"机组"},{id:"ai-brief",label:"智能值班研判",module:"brief",position:{x:36,y:14},status:"review",summary:(e==null?void 0:e.conclusion)??"当前事件尚未形成智能值班结论。",type:"AI研判"},{evidence:t==null?void 0:t.evidence,id:"scada-power",label:"功率残差",module:"scada",position:{x:17,y:48},status:"alarm",summary:(t==null?void 0:t.result)??"SCADA 运行侧证据未就绪。",type:"SCADA证据"},{evidence:(u=(d=i.modules.scada.metrics)==null?void 0:d.find(h=>h.label.includes("油温")))==null?void 0:u.value,id:"oil-temp",label:"油温偏高",module:"scada",position:{x:38,y:54},status:"watch",summary:"油温对标用于增强润滑/摩擦异常判断，不能单独确认齿轮箱故障。",type:"SCADA证据"},{evidence:n==null?void 0:n.evidence,id:"cms-gmf",label:"GMF侧频",module:"cms",position:{x:28,y:78},status:"alarm",summary:(n==null?void 0:n.result)??"CMS 部件侧证据未就绪。",type:"CMS证据"},{evidence:s==null?void 0:s.evidence,id:"bolt-counter",label:"叶根螺栓/塔筒结构",module:"bolts",position:{x:66,y:78},status:"watch",summary:(s==null?void 0:s.result)??"结构侧反证未就绪。",type:"结构反证"},{id:"gearbox-bearing",label:"齿轮箱高速轴轴承",module:"alerts",position:{x:66,y:47},status:"alarm",summary:"当前主疑似部件；由 SCADA 功率残差、CMS 侧频、油温增强和结构反证共同指向。",type:"部件"},{id:"fault-mode",label:"早期磨损",module:"alerts",position:{x:85,y:50},status:"alarm",summary:"当前故障模式假设，需要多源证据同向和人工复核，不能由单一阈值直接确认。",type:"故障模式"},{id:"fusion-rule",label:"多源融合门控",module:"fusion",position:{x:51,y:32},status:"review",summary:(r==null?void 0:r.result)??"融合判据未运行。",type:"融合判据"},{id:"bim-location",label:"BIM部件定位",module:"alerts",position:{x:78,y:24},status:"review",summary:"把故障假设落到齿轮箱高速轴轴承，并保留叶根/塔筒反证入口。",type:"BIM定位"},{id:"maintenance",label:"预测维护策略",module:"maintenance",position:{x:63,y:16},status:"review",summary:(a==null?void 0:a.result)??"维护策略待确认。",type:"处置动作"},{id:"workorder",label:"现场复核工单",module:"workorder",position:{x:88,y:18},status:"review",summary:`工单对象：${(o==null?void 0:o.asset)??i.turbineId}；状态为草案，派发前必须过人工确认门。`,type:"处置动作"},{id:"human-boundary",label:"人工确认门",module:"workorder",position:{x:88,y:78},status:"review",summary:"AI 只辅助研判和生成草案；停机、登塔、检修、派工和关闭必须人工确认。",type:"知识边界"},{id:"review-writeback",label:"复盘回写样本",module:"workorder",position:{x:51,y:90},status:"normal",summary:"油液、内窥、CMS 复测和 AI 标签回写后，才进入相似案例库和模型校准样本。",type:"复盘样本"}],c=[{explanation:"当前告警绑定同一台机组，避免跨机组拼接证据。",from:"turbine",label:"触发",role:"support",to:"ai-brief"},{explanation:(t==null?void 0:t.evidence)??"SCADA 功率曲线用于判断运行异常是否成立。",from:"scada-power",label:"支持",module:"scada",role:"support",to:"fault-mode"},{explanation:(n==null?void 0:n.evidence)??"CMS 侧频用于把异常定位到传动链/齿轮箱。",from:"cms-gmf",label:"定位",module:"cms",role:"localize",to:"gearbox-bearing"},{explanation:"油温偏高增强润滑/摩擦异常判断，但不能单独作为主故障。",from:"oil-temp",label:"增强",module:"scada",role:"amplify",to:"fault-mode"},{explanation:(s==null?void 0:s.evidence)??"结构监测用于排除叶根结构主故障。",from:"bolt-counter",label:"反证",module:"bolts",role:"counter",to:"fault-mode"},{explanation:(r==null?void 0:r.evidence)??"融合门控把支持项和反证项放入同一事件窗口。",from:"fusion-rule",label:"融合判据",module:"fusion",role:"support",to:"fault-mode"},{explanation:"故障模式需要落到可检查的 BIM 部件，才进入隐患排查和工单。",from:"fault-mode",label:"映射",module:"alerts",role:"localize",to:"bim-location"},{explanation:"BIM 定位把当前主疑似锁定到齿轮箱高速轴轴承。",from:"bim-location",label:"锁定部件",module:"alerts",role:"localize",to:"gearbox-bearing"},{explanation:(a==null?void 0:a.evidence)??"预测维护策略承接隐患排查结论。",from:"fault-mode",label:"生成策略",module:"maintenance",role:"action",to:"maintenance"},{explanation:"策略只生成现场复核工单草案，不能自动派发。",from:"maintenance",label:"生成草案",module:"workorder",role:"action",to:"workorder"},{explanation:"工单派发、停机、登塔、检修和关闭都必须过人工确认门。",from:"workorder",label:"必须确认",module:"workorder",role:"boundary",to:"human-boundary"},{explanation:"现场结果回写后才进入复盘样本和模型校准。",from:"human-boundary",label:"回写",module:"workorder",role:"writeback",to:"review-writeback"}];return{decisionPaths:Dy(i),edges:c,nodes:l,summary:`${i.turbineId} 图谱把机组、部件、SCADA/CMS/结构证据、融合判据、BIM 定位、工单和人工边界串成同一条可追溯链。`}}function Dy(i){const e=i.modules.scada.decision,t=i.modules.cms.decision,n=i.modules.bolts.decision,s=i.modules.fusion.decision,r=i.modules.maintenance.decision,a=i.modules.workorder.decision;return[{answer:"主疑似为齿轮箱高速轴轴承，因为运行异常、部件振动定位和融合门控同向支持齿轮箱早期磨损。",id:"why-gearbox",question:"为什么判定为齿轮箱风险？",recommendedModule:"fusion",steps:[{conclusion:(e==null?void 0:e.result)??"运行侧异常成立",humanBoundary:Ni((e==null?void 0:e.confirm)??"值班员确认数据质量后才采纳 SCADA 证据。"),module:"scada",nodeIds:["scada-power","oil-temp"],title:"运行异常成立"},{conclusion:(t==null?void 0:t.result)??"CMS 定位到传动链",humanBoundary:Ni((t==null?void 0:t.confirm)??"诊断工程师确认采样质量后才用于部件定位。"),module:"cms",nodeIds:["cms-gmf","gearbox-bearing"],title:"部件侧定位"},{conclusion:(s==null?void 0:s.result)??"融合判据支持齿轮箱风险",humanBoundary:Ni((s==null?void 0:s.confirm)??"融合结论需人工确认后才升级告警。"),module:"fusion",nodeIds:["fusion-rule","fault-mode"],title:"融合门控升级"}],title:"齿轮箱风险解释链"},{answer:"螺栓/塔筒当前是反证项和载荷放大因素，不足以改写齿轮箱主疑似。",id:"why-not-bolt",question:"为什么不是螺栓或塔筒结构主故障？",recommendedModule:"bolts",steps:[{conclusion:(n==null?void 0:n.result)??"结构侧作为反证项",humanBoundary:Ni((n==null?void 0:n.confirm)??"结构工程师确认后才排除结构主故障。"),module:"bolts",nodeIds:["bolt-counter","fault-mode"],title:"结构侧反证"},{conclusion:(s==null?void 0:s.result)??"融合判据未改写主故障",humanBoundary:Ni((s==null?void 0:s.confirm)??"诊断工程师确认反证后才进入告警研判。"),module:"fusion",nodeIds:["fusion-rule","gearbox-bearing"],title:"主疑似未改写"}],title:"结构反证解释链"},{answer:"下一步不是直接检修，而是进入预测维护策略、生成工单草案并等待人工确认门。",id:"what-next",question:"下一步怎么处理？",recommendedModule:"workorder",steps:[{conclusion:(r==null?void 0:r.result)??"形成预测维护策略",humanBoundary:Ni((r==null?void 0:r.confirm)??"值长确认后才生成可执行工单。"),module:"maintenance",nodeIds:["maintenance","fault-mode"],title:"形成处置策略"},{conclusion:(a==null?void 0:a.result)??"生成现场复核工单草案",humanBoundary:Ni((a==null?void 0:a.confirm)??"派发、停机、登塔和关闭必须人工确认。"),module:"workorder",nodeIds:["workorder","human-boundary","review-writeback"],title:"工单草案与回写"}],title:"处置闭环解释链"}]}function Ni(i){return i.includes("人工确认")?i:`人工确认：${i}`}const Rh=document.querySelector("#app");if(!Rh)throw new Error("Missing app root");var vu;let Fn=((vu=Us[0])==null?void 0:vu.id)??"",q=Py,gs,ia=0;const Fl=[{description:"确认当前预警是否成立，明确等级、疑似部件和复核边界。",focusLabel:"当前预警",key:"ai",modules:["brief","health"],nextAction:"复核多源证据",primaryModule:"brief",title:"告警研判"},{description:"核对 SCADA、CMS、油温和结构监测是否在同一事件窗口内同向。",focusLabel:"数据一致性",key:"evidence",modules:["scada","cms","bolts","fusion"],nextAction:"查看关键证据",primaryModule:"fusion",title:"证据复核"},{description:"把风险落到 BIM 部件，记录主疑似对象和排除项。",focusLabel:"疑似部件",key:"locate",modules:["alerts","inspection"],nextAction:"定位齿轮箱",primaryModule:"alerts",title:"BIM定位"},{description:"形成处置策略、工单草案、人工签核和现场回写要求。",focusLabel:"人工闭环",key:"close",modules:["maintenance","workorder"],nextAction:"打开处置闭环",primaryModule:"maintenance",title:"处置闭环"}],Mr=[{key:"event",label:"事件工作台",module:"brief",subtitle:"围绕当前告警组织证据、定位、工单和复盘状态。",title:"当前事件处置"},{key:"health",label:"健康管理",module:"health",subtitle:"健康评分是分层权重与专项筛查，不是单一机理模型。",title:"风机健康管理"},{key:"scada",label:"SCADA",module:"scada",subtitle:"用风速-功率基线残差判断运行异常是否成立。",title:"SCADA 运行分析"},{key:"cms",label:"CMS",module:"cms",subtitle:"复核频谱、包络谱峰值和转速工况，输出部件侧证据。",title:"CMS 振动分析"},{key:"structure",label:"结构监测",module:"bolts",subtitle:"查看叶根螺栓、塔筒频率和结构侧反证。",title:"螺栓与结构监测"},{key:"fusion",label:"融合诊断",module:"fusion",subtitle:"把多源证据输入融合判据，明确支持项和反证项。",title:"多源融合诊断"},{key:"workorders",label:"工单中心",module:"workorder",subtitle:"管理待签核、已派发、执行中、验收和复盘回写记录。",title:"运维工单记录"},{key:"maintenance",label:"维护计划",module:"maintenance",subtitle:"根据诊断结果、低风速窗口、备件和班组资源形成处置策略。",title:"预测维护计划"},{key:"knowledge",label:"知识图谱",module:"alerts",subtitle:"查看机组、部件、故障模式、证据和处置规则的关系。",title:"风机故障知识图谱"}],wi=new Map(Mr.map(i=>[i.key,i]));function gc(i){return Fl.find(e=>e.modules.includes(i))??Fl[0]}function Ba(i){return{alerts:"event",bolts:"structure",brief:"event",cms:"cms",fusion:"fusion",health:"health",inspection:"event",maintenance:"maintenance",scada:"scada",workorder:"workorders"}[i]??"event"}function Ph(){const i=q.modules.brief.aiBrief,e=gc("brief");return`
    <section class="workflow-command-card" aria-label="当前值班任务" data-workflow-command-card>
      <header>
        <span>当前事件</span>
        <strong data-command-title>${b(q.turbineId)} · ${b((i==null?void 0:i.primaryFinding)??q.component)}</strong>
      </header>
      <div>
        <article>
          <span>值班步骤</span>
          <strong data-command-stage>${b(`${e.title} / ${e.focusLabel}`)}</strong>
        </article>
        <article>
          <span>本步目标</span>
          <p data-command-description>${b(e.description)}</p>
        </article>
        <article>
          <span>下一步</span>
          <p data-command-next>${b(e.nextAction)}</p>
        </article>
      </div>
    </section>
  `}function Ny(){return Fl.map((i,e)=>`
    <button class="workflow-stage-tab module-tab" type="button" data-stage="${b(i.key)}" data-module="${b(i.primaryModule)}">
      <span>${String(e+1).padStart(2,"0")} ${b(i.title)}</span>
      <strong>${b(i.nextAction)}</strong>
      <small>${b(i.description)}</small>
    </button>
  `).join("")}function Uy(){return`
    <nav class="management-nav" aria-label="管理端功能模块">
      ${Mr.map(i=>`
        <button type="button" data-manager-page-button="${b(i.key)}">
          <span>${b(i.label)}</span>
        </button>
      `).join("")}
    </nav>
  `}function Fy(){return`
    <section class="management-console" aria-label="管理端页面">
      <header class="management-workbench-header">
        <div>
          <span>管理工作台</span>
          <strong>数据分析、证据复核、人工签核、复盘回写</strong>
        </div>
        <button type="button" data-close-manager-workspace>返回BIM视图</button>
      </header>
      ${Uy()}
      <section class="management-pages">
        ${Oy()}
        ${Gy()}
        ${Hy()}
        ${Vy()}
        ${$y()}
        ${Wy()}
        ${Xy()}
        ${qy()}
        ${jy()}
      </section>
    </section>
  `}function ci(i,e){const t=wi.get(i)??Mr[0];return`
    <article class="management-page" data-management-page="${b(t.key)}">
      <header class="management-page-header">
        <div>
          <span>${b(t.label)}</span>
          <h3>${b(t.title)}</h3>
          <p>${b(t.subtitle)}</p>
        </div>
        <button type="button" data-open-module="${b(t.module)}">打开关联证据</button>
      </header>
      ${e}
    </article>
  `}function Yi(i){return`
    <section class="record-list" aria-label="业务记录">
      ${i.map(e=>`
        <article>
          <span>${b(e.status)}</span>
          <strong>${b(e.code)}</strong>
          <p>${b(e.result)}</p>
          <small>${b(e.meta)}</small>
        </article>
      `).join("")}
    </section>
  `}function $s(i,e){const t=_c(i);return`
    <section class="parameter-panel" aria-label="${b(t.ariaLabel)}">
      <header>
        <span>${b(t.eyebrow)}</span>
        <strong>${b(t.title)}</strong>
      </header>
      <div>
        ${e.map((n,s)=>n.type==="select"?`
              <label>
                <span>${b(n.label)}</span>
                <select data-analysis-param="${b(i)}-${s}">
                  ${(n.options??[n.value]).map(r=>`<option${r===n.value?" selected":""}>${b(r)}</option>`).join("")}
                </select>
              </label>
            `:`
            <label>
              <span>${b(n.label)}</span>
              <input type="${n.type??"text"}" value="${b(n.value)}" data-analysis-param="${b(i)}-${s}" />
            </label>
          `).join("")}
      </div>
      <footer>
        <button type="button" data-run-analysis="${b(i)}">${b(t.runLabel)}</button>
        <button type="button" data-adopt-evidence="${b(i)}">${b(t.adoptLabel)}</button>
      </footer>
      <section class="analysis-result" data-analysis-result="${b(i)}">${b(t.pendingText)}</section>
    </section>
  `}function _c(i){const e="采纳为当前事件证据";return{cms:{adoptLabel:e,ariaLabel:"CMS 诊断参数",completeLabel:"CMS 诊断完成",eyebrow:"信号诊断参数",loadingText:"正在请求后端 CMS 频谱诊断...",pendingText:"等待频谱参数确认，尚未形成新的 CMS 诊断记录。",runLabel:"运行 CMS 频谱诊断",statusText:"CMS 振动页已完成频谱诊断",title:"频谱/侧频诊断，不是工单模型"},fusion:{adoptLabel:e,ariaLabel:"融合判据参数",completeLabel:"融合判据完成",eyebrow:"融合判据参数",loadingText:"正在运行多源证据门控规则...",pendingText:"等待融合策略确认，尚未形成新的证据门控记录。",runLabel:"运行融合判据",statusText:"融合诊断页已完成证据门控",title:"多源证据门控规则，输出支持项和反证项"},health:{adoptLabel:"纳入当前事件摘要",ariaLabel:"健康评分口径",completeLabel:"健康评分完成",eyebrow:"健康评分口径",loadingText:"正在重算分层健康评分...",pendingText:"等待评分口径确认，尚未形成新的健康评估记录。",runLabel:"重算健康评分",statusText:"健康管理页已完成分层评分",title:"部件权重评分 + 广谱筛查，不是单一机理仿真"},maintenance:{adoptLabel:"提交值长确认",ariaLabel:"维护策略约束",completeLabel:"维护策略生成完成",eyebrow:"策略约束",loadingText:"正在生成维护策略建议...",pendingText:"等待策略约束确认，尚未形成新的维护计划建议。",runLabel:"生成维护策略",statusText:"维护计划页已生成策略建议",title:"排程与资源规则，停机和派工必须人工确认"},scada:{adoptLabel:e,ariaLabel:"SCADA 运行分析参数",completeLabel:"SCADA 分析完成",eyebrow:"运行分析参数",loadingText:"正在请求后端 SCADA 残差分析...",pendingText:"等待时间窗和阈值确认，尚未形成新的运行分析记录。",runLabel:"运行 SCADA 残差分析",statusText:"SCADA 页已完成运行侧分析",title:"风速-功率基线残差，用于判断运行异常是否成立"},structure:{adoptLabel:e,ariaLabel:"结构判据参数",completeLabel:"结构判据完成",eyebrow:"结构判据参数",loadingText:"正在运行螺栓与结构反证判据...",pendingText:"等待结构阈值确认，尚未形成新的结构监测记录。",runLabel:"运行结构判据",statusText:"结构监测页已完成反证判据",title:"螺栓预紧力/塔筒频率判据，用于结构侧复核"},workorders:{adoptLabel:"人工签核",ariaLabel:"工单签核门控",completeLabel:"工单门控已刷新",eyebrow:"流程门控",loadingText:"正在刷新工单签核状态...",pendingText:"当前工单尚未派发；需完成作业窗口、安全许可、备件和复盘责任签核。",runLabel:"刷新签核状态",statusText:"工单中心已刷新签核门控",title:"工单是流程状态机，不是预测模型"}}[i]??{adoptLabel:e,ariaLabel:"工作台操作",completeLabel:"操作完成",eyebrow:"工作台操作",loadingText:"正在处理当前操作...",pendingText:"等待操作确认。",runLabel:"执行操作",statusText:"工作台操作已完成",title:"本页为业务操作，不默认代表机理模型"}}function Oy(){const i=q.modules.brief.aiBrief,e=q.modules.workorder.ticket,t=[{code:q.eventCode,meta:`${q.turbineId} / ${q.component}`,result:(i==null?void 0:i.primaryFinding)??"等待告警研判",status:"处置中"},{code:(e==null?void 0:e.draftCode)??"WO-待创建",meta:(e==null?void 0:e.assignee)??"传动链专业班组",result:(e==null?void 0:e.initialState)??"等待生成工单草案",status:"工单"}];return ci("event",`
    <section class="event-workbench-grid">
      <article class="event-primary-card">
        <span>当前告警</span>
        <strong>${b(q.turbineId)} · ${b((i==null?void 0:i.primaryFinding)??q.component)}</strong>
        <p>${b((i==null?void 0:i.conclusion)??"等待当前事件研判。")}</p>
      </article>
      <article class="event-primary-card">
        <span>下一步</span>
        <strong>${b((i==null?void 0:i.primaryAction.label)??"复核证据")}</strong>
        <p>${b((i==null?void 0:i.operatorFocus.why)??"先确认多源证据是否支持同一故障假设。")}</p>
      </article>
    </section>
    ${Yi(t)}
    <section class="quick-module-grid">
      ${Mr.filter(n=>n.key!=="event").map(n=>`
        <button type="button" data-manager-page-button="${b(n.key)}">
          <span>${b(n.label)}</span>
          <strong>${b(n.title)}</strong>
          <small>${b(n.subtitle)}</small>
        </button>
      `).join("")}
    </section>
  `)}function Ih(i){return i==="alarm"?"预警":i==="watch"?"关注":"正常"}function ky(i){const e=i.status==="connected"?"已接入":i.status==="demo"?"演示接口":"待接入";return`
    <article class="health-source-card" data-source-status="${b(i.status)}">
      <header>
        <span>${b(e)}</span>
        <strong>${b(i.label)}</strong>
      </header>
      <p>${b(i.role)}</p>
      <small>${b(i.latest)} · ${b(i.boundary)}</small>
    </article>
  `}function By(i){const e=i.dataSources.map(t=>({"ai-video":"AI视频",bolt:"螺栓",cms:"CMS","flange-gap":"法兰",scada:"SCADA",uav:"无人机",weather:"气象"})[t]??t).join(" / ");return`
    <article class="health-component-row" data-health-status="${b(i.status)}" data-health-level="${i.level}">
      <div class="health-component-main">
        <span>${i.level===1?"系统层级":"子部件"} · 权重 ${i.weightPct}%</span>
        <strong>${b(i.label)}</strong>
        <p>${b(i.reason)}</p>
      </div>
      <div class="health-score-meter" aria-label="${b(i.label)}健康度">
        <strong>${i.score}</strong>
        <span>${b(Ih(i.status))}</span>
        <i style="--score: ${i.score}%;"></i>
      </div>
      <div class="health-component-evidence">
        <span>${b(e)}</span>
        <p>${b(i.screening)}</p>
        <small>${b(i.nextAction)}</small>
      </div>
    </article>
  `}function zy(i){return i.systemWeights.map(e=>`
    <article>
      <span>${b(e.label)}</span>
      <strong>${e.score}</strong>
      <i style="--score: ${e.score}%;"></i>
      <small>权重 ${e.weightPct}%</small>
    </article>
  `).join("")}function Gy(){const i=wh(q),e=i.componentScores.find(t=>t.key==="gearbox")??i.componentScores[0];return ci("health",`
    <section class="health-overview">
      <article class="health-score-card" data-health-status="${b(i.status)}">
        <span>${b(i.turbineId)} 综合健康</span>
        <strong>${i.overallScore}</strong>
        <p>${b(i.broadScreeningSummary)}</p>
      </article>
      <article class="health-focus-card">
        <span>专项重点监测</span>
        <strong>${b(e.label)} · ${b(Ih(e.status))}</strong>
        <p>${b(i.specialMonitoringSummary)}</p>
      </article>
    </section>
    ${$s("health",[{label:"权重版本",value:"赛题十三部件权重",type:"select",options:["赛题十三部件权重","传动链加权","结构安全加权"]},{label:"广谱筛查范围",value:"全部主要部件",type:"select",options:["全部主要部件","传动链专项","结构专项"]},{label:"模拟接入口径",value:"公开/模拟边界显示",type:"select",options:["公开/模拟边界显示","只看已接入样例","真实场站接入位"]}])}
    <section class="health-source-grid" aria-label="数据源覆盖">
      ${i.dataSources.map(ky).join("")}
    </section>
    <section class="health-weight-grid" aria-label="系统权重健康评分">
      ${zy(i)}
    </section>
    <section class="health-component-list" aria-label="部件层级健康评分">
      ${i.componentScores.map(By).join("")}
    </section>
    <section class="health-gap-note">
      <strong>边界说明</strong>
      <p>${b(i.coverageGap)}</p>
    </section>
  `)}function Hy(){var n;const i=q.modules.scada,e=i.scadaChart,t=(e==null?void 0:e.points.filter(s=>s.abnormal).length)??0;return ci("scada",`
    ${Yi([{code:"SCADA-RUN-240615-01",meta:(e==null?void 0:e.sampleWindow)??"10 min SCADA",result:((n=i.decision)==null?void 0:n.result)??"等待复算",status:`${t} 个异常窗`},{code:"SCADA-HIS-240612-03",meta:"同机型功率曲线对标",result:"历史复核记录，未升级为主故障证据",status:"已归档"}])}
    ${$s("scada",[{label:"时间窗",value:"最近 6 个 10 min 窗口",type:"select",options:["最近 6 个 10 min 窗口","最近 12 个 10 min 窗口","告警前后 2 h"]},{label:"功率残差阈值 %",value:"8",type:"number"},{label:"基线模型",value:"OpenOA 同场基线",type:"select",options:["OpenOA 同场基线","同机型分位数曲线","上月健康曲线"]}])}
    ${xc(e)}
  `)}function Vy(){var t,n,s;const i=q.modules.cms,e=(t=i.cmsChart)==null?void 0:t.peaks.find(r=>r.status==="warning");return ci("cms",`
    ${Yi([{code:"CMS-ENV-240615-02",meta:((n=i.cmsChart)==null?void 0:n.sampleWindow)??"CMS 高频采样",result:((s=i.decision)==null?void 0:s.result)??"等待复算",status:e?"侧频关注":"待复核"},{code:"CMS-HIS-240601-01",meta:"高速轴侧频历史对比",result:"趋势较月初抬升，需结合 SCADA 工况过滤",status:"趋势记录"}])}
    ${$s("cms",[{label:"频谱类型",value:"包络谱",type:"select",options:["包络谱","阶次谱","原始频谱"]},{label:"侧频幅值阈值 mm/s",value:"1.2",type:"number"},{label:"转速工况过滤",value:"额定转速附近",type:"select",options:["额定转速附近","全工况","剔除启停段"]}])}
    ${vc(i.cmsChart)}
  `)}function $y(){var t,n,s;const i=q.modules.bolts,e=((t=i.boltChart)==null?void 0:t.channels.filter(r=>r.status==="warning").length)??0;return ci("structure",`
    ${Yi([{code:"BOLT-RING-240615-01",meta:((n=i.boltChart)==null?void 0:n.title)??"叶根螺栓预紧力",result:((s=i.decision)==null?void 0:s.result)??"等待复核",status:`${e} 路关注`},{code:"TOWER-FREQ-240615-01",meta:"塔筒一阶频率 / 山地阵风载荷",result:"作为载荷放大因素跟踪，暂不改写主疑似部件",status:"反证项"}])}
    ${$s("structure",[{label:"温漂补偿",value:"启用",type:"select",options:["启用","关闭"]},{label:"预紧力松弛阈值 %",value:"8",type:"number"},{label:"结构侧角色",value:"反证项",type:"select",options:["反证项","主风险","持续跟踪"]}])}
    ${bc(i.boltChart)}
  `)}function Wy(){var e;const i=q.modules.fusion;return ci("fusion",`
    ${Yi([{code:"FUSION-GATE-240615-01",meta:"SCADA / CMS / 油温 / 结构反证",result:((e=i.decision)==null?void 0:e.result)??"等待融合",status:"当前版本"}])}
    ${$s("fusion",[{label:"融合策略",value:"三主证据同向",type:"select",options:["三主证据同向","二主证据 + 一反证通过","专家复核模式"]},{label:"最低置信度 %",value:"80",type:"number"},{label:"结构反证权重",value:"中",type:"select",options:["低","中","高"]}])}
    ${Nh(i.fusionSignals,i.modelGates)}
    <div class="fusion-source-grid">${Dh(i.fusionSignals)}</div>
  `)}function Xy(){const i=q.modules.workorder.ticket;return ci("workorders",`
    ${Yi([{code:(i==null?void 0:i.draftCode)??"WO-待创建",meta:`${(i==null?void 0:i.asset)??q.turbineId} / ${(i==null?void 0:i.dueWindow)??"48-72 h"}`,result:(i==null?void 0:i.initialState)??"等待生成工单草案",status:"待签核"},{code:"WO-HS-20240612-018",meta:"HS-WTG-03 / 振动复测",result:"现场复测完成，等待复盘标签确认",status:"待验收"},{code:"WO-HS-20240528-011",meta:"HS-WTG-01 / 叶根螺栓复核",result:"已关闭并进入相似案例库",status:"已关闭"}])}
    <section class="workorder-page-actions">
      <button type="button" data-open-module="workorder">进入当前工单确认门</button>
      <button type="button" data-run-analysis="workorders">刷新签核状态</button>
    </section>
    <p class="analysis-result" data-analysis-result="workorders">当前工单尚未派发；需完成作业窗口、安全许可、备件和复盘责任签核。</p>
    ${Fh(i)}
  `)}function qy(){var t;const i=q.modules.maintenance,e=q.modules.workorder.ticket;return ci("maintenance",`
    ${Yi([{code:"PM-PLAN-240615-01",meta:(e==null?void 0:e.dueWindow)??"48-72 h / 低风速窗口优先",result:((t=i.decision)==null?void 0:t.result)??"等待策略",status:"待确认"},{code:"PM-WEEK-240624",meta:"下周预测维护排程",result:"2 台传动链复测，1 台结构侧持续跟踪",status:"计划中"}])}
    ${$s("maintenance",[{label:"策略",value:"限功率 + 现场复核",type:"select",options:["限功率 + 现场复核","计划停机检修","继续跟踪观察"]},{label:"最低风速窗口 h",value:"6",type:"number"},{label:"备件状态",value:"可调拨",type:"select",options:["可调拨","待采购","需跨场借用"]}])}
    ${Uh(e,q.modules.inspection.inspectionItems)}
  `)}function jy(){const i=Ch(q),e=i.nodes.find(t=>t.id==="gearbox-bearing")??i.nodes[0];return ci("knowledge",`
    <section class="knowledge-summary-card">
      <span>图谱作用</span>
      <strong>让 AI 回答可追溯到关系链</strong>
      <p>${b(i.summary)}</p>
    </section>
    <section class="knowledge-graph">
      <div class="knowledge-node-map" aria-label="知识图谱节点">
        ${i.nodes.map(t=>`
          <button type="button" data-kg-node="${b(t.id)}" data-kg-status="${b(t.status)}" style="--x: ${t.position.x}%; --y: ${t.position.y}%;">
            <span>${b(`${t.type} · ${Lh(t.status)}`)}</span>
            <strong>${b(t.label)}</strong>
          </button>
        `).join("")}
      </div>
      <article class="knowledge-detail">
        <span>节点说明</span>
        <strong data-kg-detail-title>${b(e.label)}</strong>
        <p data-kg-detail>${b(e.summary)}</p>
        <small data-kg-detail-evidence>${b(e.evidence??"点击节点查看它在 AI 决策链中的角色。")}</small>
      </article>
    </section>
    <section class="knowledge-edge-list">
      <span>关键关系</span>
      <ul>${i.edges.map(Ky).join("")}</ul>
    </section>
    <section class="knowledge-decision-paths">
      <span>AI 决策路径</span>
      <div class="knowledge-path-action-strip" aria-label="决策路径快捷操作">
        ${i.decisionPaths.map(t=>`
          <button type="button" data-manager-page-button="${b(Ba(t.recommendedModule))}">
            ${b(`打开${Ki(t.recommendedModule)}`)}
          </button>
        `).join("")}
      </div>
      ${i.decisionPaths.map(Zy).join("")}
    </section>
  `)}function Lh(i){return i==="alarm"?"告警":i==="watch"?"关注":i==="review"?"需确认":"正常"}function Yy(i){return{action:"处置",amplify:"增强",boundary:"边界",counter:"反证",localize:"定位",support:"支持",writeback:"回写"}[i]}function Ky(i){return`
    <li data-kg-edge-role="${b(i.role)}">
      <strong>${b(`${i.label} / ${Yy(i.role)}`)}</strong>
      <span>${b(i.explanation)}</span>
    </li>
  `}function Zy(i){return`
    <article>
      <header>
        <span>${b(i.question)}</span>
        <strong>${b(i.title)}</strong>
      </header>
      <p>${b(i.answer)}</p>
      <ol>
        ${i.steps.map((e,t)=>`
          <li>
            <span>${String(t+1).padStart(2,"0")}</span>
            <div>
              <strong>${b(e.title)}</strong>
              <p>${b(e.conclusion)}</p>
              <small>${b(e.humanBoundary)}</small>
            </div>
          </li>
        `).join("")}
      </ol>
    </article>
  `}function b(i){return String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function yi(i=[]){return i.map(e=>`<div><dt>${b(e.label)}</dt><dd>${b(e.value)}</dd></div>`).join("")}function Hi(i,e,t,n,s){return t===e?n:n+(i-e)/(t-e)*(s-n)}function Ca(i,e,t){return i.ticks.map(n=>{if(e==="x"){const r=Hi(n,i.min,i.max,t.left,t.right);return`
          <line class="grid-line vertical" x1="${r}" y1="${t.top}" x2="${r}" y2="${t.bottom}"></line>
          <text class="tick-label" x="${r}" y="${t.bottom+22}" text-anchor="middle">${b(n)}</text>
        `}const s=Hi(n,i.min,i.max,t.bottom,t.top);return`
        <line class="grid-line" x1="${t.left}" y1="${s}" x2="${t.right}" y2="${s}"></line>
        <text class="tick-label" x="${t.left-10}" y="${s+4}" text-anchor="end">${b(n)}</text>
      `}).join("")}function xc(i){if(!i)return"";const e={left:78,right:610,top:28,bottom:202},t={height:260,width:640},n=(o,l)=>`${Hi(o,i.xAxis.min,i.xAxis.max,e.left,e.right)},${Hi(l,i.yAxis.min,i.yAxis.max,e.bottom,e.top)}`,s=i.points.map(o=>n(o.windSpeed,o.expectedKw)).join(" "),r=i.points.map(o=>n(o.windSpeed,o.powerKw)).join(" "),a=i.points.map(o=>{const[l,c]=n(o.windSpeed,o.powerKw).split(",");return`<circle class="chart-point${o.abnormal?" abnormal":""}" cx="${l}" cy="${c}" r="${o.abnormal?4.6:3.2}"><title>${b(o.timestamp)} 残差 ${b(o.residualPct)}%</title></circle>`}).join("");return`
    <figure class="engineering-chart scada-diagnostic">
      <figcaption>
        <strong>${b(i.title)}</strong>
        <span>${b(i.sampleWindow)} · 当前模型运行结果</span>
      </figcaption>
      <svg viewBox="0 0 ${t.width} ${t.height}" role="img" aria-label="${b(i.title)}">
        ${Ca(i.yAxis,"y",e)}
        ${Ca(i.xAxis,"x",e)}
        <line class="axis-line" x1="${e.left}" y1="${e.bottom}" x2="${e.right}" y2="${e.bottom}"></line>
        <line class="axis-line" x1="${e.left}" y1="${e.top}" x2="${e.left}" y2="${e.bottom}"></line>
        <polyline class="chart-line baseline" points="${s}"></polyline>
        <polyline class="chart-line measured" points="${r}"></polyline>
        ${a}
        <text class="axis-title x-title" x="${(e.left+e.right)/2}" y="${t.height-8}" text-anchor="middle">${b(i.xAxis.label)}</text>
        <text class="axis-title y-title" x="${-(e.top+e.bottom)/2}" y="20" text-anchor="middle" transform="rotate(-90)">${b(i.yAxis.label)}</text>
      </svg>
      <div class="chart-legend">
        <span><i class="legend-line baseline"></i>${b(i.baselineLabel)}</span>
        <span><i class="legend-line measured"></i>实测功率</span>
        <span><i class="legend-dot abnormal"></i>异常采样</span>
      </div>
    </figure>
  `}function vc(i){if(!i)return"";const e={left:78,right:610,top:28,bottom:202},t={height:260,width:640},n=Hi(i.threshold.value,i.yAxis.min,i.yAxis.max,e.bottom,e.top),s=i.peaks.map(r=>{const a=Hi(r.frequencyHz,i.xAxis.min,i.xAxis.max,e.left,e.right),o=Hi(r.amplitude,i.yAxis.min,i.yAxis.max,e.bottom,e.top),l=e.bottom-o;return`
        <g class="spectrum-peak ${r.status}">
          <rect x="${a-7}" y="${o}" width="14" height="${l}"></rect>
          <text x="${a}" y="${Math.max(12,o-5)}" text-anchor="middle">${b(r.label)}</text>
        </g>
      `}).join("");return`
    <figure class="engineering-chart cms-spectrum">
      <figcaption>
        <strong>${b(i.title)}</strong>
        <span>${b(i.sampleWindow)} · 当前阈值结果</span>
      </figcaption>
      <svg viewBox="0 0 ${t.width} ${t.height}" role="img" aria-label="${b(i.title)}">
        ${Ca(i.yAxis,"y",e)}
        ${Ca(i.xAxis,"x",e)}
        <line class="axis-line" x1="${e.left}" y1="${e.bottom}" x2="${e.right}" y2="${e.bottom}"></line>
        <line class="axis-line" x1="${e.left}" y1="${e.top}" x2="${e.left}" y2="${e.bottom}"></line>
        <line class="threshold-line" x1="${e.left}" y1="${n}" x2="${e.right}" y2="${n}"></line>
        <text class="threshold-label" x="${e.right-2}" y="${n-4}" text-anchor="end">${b(i.threshold.label)} ${b(i.threshold.value)}</text>
        ${s}
        <text class="axis-title x-title" x="${(e.left+e.right)/2}" y="${t.height-8}" text-anchor="middle">${b(i.xAxis.label)}</text>
        <text class="axis-title y-title" x="${-(e.top+e.bottom)/2}" y="20" text-anchor="middle" transform="rotate(-90)">${b(i.yAxis.label)}</text>
      </svg>
    </figure>
  `}function bc(i){if(!i)return"";const e={x:320,y:128},t=80,n=i.channels.map(s=>{const r=(s.angle-90)*(Math.PI/180),a=e.x+Math.cos(r)*t,o=e.y+Math.sin(r)*t,l=e.x+Math.cos(r)*(t+42),c=e.y+Math.sin(r)*(t+42);return`
        <g class="bolt-channel ${s.status}">
          <line x1="${e.x}" y1="${e.y}" x2="${a}" y2="${o}"></line>
          <circle cx="${a}" cy="${o}" r="9"><title>${b(s.id)} ${b(s.preloadKn)} kN / 松弛 ${b(s.relaxationPct)}%</title></circle>
          <text x="${l}" y="${c+3}" text-anchor="middle">${b(s.id)}</text>
        </g>
      `}).join("");return`
    <figure class="engineering-chart bolt-map">
      <figcaption>
        <strong>${b(i.title)}</strong>
        <span>标称预紧力 ${b(i.nominalPreloadKn)} kN / 松弛预警 ${b(i.warningRelaxationPct)}%</span>
      </figcaption>
      <svg viewBox="0 0 640 260" role="img" aria-label="${b(i.title)}">
        <circle class="bolt-ring" cx="${e.x}" cy="${e.y}" r="${t}"></circle>
        <circle class="bolt-hub" cx="${e.x}" cy="${e.y}" r="34"></circle>
        ${n}
      </svg>
      <div class="chart-legend">
        <span><i class="legend-dot normal"></i>正常</span>
        <span><i class="legend-dot watch"></i>关注</span>
        <span><i class="legend-dot warning"></i>预警</span>
      </div>
    </figure>
  `}function Jy(i=[]){return i.map(e=>`
        <li class="evidence-row">
          <div>
            <span>${b(e.label)} · ${b(e.source)}</span>
            <strong>${b(e.value)}</strong>
          </div>
          <small>窗口 ${b(e.window)} / 模型 ${b(e.model)} / 阈值 ${b(e.threshold)} / 置信度 ${b(e.confidence)}</small>
        </li>
      `).join("")}function Dh(i=[]){return i.map(e=>`
        <article class="fusion-card ${b(e.status)}">
          <div>
            <span>${b(e.source)}</span>
            <strong>${b(e.metric)}</strong>
          </div>
          <p>${b(e.contribution)}</p>
          <dl>
            <div><dt>质量</dt><dd>${b(e.quality)}</dd></div>
            <div><dt>窗口</dt><dd>${b(e.window)}</dd></div>
            <div><dt>判据</dt><dd>${b(e.rule)}</dd></div>
          </dl>
        </article>
      `).join("")}function Nh(i=[],e=[]){const t=i.slice(0,e.length);return t.length?`
    <section class="evidence-review-path" aria-label="证据复核路径">
      <header>
        <span>复核路径</span>
        <strong>输入 -> 判据 -> 结论</strong>
      </header>
      <ol>
        ${t.map((n,s)=>{const r=e[s];return`
            <li class="${b(n.status)}">
              <span>${String(s+1).padStart(2,"0")}</span>
              <div>
                <small>输入数据</small>
                <strong>${b(n.source)}</strong>
                <p>${b(n.metric)} / ${b(n.window)}</p>
              </div>
              <div>
                <small>模型判据</small>
                <strong>${b((r==null?void 0:r.method)??n.rule)}</strong>
                <p>${b((r==null?void 0:r.rule)??n.rule)}</p>
              </div>
              <div>
                <small>输出结论</small>
                <strong>${b((r==null?void 0:r.result)??n.contribution)}</strong>
                <p>${b(n.quality)}</p>
              </div>
            </li>
          `}).join("")}
      </ol>
    </section>
  `:""}function Qy(i=[]){return i.map(e=>`
        <li class="${b(e.status)}">
          <span>${b(e.layer)}</span>
          <div>
            <strong>${b(e.method)}</strong>
            <p>${b(e.rule)}</p>
          </div>
          <em>${b(e.result)}</em>
        </li>
      `).join("")}function eS(i=[]){const e={confirmed:"已确认",excluded:"已排除",pending:"待复核"};return i.map(t=>`
        <li class="${b(t.status)}">
          <span>
            <b>${b(e[t.status])}</b>
            ${b(t.step)}
          </span>
          <div>
            <strong>${b(t.result)}</strong>
            <p>${b(t.basis)}</p>
            <small>影响：${b(t.decisionEffect)}</small>
          </div>
          <em>${b(t.owner)}</em>
        </li>
      `).join("")}function tS(i=[]){if(i.length===0)return"";const e=i.filter(r=>r.status==="confirmed"),t=i.filter(r=>r.status==="excluded"),n=i.filter(r=>r.status==="pending"),s=(r,a)=>r.map(o=>o.decisionEffect).join("；")||a;return`
    <section class="inspection-outcome-board" aria-label="隐患排查结果对维护策略的影响">
      <article class="confirmed">
        <span>确认 ${e.length}</span>
        <strong>锁定维护对象</strong>
        <p>${b(s(e,"等待确认主疑似部件。"))}</p>
      </article>
      <article class="excluded">
        <span>排除 ${t.length}</span>
        <strong>收窄工单范围</strong>
        <p>${b(s(t,"暂无可排除项。"))}</p>
      </article>
      <article class="pending">
        <span>待复核 ${n.length}</span>
        <strong>决定升级条件</strong>
        <p>${b(s(n,"等待现场复核窗口。"))}</p>
      </article>
    </section>
  `}function Uh(i,e=[]){if(!i)return"";const t=e.filter(r=>r.status==="confirmed").length,n=e.filter(r=>r.status==="excluded").length,s=e.filter(r=>r.status==="pending").length;return`
    <section class="maintenance-readiness-card" aria-label="预测维护生成工单前确认">
      <header>
        <span>工单前策略</span>
        <strong>由排查结果生成可执行条件</strong>
      </header>
      <dl>
        <div><dt>维护对象</dt><dd>${b(i.asset)}</dd></div>
        <div><dt>作业窗口</dt><dd>${b(i.dueWindow)}</dd></div>
        <div><dt>运行边界</dt><dd>${b(i.precondition)}</dd></div>
        <div><dt>备件工器具</dt><dd>${b(i.materials.join(" / "))}</dd></div>
      </dl>
      <p>排查结果：${t} 项确认、${n} 项排除、${s} 项待复核；只有窗口、许可、资源、回写责任都确认后，才进入工单草案。</p>
      <div class="maintenance-confirm-grid">
        ${i.confirmationChecks.map(r=>`
          <article>
            <span>${b(r.owner)}</span>
            <strong>${b(r.label)}</strong>
            <small>${b(r.detail)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Fh(i){return i?`
    <section class="workorder-writeback-summary" aria-label="复盘回写状态">
      <header>
        <span>复盘回写</span>
        <strong data-writeback-summary-state>待现场完成后回写</strong>
      </header>
      <div>
        ${i.writebackItems.map((e,t)=>`
          <label class="workorder-writeback-gate" data-writeback-summary-item="pending">
            <input type="checkbox" data-workorder-writeback="${t}" disabled />
            <span>${b(e.label)}</span>
            <strong>${b(e.value)}</strong>
            <em data-workorder-writeback-state>待派发</em>
          </label>
        `).join("")}
      </div>
      <p data-writeback-summary-note>回写完成后，事件会进入复盘样本，AI 诊断记录才允许闭环。</p>
    </section>
  `:""}function nS(i=[]){const e=i.find(n=>n.component==="gearbox")??i[0],t=i.filter(n=>n.component!==(e==null?void 0:e.component));return e?`
    <section class="bim-localization-card" aria-label="BIM 部件定位与排除项">
      <header>
        <span>BIM 定位</span>
        <strong>告警落到具体部件</strong>
      </header>
      <button class="primary" type="button" data-bim-part="${b(e.part)}" data-open-module="${b(e.module)}">
        <span>疑似主部件</span>
        <strong>${b(e.title)} · ${b(e.status)}</strong>
        <small>融合判据指向 ${b(e.title)}，点击聚焦 BIM 部件并进入研判。</small>
      </button>
      <div>
        ${t.map(n=>`
          <button type="button" data-bim-part="${b(n.part)}" data-open-module="${b(n.module)}">
            <span>反证 / 联动</span>
            <strong>${b(n.title)}</strong>
            <small>${b(n.status)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `:""}function uu(i,e=""){return i?`<button class="module-action${i.primary?" primary":""}" type="button" data-open-module="${b(i.module)}"${e}>${b(i.label)}</button>`:""}function iS(i,e=""){return i?`
    <button class="module-action stage-next-action${i.primary?" primary":""}" type="button" data-open-module="${b(i.module)}"${e}>
      <span>下一步</span>
      <strong>${b(i.label)}</strong>
    </button>
  `:""}function Ui(i){return i?`<p class="module-evidence-note">${b(i)}</p>`:""}function Oh(i,e,t={}){if(!i)return"";const n=t.mode??"evidence",s=n==="operation"?"operation-review-card operation":"evidence-review-card evidence",r=t.context??(n==="operation"?"操作复核":"证据复核");return`
    <article class="stage-focus-card ${s}">
      <header>
        <span>${b(r)}</span>
        <strong>${b(i.operation)}</strong>
      </header>
      <dl class="stage-focus-grid">
        <div><dt>输入数据</dt><dd>${b(i.input)}</dd></div>
        <div><dt>调用判据</dt><dd>${b(i.model)}</dd></div>
        <div><dt>输出结论</dt><dd>${b(i.result)}</dd></div>
      </dl>
      <footer class="stage-human-gate">
        <span>人工确认</span>
        <p>${b(i.confirm)}</p>
      </footer>
      ${iS(e,t.actionAttribute??"")}
      <details>
        <summary>展开证据依据</summary>
        <p>${b(i.evidence)}</p>
      </details>
    </article>
  `}function sa(i,e){return Oh(i,e,{mode:"evidence"})}function ra(i,e,t,n=""){return Oh(i,t,{actionAttribute:n,context:e,mode:"operation"})}function sS(i){return`
    <section class="event-timeline" aria-label="值班事件闭环">
      <header>
        <span>值班事件闭环</span>
        <strong>预警发现 -> 证据复核 -> 工单复盘</strong>
      </header>
      <ol>
        ${i.map((e,t)=>`
          <li class="event-step ${b(e.status)}" data-event-stage="${b(e.id)}" data-event-order="${t}">
            <span>${String(t+1).padStart(2,"0")}</span>
            <div>
              <strong>${b(e.title)}</strong>
              <p>${b(e.description)}</p>
              <small>${b(e.owner)} / ${b(Ki(e.module))}</small>
            </div>
          </li>
        `).join("")}
      </ol>
    </section>
  `}function rS(i){const e=i.aiBrief;if(!e)return"";const t=e.primaryAction,n=e.operatorFocus,s=e.evidence.slice(0,4);return`
    <section class="ai-duty-assistant ${b(e.riskLevel)}">
      <header>
        <div>
          <span>智能值班员</span>
          <strong>下一步：${b(t.label)}</strong>
        </div>
        <small id="ai-agent-status">后端智能检测中</small>
      </header>
      <article class="ai-duty-decision">
        <span>当前判断</span>
        <h4>${b(e.primaryFinding)}</h4>
        <p>${b(e.conclusion)}</p>
      </article>
      <section class="agent-duty-focus ai-duty-default-focus">
        <header>
          <span>值班焦点</span>
          <strong>先处理这一步</strong>
        </header>
        <div>
          <article>
            <span>当前判断</span>
            <strong>${b(n.decision)}</strong>
          </article>
          <article>
            <span>为什么看这里</span>
            <p>${b(n.why)}</p>
          </article>
          <article>
            <span>人工边界</span>
            <p>${b(n.humanCheck)}</p>
          </article>
        </div>
        <button type="button" data-open-module="${b(n.recommendedModule)}">${b(n.primaryQuestion)}</button>
      </section>
      <div class="ai-next-actions">
        <button class="primary" type="button" data-open-module="${b(t.module)}">${b(t.label)}</button>
        <button type="button" data-ai-generate-report>生成研判说明</button>
      </div>
      <details class="ai-progress-details">
        <summary>
          <span>闭环进度</span>
          <strong>查看预警到复盘回写</strong>
        </summary>
        ${sS(q.eventTimeline)}
      </details>
      <details class="ai-reasoning-details">
        <summary>
          <span>研判依据</span>
          <strong>展开输入 / 模型 / 结果</strong>
        </summary>
        <ol class="ai-decision-chain" aria-label="研判决策链">
          ${e.decisionSteps.map((r,a)=>`
            <li>
              <span>${String(a+1).padStart(2,"0")}</span>
              <div>
                <strong>${b(r.title)}</strong>
                <dl>
                  <div><dt>输入</dt><dd>${b(r.input)}</dd></div>
                  <div><dt>模型</dt><dd>${b(r.model)}</dd></div>
                  <div><dt>结果</dt><dd>${b(r.result)}</dd></div>
                </dl>
                <details>
                  <summary>查看工程细节</summary>
                  <p>${b(r.detail)}</p>
                  <button type="button" data-open-module="${b(r.module)}">打开${b(Ki(r.module))}</button>
                </details>
              </div>
            </li>
          `).join("")}
        </ol>
      </details>
      <details class="ai-evidence-details">
        <summary>展开本次证据明细</summary>
        <ol>
          ${e.evidence.map(r=>`<li>${b(r)}</li>`).join("")}
        </ol>
      </details>
    </section>
    <section class="ai-generated-report ai-duty-console" aria-live="polite">
      <header>
        <div>
          <span>值班问答</span>
          <strong>围绕当前预警追问，不做泛聊</strong>
        </div>
        <div class="ai-report-actions">
          <button type="button" data-ai-voice-question>语音追问</button>
          <button type="button" data-ai-generate-report>生成研判报告</button>
        </div>
      </header>
      <div class="ai-duty-console-grid">
        <section class="ai-recommended-questions" aria-label="推荐追问">
          <span>推荐追问</span>
          <div class="ai-question-chips">
            ${e.operatorQuestions.map(r=>`<button type="button" data-ai-question="${b(r)}">${b(r)}</button>`).join("")}
          </div>
        </section>
        <section class="ai-assistant-guardrail">
          <span>人工边界</span>
          <p>${b(n.humanCheck)}</p>
        </section>
      </div>
      <section class="ai-evidence-scope" aria-label="已读取的证据范围">
        <span>证据范围</span>
        <ul>
          ${s.map(r=>`<li>${b(r)}</li>`).join("")}
        </ul>
      </section>
      <div class="ai-question-console">
        <input id="ai-question-input" type="text" placeholder="例如：为什么不是螺栓问题？下一步怎么处理？" />
        <button type="button" data-ai-send-question>发送问题</button>
      </div>
      <div id="ai-generated-report-text" class="ai-report-body">已载入当前事件的 SCADA、CMS、油温、螺栓/结构证据包。请选择上方追问或输入问题；回答会标注证据来源和人工确认边界。</div>
    </section>
  `}function aS(){return Us.map(i=>{const e=i.id===Fn?" selected":"";return`<option value="${b(i.id)}"${e}>${b(i.title)}</option>`}).join("")}function kh(i){return`
    <button class="component${i.component==="gearbox"?" active":""}" type="button" data-component="${b(i.component)}" data-bim-part="${b(i.part)}" data-module="${b(i.module)}">
      <span>${b(i.title)}</span><strong>${b(i.status)}</strong>
    </button>
  `}function Bh(i="gearbox"){const e={component:"gearbox",module:"alerts",part:"gearbox",status:"P1 预警闭环",title:"齿轮箱"},t=q.componentRisks.find(s=>s.component===i)??q.componentRisks.find(s=>s.component==="gearbox")??q.componentRisks[0]??e,n=t.module;return{module:n,nextPage:Ba(n),risk:t}}function Do(i,e,t){var n,s;return((s=(n=q.modules[i].metrics)==null?void 0:n.find(r=>r.label===e))==null?void 0:s.value)??t}function oS(){var o;const{module:i,nextPage:e,risk:t}=Bh(),n=((o=q.modules.brief.aiBrief)==null?void 0:o.primaryFinding)??q.component,s=Do("scada","功率残差","待复核"),r=Do("cms","啮合侧频","待复核"),a=Do("bolts","最低通道","结构反证");return`
    <section class="bim-side-status-card" aria-label="当前 BIM 定位状态">
      <header>
        <span>当前定位</span>
        <strong data-bim-panel-title>${b((t==null?void 0:t.title)??n)}</strong>
        <small data-bim-panel-status>${b((t==null?void 0:t.status)??"待研判")} / ${b(Ki(i))}</small>
      </header>
      <div class="bim-panel-evidence">
        <article>
          <span>SCADA</span>
          <strong>${b(s)}</strong>
          <small>功率残差</small>
        </article>
        <article>
          <span>CMS</span>
          <strong>${b(r)}</strong>
          <small>侧频定位</small>
        </article>
        <article>
          <span>结构</span>
          <strong>${b(a)}</strong>
          <small>反证项</small>
        </article>
      </div>
      <p data-bim-panel-summary>${b(n)}；先在 BIM 中确认部件位置，再进入管理工作台查看可复算证据。</p>
      <footer>
        <button type="button" data-manager-page-button="${b(e)}" data-bim-side-page>打开证据页</button>
        <button type="button" data-open-module="workorder">工单确认门</button>
      </footer>
    </section>
  `}function zh(i,e,t){if(i==="brief")return`
      <section class="module-panel module-brief">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${rS(e)}
        <dl>${yi(e.metrics)}</dl>
        <p>${b(e.body??"")}</p>
        ${uu(e.action)}
      </section>
    `;if(i==="health"&&e.hero)return`
      <section class="module-panel module-health">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        <div class="case-hero">
          <div class="score-ring"><strong>${b(e.hero.score)}</strong><span>${b(e.hero.scoreLabel)}</span></div>
          <div>
            <strong>${b(e.hero.summary)}</strong>
            <p>${b(e.hero.text)}</p>
          </div>
        </div>
        <dl>${yi(e.metrics)}</dl>
        ${uu(e.action)}
      </section>
    `;if(i==="scada")return`
      <section class="module-panel module-scada">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${sa(e.decision,e.action)}
        <dl>${yi(e.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开 SCADA 图表与工程解释</summary>
          ${Ui(e.body)}
          ${xc(e.scadaChart)}
        </details>
      </section>
    `;if(i==="fusion")return`
      <section class="module-panel module-fusion">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${sa(e.decision,e.action)}
        <dl>${yi(e.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开多源证据与模型门控</summary>
          ${Ui(e.body)}
          ${Nh(e.fusionSignals,e.modelGates)}
          <div class="fusion-source-grid">${Dh(e.fusionSignals)}</div>
          <ol class="model-gate-list">${Qy(e.modelGates)}</ol>
        </details>
      </section>
    `;if(i==="cms")return`
      <section class="module-panel module-cms">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${sa(e.decision,e.action)}
        <dl>${yi(e.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开 CMS 频谱与工程解释</summary>
          ${Ui(e.body)}
          ${vc(e.cmsChart)}
        </details>
      </section>
    `;if(i==="bolts")return`
      <section class="module-panel module-bolts">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${sa(e.decision,e.action)}
        <dl>${yi(e.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开螺栓/结构证据与工程解释</summary>
          ${Ui(e.body)}
          ${bc(e.boltChart)}
        </details>
      </section>
    `;if(i==="alerts")return`
      <section class="module-panel module-alerts">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${ra(e.decision,`${t.turbineId} ${t.eventCode}`,e.action)}
        ${nS(t.componentRisks)}
        <details class="module-evidence-stack">
          <summary>展开告警证据链与事件说明</summary>
          ${Ui(e.body)}
          <ul class="event-list">${Jy(e.evidenceRows)}</ul>
        </details>
      </section>
    `;if(i==="inspection")return`
      <section class="module-panel module-inspection">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${ra(e.decision,void 0,e.action)}
        <dl>${yi(e.metrics)}</dl>
        ${tS(e.inspectionItems)}
        <details class="module-evidence-stack">
          <summary>展开排查原则与清单</summary>
          ${Ui(e.body)}
          <ol class="inspection-list">${eS(e.inspectionItems)}</ol>
        </details>
      </section>
    `;if(i==="maintenance")return`
      <section class="module-panel module-maintenance">
        <div class="module-kicker">${b(e.kicker)}</div>
        <h3>${b(e.title)}</h3>
        ${ra(e.decision,void 0,e.action," data-create-workorder")}
        <dl>${yi(e.metrics)}</dl>
        ${Uh(t.modules.workorder.ticket,t.modules.inspection.inspectionItems)}
        <details class="module-evidence-stack">
          <summary>展开维护策略说明</summary>
          ${Ui(e.body)}
        </details>
      </section>
    `;const n=e.ticket;return`
    <section class="module-panel module-workorder">
      <div class="module-kicker">${b(e.kicker)}</div>
      <h3>${b(e.title)}</h3>
      ${ra(e.decision)}
      <div class="workorder-ticket">
        <span id="workorder-state">${b((n==null?void 0:n.initialState)??"待生成")}</span>
        <strong id="workorder-code">${b((n==null?void 0:n.draftCode)??"WO-待创建")}</strong>
      </div>
      <dl class="workorder-execution-card">
        <div><dt>设备对象</dt><dd>${b((n==null?void 0:n.asset)??q.turbineId)}</dd></div>
        <div><dt>作业窗口</dt><dd>${b((n==null?void 0:n.dueWindow)??"48-72 h")}</dd></div>
        <div><dt>作业前提</dt><dd>${b((n==null?void 0:n.precondition)??"限功率运行")}</dd></div>
        <div><dt>回写责任</dt><dd>${b(((n==null?void 0:n.writebackItems)??[]).map(s=>s.label).join(" / "))}</dd></div>
      </dl>
      ${Fh(n)}
      <section class="workorder-confirmation">
        <header>
          <span>人工确认门</span>
          <strong>4 项确认后才允许派发</strong>
        </header>
        <section class="workorder-gate-summary" data-workorder-gate-summary>
          <article>
            <span>当前阻塞点</span>
            <strong data-workorder-blocker>等待生成工单草案</strong>
          </article>
          <article>
            <span>下一动作</span>
            <strong data-workorder-next-action>由告警研判或预测维护模块生成工单</strong>
          </article>
          <article>
            <span>人工边界</span>
            <strong data-workorder-human-boundary>系统只给草案，派发和关闭必须人工确认</strong>
          </article>
        </section>
        <div class="workorder-confirm-grid">
          ${((n==null?void 0:n.confirmationChecks)??[]).map(s=>`
            <label class="workorder-confirm" data-workorder-confirm-card="${b(s.id)}" data-state="pending">
              <input type="checkbox" data-workorder-confirm="${b(s.id)}" />
              <span class="workorder-confirm-body">
                <span class="workorder-confirm-row">
                  <small>${b(s.owner)}</small>
                  <em data-workorder-confirm-state>待签核</em>
                </span>
                <b>${b(s.label)}</b>
                <p>${b(s.detail)}</p>
              </span>
            </label>
          `).join("")}
        </div>
        <button class="module-action primary" type="button" data-dispatch-workorder disabled>${b((n==null?void 0:n.dispatchActionLabel)??"确认派发工单")}</button>
      </section>
      <details class="module-evidence-stack">
        <summary>展开安全要求、工器具、步骤与验收标准</summary>
        <dl class="workorder-meta">
          <div><dt>优先级</dt><dd>${b((n==null?void 0:n.priority)??"P1 高优先级")}</dd></div>
          <div><dt>责任班组</dt><dd>${b((n==null?void 0:n.assignee)??"传动链专业班组")}</dd></div>
          <div><dt>位置</dt><dd>${b((n==null?void 0:n.location)??"山地风场")}</dd></div>
        </dl>
        <section class="workorder-section">
          <span>安全要求</span>
          <p>${b((n==null?void 0:n.safetyRequirement)??"按风场登塔和停机规程执行。")}</p>
        </section>
        <section class="workorder-section">
          <span>工器具 / 备件</span>
          <p>${b(((n==null?void 0:n.materials)??[]).join(" / "))}</p>
        </section>
        <ol class="workorder-steps">
          ${((n==null?void 0:n.steps)??[]).map((s,r)=>`
            <li>
              <span>${String(r+1).padStart(2,"0")}</span>
              <div>
                <strong>${b(s.action)}</strong>
                <small>${b(s.owner)} / 输出：${b(s.output)}</small>
              </div>
            </li>
          `).join("")}
        </ol>
        <section class="workorder-section">
          <span>验收标准</span>
          <ul>
            ${((n==null?void 0:n.acceptanceCriteria)??[]).map(s=>`<li>${b(s)}</li>`).join("")}
          </ul>
        </section>
        <section class="workorder-writeback">
          <span>复盘回写</span>
          <ul>
            ${((n==null?void 0:n.writebackItems)??[]).map(s=>`<li data-writeback-item><b>${b(s.label)}</b><small>${b(s.value)}</small></li>`).join("")}
          </ul>
        </section>
      </details>
      <button class="module-action" type="button" data-close-workorder disabled>${b((n==null?void 0:n.closeActionLabel)??"标记完成")}</button>
    </section>
  `}function Gh(){return`${Sc(q.turbineId)}齿轮箱出现一级预警。已锁定多源证据，进入告警研判查看证据链与工单。`}function lS(){const i=q.modules.brief.aiBrief,e=["为什么报警？","下一步看哪里？","工单能派发吗？"];return`
    <aside class="global-ai-shell" data-open="false" data-orb-state="idle" data-agent-status="checking" aria-label="AI 值班员">
      <button id="global-ai-orb" class="global-ai-orb" type="button" aria-expanded="false" aria-controls="global-ai-panel" title="拖动调整位置，点击打开 AI 值班助手">
        <span class="global-ai-orb-core">AI</span>
        <span class="global-ai-orb-ring" aria-hidden="true"></span>
        <small>值班员</small>
      </button>
      <section id="global-ai-panel" class="global-ai-panel" aria-live="polite">
        <header>
          <div>
            <span>值班助手</span>
            <strong id="global-ai-finding">${b((i==null?void 0:i.primaryFinding)??"等待诊断事件")}</strong>
          </div>
          <button id="global-ai-close" type="button" aria-label="收起 AI 值班员">收起</button>
        </header>
        <p id="global-ai-context">问一句，或直接点动作。AI 只做研判和导航，派发、登塔、停机仍需人工确认。</p>
        <section class="global-ai-status-line">
          <span id="global-ai-asset">${b(q.turbineId)}</span>
          <strong id="global-ai-status">正在检测后端智能</strong>
        </section>
        <div class="global-ai-quick-actions" aria-label="值班动作">
          <button type="button" data-global-ai-open-page="fusion">证据</button>
          <button type="button" data-global-ai-focus-part="gearbox">定位</button>
          <button type="button" data-global-ai-workorder>工单</button>
        </div>
        <section class="global-ai-question-chips" aria-label="推荐追问">
          ${e.map(t=>`<button type="button" data-global-ai-question="${b(t)}">${b(t)}</button>`).join("")}
        </section>
        <div class="global-ai-input-row">
          <input id="global-ai-input" type="text" placeholder="问 AI：为什么报警？下一步看哪里？" />
          <button type="button" data-global-ai-send>发送</button>
          <button type="button" data-global-ai-voice>语音</button>
        </div>
        <div id="global-ai-answer" class="global-ai-answer">问一句或点一个动作：证据 -> 定位 -> 工单。</div>
      </section>
    </aside>
  `}var bu;Rh.innerHTML=`
  <main class="shell" data-mode="intro" data-ai-event="standby">
    <section class="scene-wrap">
      <div id="cesium-root" class="cesium-root" aria-label="山地风电 GIS+BIM 主场景"></div>
      <div class="scene-grade" aria-hidden="true"></div>
      <div class="wind-streaks" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <header class="hero-title">
        <p>Guizhou Mountain WindOps Twin</p>
        <h1>黔风智维</h1>
        <strong>多气候山地风电机组智驭预警及故障诊断平台</strong>
      </header>
      <a class="data-validation-link" href="${b("/qianfeng-windops-platform/xeokit-viewer/")}" target="_blank" rel="noreferrer">
        数据验证
      </a>

      <section class="ai-duty-card" aria-label="值班播报" aria-live="polite">
        <div>
          <span>值班提醒</span>
          <strong id="ai-duty-title">${b(((bu=q.modules.brief.aiBrief)==null?void 0:bu.primaryFinding)??"等待诊断事件")}</strong>
        </div>
        <p id="ai-duty-text">${b(Gh())}</p>
        <footer>
          <small id="ai-duty-status">已生成播报，等待风场巡航完成</small>
          <button id="ai-duty-speak" type="button">语音播报</button>
          <button id="ai-duty-open" type="button">进入BIM诊断</button>
        </footer>
      </section>

      <section class="bim-screen" aria-label="单机组 BIM 智驭诊断大屏">
        <header class="bim-header">
          <div>
            <h2>黔风智维 - 风电机组智能预警与故障诊断平台</h2>
          </div>
          <label class="case-switcher" for="case-selector">
            <span>案例</span>
            <select id="case-selector" aria-label="切换故障案例">
              ${aS()}
            </select>
          </label>
          <strong id="bim-selected-title">HS-WTG-01</strong>
          <button id="open-manager-workspace" class="bim-back manager-open" type="button">管理工作台</button>
          <button id="close-bim" class="bim-back" type="button">返回 GIS 场景</button>
        </header>

        <section class="bim-stage" aria-label="风机 BIM 部件拆分视图">
          <div class="blueprint-grid" aria-hidden="true"></div>
          <div id="bim-model-root" class="first-version-bim-canvas" aria-label="风机 BIM 精细模型"></div>
          <div class="bim-stage-hud">
            <span>HS-WTG 单机透视</span>
            <strong id="bim-status">等待进入单机 BIM 诊断</strong>
            <em>先在 BIM 中定位疑似部件；需要数据分析、证据复核或工单签核时进入管理工作台。</em>
          </div>
          <div class="bim-stage-actions" aria-label="BIM 模型操作">
            <button id="bim-toggle-decompose" type="button" data-state="composed">拆解模型</button>
            <button id="bim-warning" type="button">告警闪烁</button>
          </div>
          <button class="part-label label-blade" type="button" data-bim-part="blade">叶片/变桨</button>
          <button class="part-label label-gearbox" type="button" data-bim-part="gearbox">齿轮箱</button>
          <button class="part-label label-generator" type="button" data-bim-part="nacelle">发电机</button>
          <button class="part-label label-yaw" type="button" data-bim-part="hub">转子主轴</button>
          <button class="part-label label-tower" type="button" data-bim-part="tower">塔筒结构</button>
        </section>

        <aside class="component-strip" aria-label="部件拆分">
          ${q.componentRisks.map(kh).join("")}
        </aside>

        <aside class="module-drawer" aria-label="业务模块">
          ${Ph()}
          ${q.moduleOrder.map(i=>zh(i,q.modules[i],q)).join("")}
        </aside>

        <nav class="bim-toolbar" aria-label="业务流程">
          ${Ny()}
        </nav>
      </section>
      ${lS()}
    </section>
  </main>
`;const Hh=document.querySelector(".shell"),Vh=document.querySelector("#cesium-root"),$h=document.querySelector("#bim-model-root"),hu=document.querySelector("#bim-status"),Wh=document.querySelector(".component-strip"),Xh=document.querySelector(".module-drawer"),qh=document.querySelector("#case-selector"),fu=document.querySelector("#ai-duty-title"),pu=document.querySelector("#ai-duty-text"),fn=document.querySelector("#ai-duty-status"),jh=document.querySelector(".global-ai-shell"),Yh=document.querySelector("#global-ai-orb"),Kh=document.querySelector("#global-ai-panel"),Zh=document.querySelector("#global-ai-input"),Jh=document.querySelector("#global-ai-answer"),cS=document.querySelector("#global-ai-status"),dS=document.querySelector("#global-ai-finding"),uS=document.querySelector("#global-ai-asset"),hS=document.querySelector("#global-ai-context");if(!Hh||!Vh||!$h||!Wh||!Xh||!qh||!jh||!Yh||!Kh||!Zh||!Jh)throw new Error("Missing dashboard shell, Cesium root, BIM root, or workflow controls");const Pe={answer:Jh,asset:uS,context:hS,finding:dS,input:Zh,orb:Yh,panel:Kh,shell:jh,status:cS},Ol="qianfeng.globalAi.position.v1";let en,bn,Ra=!1,Gi;const Vt=Hh,fS=$h,Qh=Wh,Ye=Xh,kl=qh;let No,Vi=!1,ki=!1,Fs=!1;const mu=["ai-alert","evidence-review","bim-location","workorder-draft","human-confirm","review-writeback"];nf();WS();Mc();vS();Ws("brief");zt("ai-alert");Ti("gearbox");function Et(i){hu&&(hu.textContent=i)}function Ti(i){document.querySelectorAll(".component").forEach(e=>{e.classList.toggle("active",e.dataset.component===i)}),pS(i)}function pS(i="gearbox"){const e=Ye.querySelector(".bim-side-status-card");if(!e)return;const{module:t,nextPage:n,risk:s}=Bh(i),r={alerts:"BIM 已定位主疑似部件，进入告警中心确认等级、反证项和人工边界。",bolts:"结构侧用于排除叶根/塔筒主故障，并跟踪山地阵风载荷放大影响。",brief:"先让智能值班员给出当前判断，再进入证据复核。",cms:"CMS 用于把运行异常定位到传动链和齿轮箱部件。",fusion:"融合判据把 SCADA、CMS、油温和结构反证放入同一事件窗口。",health:"健康管理用于按部件层级和权重查看当前筛查结果。",inspection:"隐患排查只保留会改变处置策略的现场检查项。",maintenance:"预测维护根据风险窗口、备件和班组资源形成策略。",scada:"SCADA 用于判断同风速段功率和油温是否偏离基线。",workorder:"工单中心只生成草案，派发和关闭必须人工确认。"},a=e.querySelector("[data-bim-panel-title]"),o=e.querySelector("[data-bim-panel-status]"),l=e.querySelector("[data-bim-panel-summary]");a&&(a.textContent=s.title),o&&(o.textContent=`${s.status} / ${Ki(t)}`),l&&(l.textContent=r[t]);const c=e.querySelector("[data-bim-side-page]");c&&(c.dataset.managerPageButton=n)}function zt(i){const e=mu.indexOf(i);e<0||Ye.querySelectorAll(".event-step").forEach(t=>{const n=t.dataset.eventStage,s=n?mu.indexOf(n):-1;if(t.classList.remove("done","active","pending","review"),s<0){t.classList.add("pending");return}if(s<e){t.classList.add("done");return}if(n==="human-confirm"&&i==="workorder-draft"){t.classList.add("review");return}t.classList.add(s===e?"active":"pending")})}function mS(i){return q.moduleOrder.includes(i)}function Es(i,e){return i&&mS(i)?i:e}function ti(i,e){Ws(i),e&&Et(e)}function Xi(){Vt.dataset.workspace="manager"}function qi(){Vt.dataset.workspace="bim"}function Ts(i){return!!(i&&wi.has(i))}function yc(i){const e=Ts(i)?i:"event";Vt.dataset.managerPage=e,Ye.querySelectorAll("[data-manager-page-button]").forEach(t=>{t.classList.toggle("active",t.dataset.managerPageButton===e)})}function Er(i,e){const t=wi.get(i)??Mr[0];Xi(),Ws(t.module),yc(t.key),e&&Et(e)}function gS(i){return q.partNamePattern.test(i)}function Os(i="alerts"){Ti("gearbox"),zt("bim-location"),ti(i,q.statuses.locked)}function Ot(){return No||(No=new uy({container:fS,onPartPicked:i=>{gS(i)&&Os("alerts")},onStatus:Et})),No}function Ws(i){Vt.dataset.activeModule=i;const e=gc(i);Vt.dataset.activeStage=i==="none"?"none":e.key,i!=="none"&&yc(Ba(i)),document.querySelectorAll(".module-tab").forEach(t=>{const n=t.dataset.stage,s=t.dataset.module,r=n?n===Vt.dataset.activeStage:s===i;t.classList.toggle("active",r)}),ef(i)}function ef(i){var o;const e=Ye.querySelector("[data-workflow-command-card]");if(!e)return;const t=gc(i),n=e.querySelector("[data-command-title]"),s=e.querySelector("[data-command-stage]"),r=e.querySelector("[data-command-description]"),a=e.querySelector("[data-command-next]");n&&(n.textContent=`${q.turbineId} · ${((o=q.modules.brief.aiBrief)==null?void 0:o.primaryFinding)??q.component}`),s&&(s.textContent=`${t.title} / ${t.focusLabel}`),r&&(r.textContent=t.description),a&&(a.textContent=t.nextAction)}function Bl(i){const e=document.querySelector("#bim-selected-title");e&&(e.textContent=i)}function tf(){const i=q.modules.brief.aiBrief;fu&&(fu.textContent=(i==null?void 0:i.primaryFinding)??"等待诊断事件"),pu&&(pu.textContent=Gh()),fn&&(fn.textContent="已生成值班播报，可语音复述或进入告警研判"),Mc()}function gu(i){Fs||(Fs=!0,rf(i.turbineId),Vt.dataset.aiEvent="active",zt("ai-alert"),tf(),Gt("alert",`${Sc(q.turbineId)}出现预警`),fn&&(fn.textContent="巡航发现异常，已生成值班提醒"),of(!1))}function nf(){Qh.innerHTML=q.componentRisks.map(kh).join(""),Ye.innerHTML=[Ph(),oS(),Fy(),`<details class="linked-evidence-drawer">
      <summary>展开当前页面的关联证据抽屉</summary>
      ${q.moduleOrder.map(i=>zh(i,q.modules[i],q)).join("")}
    </details>`].join(""),Pf(),ef(Vt.dataset.activeModule??"brief"),yc(Vt.dataset.managerPage??"event"),lf()}function sf(i){const e=Us.find(n=>n.id===i);if(!e)return;const t=Es(Vt.dataset.activeModule??"","brief")??"brief";Fn=e.id,kl.value=Fn,q=Ah(e.input),nf(),Bl(q.turbineId),tf(),Mc(),zt("ai-alert"),ti(t,`已切换案例：${e.title}`),Ti("gearbox"),["scada","cms","alerts","inspection","maintenance","workorder"].includes(t)&&Ot().focusPart("gearbox")}function rf(i){const e=Us.find(t=>t.input.turbineId===i);e&&e.id!==Fn&&sf(e.id)}function zl(i,e="brief"){rf(i.turbineId),Vt.dataset.mode="bim",Vt.dataset.workspace="bim",Ws(e),window.requestAnimationFrame(()=>{Ot().initialize()}),i.name===q.turbineId?Bl(i.name):Bl(q.turbineId)}function Gl(){return Ul.turbines.find(i=>i.turbineId===q.turbineId)??Ul.turbines[0]}function Sc(i){var t;const e=(t=i.match(/(\d+)$/))==null?void 0:t[1];return e?`${Number(e)}号机`:i}function af(i,e,t=1.25){var s;if(!("speechSynthesis"in window))return(s=e.onUnsupported)==null||s.call(e),!1;const n=new SpeechSynthesisUtterance(i);return n.lang="zh-CN",n.rate=t,n.pitch=.96,n.onstart=e.onStart??null,n.onend=e.onEnd??null,n.onerror=e.onError??null,window.speechSynthesis.cancel(),window.speechSynthesis.speak(n),window.speechSynthesis.resume(),!0}function of(i=!0){const e=q.modules.brief.aiBrief;e&&af(e.broadcast,{onEnd:()=>{fn&&(fn.textContent="播报完成，可进入告警研判查看证据链")},onError:()=>{fn&&(fn.textContent=i?"浏览器语音未启动，研判文字已同步显示":"已生成播报，可点击语音播报")},onStart:()=>{fn&&(fn.textContent="正在播报当前风机风险")},onUnsupported:()=>{fn&&(fn.textContent="当前浏览器不支持语音播报，已保留文字研判")}})}function cr(i){const e=Ye.querySelector("#ai-generated-report-text");e&&(e.textContent=i),TS(i)}function _S(i){const e=Ye.querySelector("#ai-generated-report-text");e&&(e.innerHTML=i,Af(e))}function aa(i,e="checking"){Ye.querySelectorAll("#ai-agent-status").forEach(t=>{t.textContent=i,t.dataset.mode=e}),hf(i,e)}async function lf(){aa("后端智能检测中","checking");try{const e=await(await fetch("/api/agent/status")).json();if(e.configured){aa(`已接入 ${e.model??"大模型"}`,"configured");return}aa("本地规则兜底","fallback")}catch{aa("后端未连接","fallback")}}function cf(){return Ye.querySelector("#ai-question-input")}function df(){return Pe.input}function si(i){Pe.shell.dataset.open=i?"true":"false",Pe.orb.setAttribute("aria-expanded",i?"true":"false")}function xS(i,e){const t=Pe.shell.getBoundingClientRect(),n=12,s=Math.max(n,window.innerWidth-t.width-n),r=Math.max(n,window.innerHeight-t.height-n);return{x:Math.min(Math.max(i,n),s),y:Math.min(Math.max(e,n),r)}}function Xs(i,e,t=!1){const n=xS(i,e);Pe.shell.style.left=`${n.x}px`,Pe.shell.style.top=`${n.y}px`,Pe.shell.style.right="auto",Pe.shell.style.bottom="auto",Pe.shell.dataset.dragged="true",t&&window.localStorage.setItem(Ol,JSON.stringify(n))}function uf(){Ra=!0,Gi&&window.clearTimeout(Gi),Gi=window.setTimeout(()=>{Ra=!1,Gi=void 0},180)}function vS(){const i=window.localStorage.getItem(Ol);if(i)try{const e=JSON.parse(i);typeof e.x=="number"&&typeof e.y=="number"&&Xs(e.x,e.y)}catch{window.localStorage.removeItem(Ol)}}function bS(i){if(i.button>0)return;i.preventDefault();const e=Pe.shell.getBoundingClientRect();en={hasMoved:!1,offsetX:i.clientX-e.left,offsetY:i.clientY-e.top,pointerId:i.pointerId,startX:i.clientX,startY:i.clientY},Pe.shell.dataset.dragging="true",Pe.orb.setPointerCapture(i.pointerId)}function yS(i){!en||i.pointerId!==en.pointerId||(Math.hypot(i.clientX-en.startX,i.clientY-en.startY)>5&&(en.hasMoved=!0),!en.hasMoved)||Xs(i.clientX-en.offsetX,i.clientY-en.offsetY)}function _u(i){if(!en||i.pointerId!==en.pointerId)return;if(en.hasMoved){const t=Pe.shell.getBoundingClientRect();Xs(t.left,t.top,!0),uf()}delete Pe.shell.dataset.dragging,Pe.orb.hasPointerCapture(i.pointerId)&&Pe.orb.releasePointerCapture(i.pointerId),en=void 0}function SS(i){if(i.button>0||en)return;i.preventDefault();const e=Pe.shell.getBoundingClientRect();bn={hasMoved:!1,offsetX:i.clientX-e.left,offsetY:i.clientY-e.top,startX:i.clientX,startY:i.clientY},Pe.shell.dataset.dragging="true"}function MS(i){!bn||(Math.hypot(i.clientX-bn.startX,i.clientY-bn.startY)>5&&(bn.hasMoved=!0),!bn.hasMoved)||(i.preventDefault(),Xs(i.clientX-bn.offsetX,i.clientY-bn.offsetY))}function ES(){if(!bn)return;if(bn.hasMoved){const e=Pe.shell.getBoundingClientRect();Xs(e.left,e.top,!0),uf()}delete Pe.shell.dataset.dragging,bn=void 0}function Gt(i,e){Pe.shell.dataset.orbState=i,e&&hf(e)}function hf(i,e){Pe.status&&(Pe.status.textContent=i),e&&(Pe.shell.dataset.agentStatus=e)}function TS(i){Pe.answer.textContent=i}function AS(i){Pe.answer.innerHTML=i,Af(Pe.answer)}function wS(i,e,t){var u;const n=i.status==="pending"?t?"已执行安全导航":"正在生成":i.source==="llm"?"大模型回答":"本地规则兜底",s=i.operatorFocus.recommendedModule,r=Ba(s),a=((u=i.bimHighlights.find(h=>h.severity==="alarm"))==null?void 0:u.part)??"gearbox",o=i.intent==="general_chat",l=!!(t&&/(BIM|定位|聚焦|部件|齿轮箱)/i.test(t)),c=t?`${t}
${i.operatorFocus.humanCheck}`:i.answerText.trim()||"当前没有生成有效回答，请重新提问。",d=t&&i.status!=="pending"?`<p class="global-ai-action-result">${b(t)}</p>`:"";return`
    <article class="global-ai-chat-answer">
      <header>
        <span>${b(n)} / ${b(pf(i.intent))}</span>
        <strong>${b(i.operatorFocus.decision)}</strong>
      </header>
      <section class="global-ai-chat-turn user">
        <span>你</span>
        <p>${b(e)}</p>
      </section>
      <section class="global-ai-chat-turn assistant">
        <span>AI 值班员</span>
        <p>${b(c)}</p>
      </section>
      ${d}
      <section class="global-ai-chat-next">
        <span>可继续说</span>
        ${o?`
          <button type="button" data-agent-open-module="brief">切到当前预警</button>
        `:l?`
          <button type="button" data-agent-bim-part="${b(a)}">保持 BIM 定位</button>
          <button type="button" data-global-ai-open-page="${b(r)}">查看证据详情</button>
        `:`
          <button type="button" data-agent-open-module="${b(s)}">${b(i.operatorFocus.primaryQuestion)}</button>
          <button type="button" data-agent-bim-part="${b(a)}">定位疑似部件</button>
          <button type="button" data-global-ai-open-page="${b(r)}">打开详情页</button>
        `}
      </section>
      <p class="global-ai-boundary">${b(i.riskBoundary)}</p>
    </article>
  `}function oa(i,e,t){_S(US(i,e)),AS(wS(i,e,t))}function Mc(){const i=q.modules.brief.aiBrief;Pe.finding&&(Pe.finding.textContent=(i==null?void 0:i.primaryFinding)??"等待诊断事件"),Pe.asset&&(Pe.asset.textContent=q.turbineId),Pe.context&&(Pe.context.textContent=i?`当前跟随 ${q.turbineId}：${i.conclusion}。我会基于证据、知识链和工单门控回答，不替代人工停机、登塔和派发。`:"我会跟随当前预警读取 SCADA、CMS、结构监测、知识图谱和工单上下文；停机、登塔、派发仍需人工确认。")}function ff(i){const e=cf();e&&(e.value=i);const t=df();t&&(t.value=i)}function CS(i){if(/知识图谱|图谱|关系链|因果链/.test(i))return"knowledge";if(/SCADA|scada|功率|风速|油温|运行数据/.test(i))return"scada";if(/CMS|cms|振动|频谱|侧频|齿轮啮合/.test(i))return"cms";if(/螺栓|法兰|塔筒|结构|预应力|钢绞线/.test(i))return"structure";if(/融合|判据|证据链|证据|依据|为什么/.test(i))return"fusion";if(/健康|评分|广谱筛查|筛查/.test(i))return"health";if(/维护|策略|处置|备件|检修|窗口/.test(i))return"maintenance";if(/工单|派发|派单|闭环|回写|验收/.test(i))return"workorders"}function _a(i){if(/(定位|聚焦|高亮|闪烁|进入.*BIM|打开.*BIM|看.*BIM|部件定位)/i.test(i)&&/(齿轮箱|齿轮|部件|BIM|模型|告警|疑似)/i.test(i))return En("alerts"),qi(),Os("alerts"),Ti("gearbox"),Ot().focusPart("gearbox"),Gt("ready","已进入 BIM 并定位齿轮箱"),"已执行：进入单机 BIM，聚焦齿轮箱疑似部件。";if(/(告警闪烁|报警闪烁|红色闪烁|闪一下|闪烁)/.test(i)){if(En("alerts"),qi(),Os("alerts"),!Vi){Vi=Ot().toggleWarning();const s=document.querySelector("#bim-warning");s&&(s.textContent=Vi?"停止告警":"告警闪烁")}return Gt("ready","已开启 BIM 告警闪烁"),"已执行：齿轮箱疑似部件进入告警闪烁态。"}if(/(生成|创建|打开|进入|查看|跳到|带我|帮我看|看一下).*(工单|作业票|派发|闭环|回写)/.test(i))return En("workorder"),Tr("AI 已打开工单人工确认门：请核对安全窗口、备件和责任人"),Xi(),Gt("ready","已打开工单人工确认门"),"已执行：打开工单人工确认门。AI 只生成草案，不自动派发。";const t=CS(i),n=/(打开|进入|查看|跳到|带我|帮我看|看一下|切到)/.test(i);if(t&&n){const s=wi.get(t);return En((s==null?void 0:s.module)??"fusion"),Er(t,`AI 已打开${(s==null?void 0:s.label)??"详情页"}，请复核输入数据、模型判据和结论`),Gt("ready",`已打开${(s==null?void 0:s.label)??"详情页"}`),`已执行：打开${(s==null?void 0:s.title)??"详情页"}。`}}function En(i="brief"){if(Fs=!0,Vt.dataset.mode==="bim"){qi();return}zl(Gl(),i),qi()}function fr(i,e={}){const t=i.trim()||"下一步应该先看哪张证据？",n=za(t);Fs=!0,ff(t),si(!0),Gt("thinking",n==="general_chat"?"正在调用大模型回答":"正在读取事件证据并调用智能研判"),cr(n==="general_chat"?`已收到：${t}
AI 正在调用大模型回答普通问题...`:`已收到：${t}
AI 正在读取当前事件、证据链和工单门控...`),Et(`AI 已收到追问：${t}`);const s=_a(t);s&&Et(s),pr(t,{...e,actionMessage:s})}function Ki(i){return{alerts:"告警中心",bolts:"螺栓监测",brief:"告警研判",cms:"CMS",fusion:"融合判据",health:"健康评分",inspection:"隐患排查",maintenance:"预测维护",scada:"SCADA",workorder:"运维工单"}[i]}function pf(i){return{capability:"能力说明",counter_evidence:"反证排查",evidence_chain:"证据链",explain_alarm:"告警解释",general_chat:"普通对话",maintenance_plan:"处置策略",report:"诊断报告",workorder:"工单草案"}[i]??"值班问答"}function RS(i){return`${Math.max(0,Math.min(100,i)).toFixed(0)}%`}function Zi(){var u,h,f,g;const i=q.modules.workorder.ticket,e=(i==null?void 0:i.confirmationChecks)??[],t=(i==null?void 0:i.writebackItems)??[],n=((h=(u=document.querySelector("#workorder-state"))==null?void 0:u.textContent)==null?void 0:h.trim())??(i==null?void 0:i.initialState)??"待生成",s=e.filter(x=>{const m=document.querySelector(`[data-workorder-confirm="${x.id}"]`);return!!(m!=null&&m.checked)}),r=t.map((x,m)=>{const p=document.querySelector(`[data-workorder-writeback="${m}"]`);return{checked:!!(p!=null&&p.checked),disabled:!!(p!=null&&p.disabled),item:x}}),a=r.filter(x=>x.checked),o=r.filter(x=>!x.checked),l=e.filter(x=>!s.includes(x)),c=((g=(f=document.querySelector("[data-writeback-summary-state]"))==null?void 0:f.textContent)==null?void 0:g.trim())??"待现场完成后回写",d=n.includes("现场复核完成");return{completedWritebacks:a,confirmedChecks:s,isClosed:d,pendingChecks:l,pendingWritebacks:o,summaryState:c,totalChecks:e.length,totalWritebacks:t.length,workOrderState:n}}function mf(){const i=Zi(),e=i.completedWritebacks.map(({item:s})=>`<li>${b(s.label)} 已进入复盘样本</li>`).join("")||"<li>等待现场回写，暂不进入复盘样本。</li>",n=[...i.pendingChecks.map(s=>`${s.label}（${s.owner}）`),...i.pendingWritebacks.map(({item:s,disabled:r})=>`${s.label}${r?"（派发后回写）":"（待现场回写）"}`)].map(s=>`<li>${b(s)}</li>`).join("")||"<li>签核、回写和关闭门控已完成，等待复盘审核。</li>";return`
    <header>
      <span>工单闭环状态</span>
      <strong>${b(i.isClosed?"复盘样本已回写":i.summaryState)}</strong>
    </header>
    <div class="agent-closure-metrics">
      <article>
        <span>工单状态</span>
        <strong>${b(i.workOrderState)}</strong>
      </article>
      <article>
        <span>人工签核</span>
        <strong>${i.confirmedChecks.length}/${i.totalChecks}</strong>
      </article>
      <article>
        <span>现场回写</span>
        <strong>${i.completedWritebacks.length}/${i.totalWritebacks}</strong>
      </article>
    </div>
    <div class="agent-closure-lists">
      <section>
        <h4>已进入复盘样本</h4>
        <ul>${e}</ul>
      </section>
      <section>
        <h4>仍需人工复核</h4>
        <ul>${n}</ul>
      </section>
    </div>
    <p>研判报告只引用已确认的结构化证据和现场回写状态；未回写项不会被当成已验证事实。</p>
  `}function PS(){return`<section class="agent-closure-card" data-agent-closure-card>${mf()}</section>`}function gf(){const i=Zi(),e=i.isClosed?"复盘审核":i.workOrderState.includes("已派发")?i.pendingWritebacks.length>0?"现场回写门":"关闭确认门":"工单确认门";return`
    <header>
      <span>工单状态摘要</span>
      <strong>${b(i.isClosed?"已回写复盘样本":i.workOrderState)}</strong>
    </header>
    <div class="agent-closure-summary-row">
      <article>
        <span>人工签核</span>
        <strong>${i.confirmedChecks.length}/${i.totalChecks}</strong>
      </article>
      <article>
        <span>现场回写</span>
        <strong>${i.completedWritebacks.length}/${i.totalWritebacks}</strong>
      </article>
      <article>
        <span>下一门控</span>
        <strong>${b(e)}</strong>
      </article>
    </div>
    <p>完整派发、回写和关闭门控已收起；当前问题先处理上方值班焦点。需要安排现场动作时，再打开工单确认门。</p>
    <button type="button" data-agent-open-module="workorder">打开工单确认门</button>
  `}function IS(){return`<section class="agent-closure-summary" data-agent-closure-summary>${gf()}</section>`}function ks(){Ye.querySelectorAll("[data-agent-closure-card]").forEach(i=>{i.innerHTML=mf()}),Ye.querySelectorAll("[data-agent-closure-summary]").forEach(i=>{i.innerHTML=gf()})}function LS(i){return/(工单|派发|派单|关闭|闭环|回写|签核|确认门|现场复核|复盘样本)/.test(i)?/(还差|缺什么|能不能|能否|可以.*吗|能.*吗|派发|派单|关闭|闭环|回写|签核|确认门|现场复核|复盘样本)/.test(i):!1}function DS(i){const e=Zi(),t=e.pendingChecks.map(r=>`${r.label}（${r.owner}）`),n=e.pendingWritebacks.map(({item:r,disabled:a})=>`${r.label}${a?"（派发后才能回写）":"（待现场回写确认）"}`),s=[...t,...n];return/派发|派单/.test(i)?e.workOrderState.includes("已派发")||e.isClosed?`当前工单状态为“${e.workOrderState}”，不需要重复派发。下一步看现场回写和复盘关闭状态；AI 只提示门控结果，派发动作必须由值班人员确认。`:e.pendingChecks.length>0?`现在还不能派发工单。派发前还有 ${e.pendingChecks.length} 项人工签核未完成：${t.join("；")}。这些确认完成后，系统才会解锁派发按钮。`:"派发前 4 项人工签核已经完成，可以由值班人员确认是否派发工单。AI 不能替代值长派发，也不能自动停机或登塔。":/关闭|闭环|现场复核/.test(i)?e.isClosed?"本次工单已标记现场复核完成，4 项现场回写已进入复盘样本。后续只保留复盘审核和模型样本校准，不需要再次关闭。":e.workOrderState.includes("已派发")?e.pendingWritebacks.length>0?`现在还不能关闭工单。现场回写还有 ${e.pendingWritebacks.length} 项未完成：${n.join("；")}。全部回写后，关闭按钮才会解锁。`:"4 项现场回写已经确认，可以由运维主管人工关闭本次工单。AI 只说明闭环条件已满足，最终关闭仍需人工确认。":`现在不能关闭工单。当前状态为“${e.workOrderState}”，需要先完成派发前签核并由人工派发，之后才能进行现场回写和关闭。`:s.length===0?`当前闭环状态为“${e.workOrderState}”：签核 ${e.confirmedChecks.length}/${e.totalChecks}，回写 ${e.completedWritebacks.length}/${e.totalWritebacks}，没有未完成门控项。仍需人工完成复盘审核。`:`当前还差 ${s.length} 项：${s.join("；")}。系统只把已签核、已回写的内容纳入 AI 报告，未确认项不会被当成已验证事实。`}function NS(i){const e=Hl(i,"fallback","AI 已读取当前工单门控状态。"),t=Zi(),n=DS(i);return{...e,answerText:n,intent:"workorder",operatorFocus:{decision:t.isClosed?"工单已进入复盘样本":t.summaryState,humanCheck:"派发、关闭、停机、登塔和检修动作必须由值班人员与现场工程师确认。",primaryQuestion:t.pendingWritebacks.length>0?"先完成现场回写":"查看工单确认门",recommendedModule:"workorder",why:"用户问的是当前工单能否进入下一步，这必须读取系统门控状态，而不是重新解释故障原因。"},reportSections:[{body:`人工签核 ${t.confirmedChecks.length}/${t.totalChecks}，现场回写 ${t.completedWritebacks.length}/${t.totalWritebacks}，工单状态：${t.workOrderState}。`,title:"输入数据"},{body:"读取工单签核门、派发状态、现场回写门和复盘样本状态；不把未回写证据当成已验证事实。",title:"模型判据"},{body:n,title:"人工确认"}],riskBoundary:"AI 只解释当前门控状态和下一步人工动作；不能自动派发、关闭、停机、登塔或检修。",title:`${q.turbineId} 工单闭环问答`,toolTrace:[{label:"读取工单状态",output:t.workOrderState,status:"ok",tool:"read_workorder_state"},{label:"读取人工签核门",output:`${t.confirmedChecks.length}/${t.totalChecks}`,status:"ok",tool:"read_confirmation_gates"},{label:"读取现场回写门",output:`${t.completedWritebacks.length}/${t.totalWritebacks}`,status:"ok",tool:"read_writeback_gates"}],voiceText:n.replace(/\n/g," ")}}function US(i,e){const t=i.intent==="workorder",n=i.status==="pending"?"本地证据包已就绪，等待大模型":i.source==="llm"?"MiMo 大模型 + 诊断工具":"本地诊断工具兜底",s=a=>{var o;return((o=i.reportSections.find(l=>l.title.includes(a)))==null?void 0:o.body)??""},r=[{body:s("输入")||"SCADA、CMS、螺栓/结构与气象证据包。",label:"输入数据"},{body:s("模型")||"规则判据、机理反证与 AI 归纳只用于辅助研判。",label:"模型判据"},{body:i.operatorFocus.decision,label:"输出结论"},{body:s("人工")||i.operatorFocus.humanCheck,label:"人工确认"}];return`
    <article class="ai-domain-report agent-report">
      <header>
        <small>${b(n)} / ${b(pf(i.intent))}</small>
        <strong>${b(i.title)}</strong>
        <em>${b(e)}</em>
      </header>

      <section class="agent-answer-card">
        <span>值班答复</span>
        <p>${b(i.answerText)}</p>
      </section>

      ${t?PS():IS()}

      <section class="agent-judgement-strip" aria-label="研判链">
        ${r.map(a=>`
          <article>
            <span>${b(a.label)}</span>
            <p>${b(a.body)}</p>
          </article>
        `).join("")}
      </section>

      <section class="agent-duty-focus">
        <header>
          <span>值班焦点</span>
          <strong>先处理这一步</strong>
        </header>
        <div>
          <article>
            <span>当前判断</span>
            <strong>${b(i.operatorFocus.decision)}</strong>
          </article>
          <article>
            <span>为什么看这里</span>
            <p>${b(i.operatorFocus.why)}</p>
          </article>
          <article>
            <span>人工边界</span>
            <p>${b(i.operatorFocus.humanCheck)}</p>
          </article>
        </div>
        <button type="button" data-agent-open-module="${b(i.operatorFocus.recommendedModule)}">
          ${b(i.operatorFocus.primaryQuestion)}
        </button>
      </section>

      <details class="agent-detail-group agent-evidence-details">
        <summary>展开证据卡（${i.evidenceCards.length}）</summary>
        <section class="agent-evidence-grid" aria-label="证据卡">
          ${i.evidenceCards.map(a=>`
            <button class="agent-evidence-card ${b(a.severity)}" type="button" data-agent-open-module="${b(a.module)}">
              <span>${b(a.title)} · ${b(a.source)}</span>
              <strong>${b(a.value)}</strong>
              <section class="agent-evidence-gate ${b(a.gate.role)}">
                <span>${b(a.gate.label)}</span>
                <strong>${b(a.gate.decision)}</strong>
              </section>
              <section class="agent-evidence-review-chain" aria-label="证据复核步骤">
                <article>
                  <span>输入数据</span>
                  <strong>${b(a.value)}</strong>
                </article>
                <article>
                  <span>模型判据</span>
                  <p>${b(a.interpretation)}</p>
                </article>
                <article>
                  <span>输出结论</span>
                  <p>${b(a.gate.decision)}</p>
                </article>
                <article>
                  <span>人工确认</span>
                  <p>${b(a.gate.humanCheck)}</p>
                </article>
              </section>
              <div><i style="width: ${RS(a.confidence)}"></i><b>${b(a.confidence)}%</b></div>
            </button>
          `).join("")}
        </section>
      </details>

      <details class="agent-detail-group">
        <summary>展开图表联动、BIM 定位与报告正文（${i.chartRefs.length+i.bimHighlights.length} 个联动）</summary>
        <section class="agent-link-grid" aria-label="图表联动">
          <h4>图表联动</h4>
          ${i.chartRefs.map(a=>`
            <button type="button" data-agent-open-module="${b(a.module)}">
              <span>${b(a.label)}</span>
              <strong>${b(a.focus)}</strong>
              <small>${b(a.reason)}</small>
            </button>
          `).join("")}
        </section>

        <section class="agent-link-grid" aria-label="BIM 定位">
          <h4>BIM 定位</h4>
          ${i.bimHighlights.map(a=>`
            <button class="${b(a.severity)}" type="button" data-agent-bim-part="${b(a.part)}">
              <span>${b(a.label)}</span>
              <strong>${b(a.reason)}</strong>
            </button>
          `).join("")}
        </section>

        <section class="agent-handoff-card">
          <span>定位后动作</span>
          <strong>先打开工单人工确认门，不自动派发</strong>
          <p>齿轮箱部件定位只说明疑似对象已收窄；低风速窗口、安全许可、备件工器具和复盘回写责任确认后，才允许派发现场工单。</p>
          <button type="button" data-agent-create-workorder>打开工单确认门</button>
        </section>

        <section class="agent-report-sections">
          ${i.reportSections.map(a=>`
            <article>
              <h4>${b(a.title)}</h4>
              <p>${b(a.body)}</p>
            </article>
          `).join("")}
        </section>
      </details>

      ${t&&i.workOrderDraft?`
        <section class="agent-workorder-card">
          <header>
            <span>${b(i.workOrderDraft.status)}</span>
            <strong>${b(i.workOrderDraft.code)}</strong>
          </header>
          <dl>
            <div><dt>优先级</dt><dd>${b(i.workOrderDraft.priority)}</dd></div>
            <div><dt>责任人</dt><dd>${b(i.workOrderDraft.assignee)}</dd></div>
            <div><dt>对象</dt><dd>${b(i.workOrderDraft.asset)}</dd></div>
            <div><dt>窗口</dt><dd>${b(i.workOrderDraft.dueWindow)}</dd></div>
          </dl>
          <section class="agent-confirmation-gates">
            <h4>派发前确认门</h4>
            ${i.workOrderDraft.confirmationChecks.map(a=>`
              <article>
                <span>${b(a.owner)}</span>
                <strong>${b(a.label)}</strong>
                <p>${b(a.detail)}</p>
              </article>
            `).join("")}
          </section>
          <details class="agent-workorder-steps">
            <summary>展开现场操作步骤（${i.workOrderDraft.steps.length}）</summary>
            <ol>
              ${i.workOrderDraft.steps.map((a,o)=>`
                <li><span>${String(o+1).padStart(2,"0")}</span><strong>${b(a.action)}</strong><small>${b(a.owner)} / ${b(a.output)}</small></li>
              `).join("")}
            </ol>
          </details>
          <details class="agent-workorder-review">
            <summary>展开验收与复盘回写（${i.workOrderDraft.acceptanceCriteria.length+i.workOrderDraft.writebackItems.length}）</summary>
            <div>
              <section>
                <h4>验收标准</h4>
                ${i.workOrderDraft.acceptanceCriteria.map(a=>`<p>${b(a)}</p>`).join("")}
              </section>
              <section>
                <h4>复盘回写</h4>
                ${i.workOrderDraft.writebackItems.map(a=>`<p><strong>${b(a.label)}</strong><span>${b(a.value)}</span></p>`).join("")}
              </section>
            </div>
          </details>
          <button type="button" data-agent-create-workorder>打开工单草案</button>
        </section>
      `:""}

      <details class="agent-detail-group">
        <summary>展开工具轨迹</summary>
        <section class="agent-tool-trace">
          <h4>工具轨迹</h4>
          <ol>
            ${i.toolTrace.map(a=>`
              <li class="${b(a.status)}">
                <span>${b(a.label)}</span>
                <strong>${b(a.output)}</strong>
                <small>${b(a.tool)}</small>
              </li>
            `).join("")}
          </ol>
        </section>
      </details>

      <section class="ai-report-boundary">
        <span>边界说明</span>
        <p>${b(i.riskBoundary)}</p>
      </section>
    </article>
  `}function _f(){const i=q.modules.brief.aiBrief;if(!i)return"值班答复：当前研判未就绪。";const e=i.primaryFinding.includes("齿轮箱")?"齿轮箱 P1 预警":i.primaryFinding,t=i.recommendedAction.replace(/\s+-\s+/g,"到").replace(/内安排/g,"内").replace(/[。；]+$/g,"");return`值班答复：${Sc(q.turbineId)}${e}。${t}，复核前按限载策略运行。`}function za(i){return/(你是谁|你是|你能|能做什么|怎么用|是不是.*假|真假|真的假的|大模型|智能助手|AI|ai|对话|语音|能力|可用)/.test(i)?"capability":/螺栓|叶根|反证|不是/.test(i)?"counter_evidence":/证据|图表|来源|传感器/.test(i)?"evidence_chain":/报告|摘要/.test(i)?"report":/工单|派单|安排/.test(i)?"workorder":/维护|处理|下一步|停机|检修/.test(i)?"maintenance_plan":/(报警|预警|故障|风险|风机|机组|齿轮箱|轴承|叶片|塔筒|山地|运维|诊断|健康|隐患|BIM|bim|GIS|gis)/.test(i)?"explain_alarm":"general_chat"}function xf(i,e){var n,s,r,a,o,l,c,d;const t=Zi();return i==="capability"?{decision:"AI 值班员负责研判、解释和安全导航",humanCheck:"停机、登塔、检修、派发和关闭工单必须人工确认，AI 只能辅助研判和打开对应工作面。",primaryQuestion:"试试：帮我定位齿轮箱",recommendedModule:"brief",why:"用户问的是 AI 是否真实可用，系统应先说明可读取的证据、可执行的导航和不可越权的人工边界。"}:i==="general_chat"?{decision:"普通对话，不强行套用诊断流程",humanCheck:"如果问题转到停机、登塔、检修、派发或关闭工单，仍必须进入人工确认门。",primaryQuestion:"继续追问或切到当前预警",recommendedModule:"brief",why:"用户问的是基础对话问题，系统应直接回答，而不是把所有问题都解释成风机告警。"}:i==="workorder"?t.isClosed?{decision:"本次事件已进入复盘样本",humanCheck:"复盘审核和模型样本标注仍需运维主管确认，AI 不能自动关闭事件。",primaryQuestion:"查看复盘回写",recommendedModule:"workorder",why:"用户问的是工单安排，系统先展示闭环状态，避免重复派发或重复关闭。"}:t.workOrderState.includes("已派发")?{decision:t.summaryState,humanCheck:"现场回写、关闭工单和复盘入库必须由现场工程师与运维主管确认。",primaryQuestion:t.pendingWritebacks.length>0?"查看现场回写门":"查看关闭确认门",recommendedModule:"workorder",why:"工单已经派发，下一步不是继续看图表，而是核对现场证据回写是否满足关闭条件。"}:{decision:`工单派发前签核 ${t.confirmedChecks.length}/${t.totalChecks}`,humanCheck:"低风速窗口、安全许可、备件工器具和复盘责任确认后，才允许值班人员派发。",primaryQuestion:"打开工单确认门",recommendedModule:"workorder",why:"用户问的是现场安排，系统应先进入人工门控，而不是直接给出派发结论。"}:i==="counter_evidence"?{decision:((n=q.modules.bolts.decision)==null?void 0:n.result)??"先排除螺栓/结构反证",humanCheck:((s=q.modules.bolts.decision)==null?void 0:s.confirm)??"结构工程师确认后才排除结构主故障。",primaryQuestion:"先看螺栓/结构反证",recommendedModule:"bolts",why:"用户问的是是否可能不是齿轮箱，先看螺栓、塔筒和山地阵风载荷是否能解释异常。"}:i==="evidence_chain"||i==="report"?{decision:((r=q.modules.fusion.decision)==null?void 0:r.result)??"先复核多源证据是否同向",humanCheck:((a=q.modules.fusion.decision)==null?void 0:a.confirm)??"值班员确认数据质量后，系统结论才进入告警研判。",primaryQuestion:"运行融合判据",recommendedModule:"fusion",why:"用户需要看证据或报告，第一步应先核对 SCADA、CMS、结构监测是否在同一事件窗口内相互支持。"}:i==="maintenance_plan"?{decision:((o=q.modules.maintenance.decision)==null?void 0:o.result)??"先形成预测维护策略",humanCheck:((l=q.modules.maintenance.decision)==null?void 0:l.confirm)??"维护策略必须经过值长、检修班组和安全许可确认。",primaryQuestion:"查看维护策略",recommendedModule:"maintenance",why:"用户问的是处置策略，系统应先展示低风速窗口、备件和风险收益，再进入工单确认。"}:i==="explain_alarm"?{decision:((c=q.modules.alerts.decision)==null?void 0:c.result)??"先看告警成立条件",humanCheck:((d=q.modules.alerts.decision)==null?void 0:d.confirm)??"告警确认后才允许进入工单草案，系统不能自动派发。",primaryQuestion:"打开告警研判",recommendedModule:"alerts",why:"用户问的是为什么报警，先看融合结论如何进入告警等级，避免直接跳到派单。"}:e}function vf(i,e,t="已先展开本地结构化证据包。"){const n=q.modules.brief.aiBrief;if(!n)return`${t} 当前研判未就绪，请重新进入告警研判。`;const s=q.modules.alerts.decision,r=q.modules.cms.decision,a=q.modules.scada.decision,o=q.modules.bolts.decision,l=q.modules.maintenance.decision,c=Zi();if(e.source==="llm"&&e.status==="ok"){if(i==="general_chat"||i==="capability")return e.answerText;const d=xf(i,e.operatorFocus),u=`下一步：${d.primaryQuestion}。${d.why} ${d.humanCheck}`;return e.answerText.includes(d.primaryQuestion)?e.answerText:`${e.answerText}

${u}`}if(i==="workorder"){if(c.isClosed)return`${t} 事件已进入复盘样本，当前不应重复派单。下一步由运维主管复核现场回写、故障标签和模型样本标注，确认后才把本次事件写入复盘库。`;if(c.workOrderState.includes("已派发")){const d=c.pendingWritebacks.length>0?c.pendingWritebacks.join("、"):"关闭确认";return`${t} 工单已经派发，下一步不是继续生成建议，而是现场回写门：${d}。回写完成前不能关闭工单，系统只提示缺口，关闭动作必须人工确认。`}return`${t} 现场安排先进入工单确认门：低风速窗口、安全许可、备件工器具、复盘责任 ${c.totalChecks} 项签核，目前已确认 ${c.confirmedChecks.length} 项。签核未齐前不能派发，系统不自动下发检修命令。`}return i==="evidence_chain"||i==="report"?`${t} 证据链按同一事件窗口复核：SCADA 看功率残差和油温趋势，CMS 看高速轴侧频/齿轮啮合频率，螺栓与结构监测作为反证项，山地气象用于解释阵风载荷。下一步先运行融合判据，确认多源数据是否同向；数据质量未确认前，系统结论不能进入派单。`:i==="counter_evidence"?`${t} 先看反证：${(o==null?void 0:o.result)??"螺栓/结构侧未触发主故障改写"}。如果预紧力衰减、塔筒一阶频率漂移或阵风载荷能解释异常，就需要调整主疑似；如果不能解释，则维持齿轮箱风险判断，只把结构侧作为载荷放大因素跟踪。`:i==="maintenance_plan"?`${t} 处置策略按预测维护执行，不直接跳到停机检修。建议先按 ${(l==null?void 0:l.result)??"低风速窗口复测与限载观察"} 组织：限功率运行、油液取样/内窥检查、CMS 复测和备件准备；若复测证据继续恶化，再由值长人工升级检修级别。`:i==="capability"?`${t} 我能读取当前预警、SCADA/CMS/油温/螺栓结构证据、知识图谱关系链和工单门控状态；也能按你的话打开 SCADA、CMS、融合判据、知识图谱、工单页面，或进入 BIM 定位齿轮箱。边界是停机、登塔、检修、派发和关闭工单必须人工确认。`:i==="general_chat"?e.status==="pending"?"正在调用大模型回答这个普通问题；这里不会强行套用风机告警、证据链或工单流程。":`${t} 普通对话暂时没有拿到大模型回复。你可以稍后重试，也可以切到当前风机预警、SCADA、CMS、BIM 定位或工单门控。`:`${t} 这不是单阈值报警，而是融合判据升级：${(a==null?void 0:a.result)??"SCADA 运行残差异常"}、${(r==null?void 0:r.result)??"CMS 振动特征异常"} 与油温趋势共同指向齿轮箱，${(o==null?void 0:o.result)??"结构侧暂不改写主疑似"}。下一步打开告警研判，确认 ${(s==null?void 0:s.result)??n.primaryFinding} 后再进入隐患排查和工单确认。`}function Uo(i,e){const t=za(e),n=xf(t,i.operatorFocus),s=i.source==="llm"&&i.status==="ok"?vf(t,i):i.answerText;return{...i,answerText:s,operatorFocus:n}}function FS(i){const e=Number(i);return Number.isFinite(e)?e<=1?Math.round(e*100):Math.round(e):80}function OS(i){return/CMS|振动/.test(i)?"cms":/螺栓|结构/.test(i)?"bolts":"scada"}function kS(i){var e;return/CMS|振动/.test(i)?{decision:"支持齿轮箱高速轴轴承定位。",humanCheck:"诊断工程师确认采样质量和转速工况后，才把侧频作为部件定位依据。",label:"支持定位",role:"support"}:/Oil|油温/.test(i)?{decision:"增强润滑/摩擦异常判断。",humanCheck:"结合环境温度、散热状态和同类机组温升后，再作为风险增强证据。",label:"增强判断",role:"amplify"}:/螺栓|结构/.test(i)?{decision:"结构侧作为反证项，不直接派发叶根检修。",humanCheck:((e=q.modules.bolts.decision)==null?void 0:e.confirm)??"结构工程师确认后才排除结构主故障。",label:"结构反证",role:"counter"}:{decision:"支持运行异常成立。",humanCheck:"值班员确认非限电、非通信异常、非人为降载后，才把功率残差作为有效主证据。",label:"支持主故障",role:"support"}}function BS(){const i=q.modules.workorder.ticket;if(i)return{acceptanceCriteria:i.acceptanceCriteria,asset:i.asset,assignee:i.assignee,code:i.draftCode,confirmationChecks:i.confirmationChecks,dueWindow:i.dueWindow,priority:i.priority,safetyRequirement:i.safetyRequirement,status:i.initialState,steps:i.steps,writebackItems:i.writebackItems}}function Hl(i,e,t="已先展开本地结构化证据包，后端大模型答复生成中。"){var d,u,h,f,g,x,m,p,S,E,M,C;const n=q.modules.brief.aiBrief,s=q.modules.alerts,r=q.modules.fusion,a=q.modules.bolts.decision,o=za(i),l=["maintenance_plan","workorder"].includes(o),c=(s.evidenceRows??[]).map(A=>({confidence:FS(A.confidence),gate:kS(A.source),interpretation:`${A.model}；${A.threshold}；${A.window}`,module:OS(A.source),severity:A.source.includes("SCADA")||A.source.includes("CMS")?"alarm":"watch",source:A.source,title:A.label,value:A.value}));return a&&c.push({confidence:72,gate:{decision:"未改写齿轮箱主故障，只作为载荷放大因素跟踪。",humanCheck:a.confirm,label:"结构反证",role:"counter"},interpretation:a.evidence,module:"bolts",severity:"watch",source:"螺栓/结构监测",title:"反证 1",value:a.result}),{answerText:vf(o,{answerText:"",operatorFocus:(n==null?void 0:n.operatorFocus)??{decision:"等待告警研判",humanCheck:"研判恢复前不得形成工程处置结论。",primaryQuestion:"重新进入告警研判",recommendedModule:"brief",why:"当前没有可追踪证据包。"},source:"fallback",status:e},t),bimHighlights:q.componentRisks.map(A=>({label:A.title,part:A.part,reason:`${A.status} / ${Ki(A.module)}`,severity:A.component==="gearbox"?"alarm":"watch"})),chartRefs:[{focus:((d=r.decision)==null?void 0:d.result)??"查看融合判据",label:"融合判据",module:"fusion",reason:((u=r.decision)==null?void 0:u.evidence)??"先确认多源证据是否同向。"},{focus:((h=q.modules.scada.decision)==null?void 0:h.result)??"查看运行残差",label:"SCADA",module:"scada",reason:((f=q.modules.scada.decision)==null?void 0:f.confirm)??"确认非限电、非通信异常。"},{focus:((g=q.modules.cms.decision)==null?void 0:g.result)??"查看振动证据",label:"CMS",module:"cms",reason:((x=q.modules.cms.decision)==null?void 0:x.confirm)??"确认采样质量和转速工况。"},{focus:((m=q.modules.bolts.decision)==null?void 0:m.result)??"查看结构反证",label:"螺栓/结构",module:"bolts",reason:((p=q.modules.bolts.decision)==null?void 0:p.confirm)??"确认结构侧是否改写主故障。"}],evidenceCards:c,intent:o,operatorFocus:(n==null?void 0:n.operatorFocus)??{decision:"等待告警研判",humanCheck:"研判恢复前不得形成工程处置结论。",primaryQuestion:"重新进入告警研判",recommendedModule:"brief",why:"当前没有可追踪证据包。"},reportSections:[{body:((S=r.decision)==null?void 0:S.input)??"等待多源证据接入。",title:"输入数据"},{body:((E=r.decision)==null?void 0:E.model)??"等待模型判据。",title:"模型判据"},{body:((M=r.decision)==null?void 0:M.confirm)??"停机、登塔、检修和派单必须人工确认。",title:"人工确认"}],riskBoundary:"本地证据包只用于等待大模型期间的值班复核；停机、登塔、检修和派单必须人工确认。",source:"fallback",status:e,title:`${q.turbineId} 值班研判`,toolTrace:[{label:"读取当前事件",output:q.eventCode,status:"ok",tool:"frontend_event_context"},{label:"展开结构化证据",output:`${((C=s.evidenceRows)==null?void 0:C.length)??0} 张证据卡`,status:"ok",tool:"frontend_evidence_bundle"},{label:"请求后端 Agent",output:e==="pending"?"等待大模型答复":t,status:"review",tool:"agent_ask"}],voiceText:_f(),workOrderDraft:l?BS():void 0}}function Fo(i){af(i||_f(),{onError:()=>Et("AI 已生成文字答复，浏览器语音未启动"),onStart:()=>Et("AI 正在播报处置结论"),onUnsupported:()=>Et("当前浏览器不支持语音播报，已保留文字答复")},1.28)}async function pr(i="生成当前风险诊断摘要",e={}){if(!q.modules.brief.aiBrief)return;const n=ia+1;if(ia=n,LS(i)){const o=NS(i);return oa(o,i,e.actionMessage??_a(i)),Gt("ready","已读取工单门控状态"),Et("AI 已基于当前工单门控状态生成回答"),e.speak&&Fo(o.voiceText),o}const s=Fn,r=za(i),a=Uo(Hl(i,"pending"),i);si(!0),Gt("thinking",r==="general_chat"?"正在调用大模型回答":"正在调用后端 Agent"),oa(a,i,e.actionMessage),Et(r==="general_chat"?"AI 正在回答普通对话":"AI 已先展开本地证据包，等待大模型答复"),r!=="general_chat"&&zt("evidence-review");try{const o=await fetch("/api/agent/ask",{body:JSON.stringify({caseId:Fn,question:i,turbineId:q.turbineId}),headers:{"Content-Type":"application/json"},method:"POST"});if(!o.ok)throw new Error("Agent request failed");const l=await o.json();if(s!==Fn||n!==ia)return l;const c=Uo(l,i);return oa(c,i,e.actionMessage??_a(i)),Gt(c.source==="llm"?"ready":"fallback",c.source==="llm"?c.intent==="general_chat"?"大模型已完成回答":"大模型已完成研判":"已使用本地规则兜底"),e.speak&&Fo(c.voiceText),c}catch{const o=Uo(Hl(i,"fallback","后端智能服务暂未返回，已保留本地规则研判。"),i);return s!==Fn||n!==ia||(oa(o,i,e.actionMessage??_a(i)),Gt("fallback","后端未返回，已使用本地规则兜底"),e.speak&&Fo()),o}}function zS(){const i=window;return i.SpeechRecognition??i.webkitSpeechRecognition}function bf(){var r;const i=((r=q.modules.brief.aiBrief)==null?void 0:r.operatorQuestions[0])??"为什么判定为齿轮箱风险？",e=zS();if(!e){cr(`当前浏览器暂不支持语音识别，已改用快捷追问：${i}`),si(!0),Gt("fallback","当前浏览器不支持语音识别"),Et("AI 语音识别不可用，已使用快捷追问继续诊断"),pr(i,{speak:!0});return}gs==null||gs.abort();const t=new e;let n=!1;const s=a=>{n||(n=!0,gs=void 0,ff(a),cr(`已听到：${a}
AI 正在生成回答...`),pr(a,{speak:!0}))};t.lang="zh-CN",t.continuous=!1,t.interimResults=!1,t.maxAlternatives=1,t.onresult=a=>{var o,l,c;s(((c=(l=(o=a.results[0])==null?void 0:o[0])==null?void 0:l.transcript)==null?void 0:c.trim())||i)},t.onerror=()=>{s(i)},t.onend=()=>{n||s(i)},gs=t,si(!0),Gt("listening","正在听取语音追问"),cr("正在听取语音追问，可以问：为什么报警？下一步怎么处理？"),Et("AI 正在听取运维追问");try{t.start()}catch{gs=void 0,cr(`语音识别未能启动，已改用快捷追问：${i}`),Gt("fallback","语音识别未启动，已改用快捷追问"),pr(i,{speak:!0})}}function xu(){var t;const i=cf(),e=(i==null?void 0:i.value.trim())||((t=df())==null?void 0:t.value.trim())||"下一步工单应该怎么安排？";fr(e,{speak:!0})}function GS(){if(Vt.dataset.mode="intro",delete Vt.dataset.workspace,Ws("none"),Vi){Ot().stopWarning(),Vi=!1;const i=document.querySelector("#bim-warning");i&&(i.textContent="告警闪烁")}if(ki){Ot().compose(),ki=!1;const i=document.querySelector("#bim-toggle-decompose");i&&(i.textContent="拆解模型",i.dataset.state="composed")}}fy({container:Vh,config:Ul,onIntroComplete:gu,onTurbineSelected:zl}).then(i=>{var e,t,n;(e=document.querySelector("#close-bim"))==null||e.addEventListener("click",()=>{GS(),i.showMountainOverview()}),(t=document.querySelector("#open-manager-workspace"))==null||t.addEventListener("click",()=>{Er(Vt.dataset.managerPage??"event","已打开管理工作台")}),(n=document.querySelector("#ai-duty-open"))==null||n.addEventListener("click",()=>{const s=Gl();i.focusTurbine(q.turbineId),i.showTurbineAlert(q.turbineId),zl(s,"brief"),Et("已进入单机 BIM 诊断，请先确认疑似部件位置")}),window.setTimeout(()=>{Fs||Vt.dataset.mode==="bim"||(i.showTurbineAlert(q.turbineId),gu(Gl()))},5200)});function qs(){var e,t;const i=q.modules.workorder.ticket;return((t=(e=document.querySelector("#workorder-state"))==null?void 0:e.textContent)==null?void 0:t.trim())??(i==null?void 0:i.initialState)??"待生成"}function yf(i=qs()){return i!=="待生成"}function Sf(i=qs()){return i.includes("已派发")||i.includes("现场复核完成")}function Mf(i=qs()){return i.includes("现场复核完成")}function Tr(i=q.statuses.ticketCreated){const e=q.modules.workorder.ticket,t=document.querySelector("#workorder-state"),n=document.querySelector("#workorder-code"),s=document.querySelector("[data-dispatch-workorder]"),r=document.querySelector("[data-close-workorder]"),a=qs();if(yf(a)){ti("workorder",i),Vl(),Sr(),ks();return}t&&(t.textContent=(e==null?void 0:e.generatedState)??"已生成"),n&&(n.textContent=(e==null?void 0:e.finalCode)??"WO-GX-20260621-02"),document.querySelectorAll("[data-workorder-confirm]").forEach(o=>{o.disabled=!1}),s&&(s.disabled=!Ec(),s.textContent=(e==null?void 0:e.dispatchActionLabel)??"确认派发工单"),r&&(r.disabled=!0),document.querySelectorAll("[data-workorder-writeback]").forEach(o=>{o.checked=!1,o.disabled=!0}),zt("human-confirm"),ti("workorder",i),Vl(),Sr(),ks()}function Ec(){const i=Array.from(document.querySelectorAll("[data-workorder-confirm]"));return i.length>0&&i.every(e=>e.checked)}function Ef(){const i=document.querySelector("[data-workorder-blocker]"),e=document.querySelector("[data-workorder-next-action]"),t=document.querySelector("[data-workorder-human-boundary]");if(!i||!e||!t)return;const n=qs(),r=Array.from(document.querySelectorAll("[data-workorder-confirm]")).filter(c=>!c.checked),a=Array.from(document.querySelectorAll("[data-workorder-writeback]")),o=a.filter(c=>!c.checked),l=a.some(c=>!c.disabled);if(Mf(n)){i.textContent="工单已关闭，等待复盘审核",e.textContent="复核样本标签与现场记录",t.textContent="模型样本入库仍需运维主管确认";return}if(Sf(n)){i.textContent=o.length>0?`现场回写缺 ${o.length} 项`:"回写已齐，可关闭工单",e.textContent=o.length>0?"上传油液、内窥、CMS 复测和样本标签":"由运维主管执行关闭确认",t.textContent="未回写项不能作为 AI 样本事实";return}if(yf(n)){i.textContent=r.length>0?`派发前签核缺 ${r.length} 项`:"签核已齐，可人工派发",e.textContent=r.length>0?"逐项确认窗口、许可、备件与复盘责任":"由值班长确认派发工单",t.textContent="AI 不能自动派发或触发停机登塔";return}i.textContent=l?"等待现场回写":"等待生成工单草案",e.textContent="从告警研判或预测维护模块进入工单确认门",t.textContent="派发、关闭、停机、登塔必须人工确认"}function Vl(){const i=document.querySelector("[data-dispatch-workorder]");if(!i)return;const e=q.modules.workorder.ticket,t=qs(),n=Sf(t);Array.from(document.querySelectorAll("[data-workorder-confirm]")).forEach(r=>{const a=r.closest(".workorder-confirm"),o=a==null?void 0:a.querySelector("[data-workorder-confirm-state]"),l=r.checked;a&&(a.dataset.state=l?"confirmed":"pending"),o&&(o.textContent=l?"已签核":"待签核")}),n?(i.disabled=!0,i.textContent=t.includes("现场复核完成")?(e==null?void 0:e.closedActionLabel)??"现场复核已完成":"工单已派发"):(i.disabled=!Ec(),i.textContent=(e==null?void 0:e.dispatchActionLabel)??"确认派发工单"),Ef(),ks()}function HS(){const i=q.modules.workorder.ticket,e=document.querySelector("#workorder-state"),t=document.querySelector("[data-dispatch-workorder]"),n=document.querySelector("[data-close-workorder]");if(!Ec()){Et("工单仍有人工确认项未完成，暂不能派发");return}e&&(e.textContent=(i==null?void 0:i.dispatchedState)??"已派发待现场复核"),document.querySelectorAll("[data-workorder-confirm]").forEach(s=>{s.disabled=!0}),t&&(t.textContent="工单已派发",t.disabled=!0),n&&(n.disabled=!0),document.querySelectorAll("[data-workorder-writeback]").forEach(s=>{s.disabled=!1}),Sr(),ks(),zt("workorder-draft"),Et("工单已通过人工确认并派发，等待现场复核回写")}const VS=["铁谱/颗粒度报告已上传","高速轴轴承与齿面照片已归档","复测频谱已形成对比结论","已写入 AI 诊断样本"];function Tf(){const i=Array.from(document.querySelectorAll("[data-workorder-writeback]"));return i.length>0&&i.every(e=>e.checked)}function Sr(){const i=q.modules.workorder.ticket,e=Array.from(document.querySelectorAll("[data-workorder-writeback]")),t=document.querySelector("[data-close-workorder]"),n=document.querySelector("[data-writeback-summary-state]"),s=document.querySelector("[data-writeback-summary-note]"),r=Mf(),a=e.some(c=>!c.disabled),o=e.filter(c=>c.checked).length,l=Tf();e.forEach((c,d)=>{var E;const u=c.closest("[data-writeback-summary-item]"),h=u==null?void 0:u.querySelector("[data-workorder-writeback-state]"),f=u==null?void 0:u.querySelector("strong"),g=document.querySelectorAll("[data-writeback-item]")[d],x=g==null?void 0:g.querySelector("small"),m=((E=i==null?void 0:i.writebackItems[d])==null?void 0:E.value)??"待现场回写",p=VS[d]??"已回写",S=c.checked;u&&(u.dataset.writebackSummaryItem=S?"done":"pending"),h&&(h.textContent=S?"已回写":a?"待回写":"待派发"),f&&(f.textContent=S?p:m),g&&(g.dataset.status=S?"done":"pending"),x&&(x.textContent=S?p:m)}),n&&(n.textContent=r?(i==null?void 0:i.closedState)??"现场复核完成":l?"回写已确认，可关闭工单":a?`现场回写待确认 ${e.length-o} 项`:"待现场完成后回写"),s&&(s.textContent=r?q.statuses.ticketClosed:l?"油液、内窥照片、CMS 复测和 AI 样本标签均已回写，允许人工关闭本次事件。":a?"现场复核完成后逐项回写证据；未完成回写前，AI 诊断记录不能闭环。":"回写完成后，事件会进入复盘样本，AI 诊断记录才允许闭环。"),t&&(t.disabled=r||!l,r&&(t.textContent=(i==null?void 0:i.closedActionLabel)??"现场复核已完成")),Ef(),ks()}function $S(){const i=q.modules.workorder.ticket,e=document.querySelector("[data-writeback-summary-state]"),t=document.querySelector("[data-writeback-summary-note]"),n=document.querySelector("[data-close-workorder]");document.querySelectorAll("[data-workorder-writeback]").forEach(s=>{s.disabled=!0}),Sr(),e&&(e.textContent=(i==null?void 0:i.closedState)??"现场复核完成"),t&&(t.textContent=q.statuses.ticketClosed),n&&(n.disabled=!0),ks()}function Af(i){i.querySelectorAll("[data-agent-open-module]").forEach(e=>{e.addEventListener("click",()=>{const t=Es(e.dataset.agentOpenModule);t&&(En(t),ti(t,`AI 已打开${Ki(t)}证据`),Xi(),zt(t==="workorder"?"workorder-draft":"evidence-review"),["scada","cms","bolts","alerts","workorder"].includes(t)&&(Ti(t==="bolts"?"blade-root":"gearbox"),Ot().focusPart(t==="bolts"?"blade":"gearbox")))})}),i.querySelectorAll("[data-agent-bim-part]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.agentBimPart;t&&(En("alerts"),qi(),t==="gearbox"&&Os("alerts"),zt("bim-location"),Ot().focusPart(t))})}),i.querySelectorAll("[data-agent-create-workorder]").forEach(e=>{e.addEventListener("click",()=>{En("workorder"),Tr("AI 已从 BIM 定位进入工单确认门：等待值长与现场工程师确认")})}),i.querySelectorAll("[data-global-ai-open-page]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.globalAiOpenPage;if(!Ts(t))return;const n=wi.get(t);En((n==null?void 0:n.module)??"fusion"),Er(t,`AI 已打开${(n==null?void 0:n.label)??"详情页"}，请复核输入、模型和结论`),si(!0),Gt("ready",`已打开${(n==null?void 0:n.label)??"详情页"}`)})})}function WS(){var i,e,t,n;Pe.orb.addEventListener("click",()=>{if(Ra){Ra=!1,Gi&&(window.clearTimeout(Gi),Gi=void 0);return}si(Pe.shell.dataset.open!=="true")}),Pe.orb.addEventListener("pointerdown",bS),window.addEventListener("pointermove",yS),window.addEventListener("pointerup",_u),window.addEventListener("pointercancel",_u),Pe.orb.addEventListener("mousedown",SS),window.addEventListener("mousemove",MS),window.addEventListener("mouseup",ES),window.addEventListener("resize",()=>{if(Pe.shell.dataset.dragged!=="true")return;const s=Pe.shell.getBoundingClientRect();Xs(s.left,s.top,!0)}),(i=document.querySelector("#global-ai-close"))==null||i.addEventListener("click",()=>{si(!1)}),Pe.panel.querySelectorAll("[data-global-ai-question]").forEach(s=>{s.addEventListener("click",()=>{fr(s.dataset.globalAiQuestion??"为什么报警？")})}),(e=Pe.panel.querySelector("[data-global-ai-send]"))==null||e.addEventListener("click",()=>{fr(Pe.input.value)}),Pe.input.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),fr(Pe.input.value))}),(t=Pe.panel.querySelector("[data-global-ai-voice]"))==null||t.addEventListener("click",()=>{bf()}),Pe.panel.querySelectorAll("[data-global-ai-open-page]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.globalAiOpenPage;if(!Ts(r))return;const a=wi.get(r);En((a==null?void 0:a.module)??"fusion"),Er(r,`AI 已打开${(a==null?void 0:a.label)??"管理页面"}，请复核输入、模型和结论`),si(!0),Gt("ready",`已打开${(a==null?void 0:a.label)??"管理页面"}`)})}),Pe.panel.querySelectorAll("[data-global-ai-focus-part]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.globalAiFocusPart;r&&(En("alerts"),qi(),zt("bim-location"),r==="gearbox"&&Os("alerts"),Ot().focusPart(r),Gt("ready","已进入 BIM 部件定位"))})}),(n=Pe.panel.querySelector("[data-global-ai-workorder]"))==null||n.addEventListener("click",()=>{En("workorder"),Tr("AI 已打开工单确认门：请人工核对安全窗口、备件和责任人"),Xi(),Gt("ready","已打开工单人工确认门")})}function Bt(i,e){var n;const t=Ye.querySelector(`[data-analysis-param="${i}-${e}"]`);return((n=t==null?void 0:t.value)==null?void 0:n.trim())??""}function wf(i){return!!(i&&["cms","fusion","health","maintenance","scada","structure"].includes(i))}function XS(i){return Array.from(Ye.querySelectorAll(`[data-analysis-param^="${i}-"]`)).map((e,t)=>{var n,s,r;return{label:((r=(s=(n=e.closest("label"))==null?void 0:n.querySelector("span"))==null?void 0:s.textContent)==null?void 0:r.trim())||`参数 ${t+1}`,value:e.value.trim()}})}function Cf(i,e){var r;const t=_c(e),n=i.status==="adopted"?"已写入当前事件":t.completeLabel,s=(r=i.diagnostics)!=null&&r.length?`
      <section class="analysis-diagnostics" aria-label="本次计算指标">
        ${i.diagnostics.map(a=>`
          <article data-status="${b(a.status)}">
            <span>${b(a.label)}</span>
            <strong>${b(a.value)}${a.unit?` ${b(a.unit)}`:""}</strong>
            <small>${b(a.note)}</small>
          </article>
        `).join("")}
      </section>
    `:"";return`
    <header>
      <span>${b(n)}</span>
      <strong>${b(i.id)}</strong>
    </header>
    <dl>
      <div><dt>输入</dt><dd>${b(i.inputSummary)}</dd></div>
      <div><dt>模型</dt><dd>${b(i.model)}</dd></div>
      <div><dt>结论</dt><dd>${b(i.conclusion)}</dd></div>
      <div><dt>下一步</dt><dd>${b(i.nextAction)}</dd></div>
      <div><dt>人工边界</dt><dd>${b(i.humanBoundary)}</dd></div>
    </dl>
    ${s}
  `}function qS(i,e){var t,n,s;return i==="scada"&&((t=e.chart)!=null&&t.scadaChart)?xc(e.chart.scadaChart):i==="cms"&&((n=e.chart)!=null&&n.cmsChart)?vc(e.chart.cmsChart):i==="structure"&&((s=e.chart)!=null&&s.boltChart)?bc(e.chart.boltChart):""}function Rf(i,e){const t=qS(i,e);if(!t)return;const n=Ye.querySelector(`[data-management-page="${i}"]`),s=n==null?void 0:n.querySelector(".engineering-chart");s&&(s.outerHTML=t)}function Pa(i){var e,t,n,s,r;if(i==="health"){const a=wh(q),o=a.componentScores.filter(l=>l.level===1&&l.status!=="normal").map(l=>l.label).join("、");return`已按“${Bt("health",0)}”复算：综合健康 ${a.overallScore}，关注系统 ${o||"无"}；广谱筛查范围为 ${Bt("health",1)}，数据边界口径为 ${Bt("health",2)}。`}if(i==="scada"){const a=Number(Bt("scada",1)||"8"),o=q.modules.scada.scadaChart,l=(o==null?void 0:o.points.filter(c=>c.residualPct>=a).length)??0;return`已按 ${Bt("scada",0)}、${Bt("scada",2)} 复算：功率残差阈值 ${a}% 下，异常窗口 ${l}/${(o==null?void 0:o.points.length)??0}，结论 ${((e=q.modules.scada.decision)==null?void 0:e.result)??"等待人工复核"}。`}if(i==="cms"){const a=Number(Bt("cms",1)||"1.2"),o=q.modules.cms.cmsChart,l=(o==null?void 0:o.peaks.filter(c=>c.amplitude>=a).length)??0;return`已按 ${Bt("cms",0)} 与 ${Bt("cms",2)} 复算：超过 ${a} mm/s 的峰值 ${l} 个，结论 ${((t=q.modules.cms.decision)==null?void 0:t.result)??"等待人工复核"}。`}if(i==="structure"){const a=Number(Bt("structure",1)||"8"),o=q.modules.bolts.boltChart,l=(o==null?void 0:o.channels.filter(c=>c.relaxationPct>=a).length)??0;return`已按温漂补偿=${Bt("structure",0)} 复算：松弛阈值 ${a}% 下，关注通道 ${l}/${(o==null?void 0:o.channels.length)??0}，结构侧角色为 ${Bt("structure",2)}。`}if(i==="fusion"){const a=((n=q.modules.fusion.modelGates)==null?void 0:n.filter(o=>o.status==="pass").length)??0;return`已按“${Bt("fusion",0)}”复算融合门控：通过 ${a}/${((s=q.modules.fusion.modelGates)==null?void 0:s.length)??0} 层，最低置信度 ${Bt("fusion",1)}%，结论 ${((r=q.modules.fusion.decision)==null?void 0:r.result)??"等待融合"}。`}if(i==="maintenance")return`已按策略“${Bt("maintenance",0)}”刷新维护计划：最低低风速窗口 ${Bt("maintenance",1)} h，备件状态 ${Bt("maintenance",2)}，仍需人工确认窗口、许可、资源与回写责任。`;if(i==="workorders"){const a=Zi();return`已刷新工单签核状态：人工签核 ${a.confirmedChecks.length}/${a.totalChecks}，现场回写 ${a.completedWritebacks.length}/${a.totalWritebacks}；未满足门控前不能派发或关闭。`}return"已刷新当前页面记录。"}async function jS(i){const e=await fetch("/api/analysis/run",{body:JSON.stringify({caseId:Fn,pageKey:i,parameters:XS(i)}),headers:{"Content-Type":"application/json"},method:"POST"});if(!e.ok)throw new Error("Analysis run failed");return e.json()}async function YS(i,e){const t=await fetch("/api/analysis/adopt",{body:JSON.stringify({caseId:Fn,pageKey:i,runId:e}),headers:{"Content-Type":"application/json"},method:"POST"});if(!t.ok)throw new Error("Evidence adoption failed");return t.json()}async function KS(i){const e=Ye.querySelector(`[data-analysis-result="${i}"]`);if(!e)return;const t=_c(i);if(!wf(i)){e.textContent=Pa(i),e.dataset.state="computed",Et(t.statusText);return}e.textContent=t.loadingText,e.dataset.state="loading";try{const n=await jS(i);e.innerHTML=Cf(n,i),e.dataset.runId=n.id,Rf(i,n)}catch{e.textContent=`${Pa(i)} 后端记录暂不可用，当前仅为本地兜底结果。`}e.dataset.state="computed",Et(t.statusText)}async function ZS(i){var t;const e=Ye.querySelector(`[data-analysis-result="${i}"]`);if(e){if(!wf(i)){e.textContent=`${Pa(i)} 已采纳为 ${q.eventCode} 的当前证据记录，等待人工复核签字。`,e.dataset.state="adopted";return}e.textContent="正在写入当前事件证据记录...",e.dataset.state="loading";try{const n=await YS(i,e.dataset.runId);e.innerHTML=Cf(n,i),e.dataset.runId=n.id,Rf(i,n)}catch{e.textContent=`${Pa(i)} 后端采纳暂不可用，当前仅为本地兜底记录。`}e.dataset.state="adopted",zt("evidence-review"),Et(`${((t=wi.get(i))==null?void 0:t.label)??"证据"}已采纳到当前事件`)}}function JS(i){const e=Ch(q),t=e.nodes.find(a=>a.id===i)??e.nodes.find(a=>a.id==="gearbox-bearing")??e.nodes[0],n=Ye.querySelector("[data-kg-detail-title]"),s=Ye.querySelector("[data-kg-detail]"),r=Ye.querySelector("[data-kg-detail-evidence]");n&&(n.textContent=t.label),s&&(s.textContent=t.summary),r&&(r.textContent=t.evidence??`${t.type} / ${Lh(t.status)}`),Ye.querySelectorAll("[data-kg-node]").forEach(a=>{a.classList.toggle("active",a.dataset.kgNode===i)})}function Pf(){var i,e,t,n,s,r,a;Ye.querySelectorAll("[data-manager-page-button]").forEach(o=>{o.addEventListener("click",()=>{var c;const l=o.dataset.managerPageButton;Ts(l)&&Er(l,`已打开${((c=wi.get(l))==null?void 0:c.label)??"管理端页面"}`)})}),(i=Ye.querySelector("[data-close-manager-workspace]"))==null||i.addEventListener("click",()=>{qi(),Et("已返回 BIM 部件定位视图")}),Ye.querySelectorAll("[data-run-analysis]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.runAnalysis;Ts(l)&&KS(l)})}),Ye.querySelectorAll("[data-adopt-evidence]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.adoptEvidence;Ts(l)&&ZS(l)})}),Ye.querySelectorAll("[data-kg-node]").forEach(o=>{o.addEventListener("click",()=>{JS(o.dataset.kgNode??"gearbox")})}),Qh.querySelectorAll(".component").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.component??"";Ti(l);const c=o.dataset.bimPart;if(l==="gearbox"){const u=Es(o.dataset.module)??"alerts";c?Ot().focusPart(c).then(()=>{zt("bim-location"),ti(u,q.statuses.componentEntry)}):(zt("bim-location"),ti(u,q.statuses.componentEntry));return}c&&Ot().focusPart(c);const d=Es(o.dataset.module);d&&ti(d)})}),Ye.querySelectorAll("[data-open-module]").forEach(o=>{o.addEventListener("click",()=>{const l=Es(o.dataset.openModule);if(!l)return;ti(l),Xi(),zt(l==="workorder"?"workorder-draft":"evidence-review");const c=o.dataset.bimPart;if(c){const d=c==="gearbox"?"gearbox":"";d&&Ti(d),Ot().focusPart(c);return}["scada","cms","alerts","inspection","maintenance","workorder"].includes(l)&&(Ti("gearbox"),Ot().focusPart("gearbox"))})}),Ye.querySelectorAll("[data-ai-question]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.aiQuestion??"查看证据链";fr(l)})}),Ye.querySelectorAll("[data-ai-generate-report]").forEach(o=>{o.addEventListener("click",()=>{si(!0),pr()})}),(e=Ye.querySelector("[data-ai-voice-question]"))==null||e.addEventListener("click",()=>{bf()}),(t=Ye.querySelector("[data-ai-send-question]"))==null||t.addEventListener("click",()=>{xu()}),(n=Ye.querySelector("#ai-question-input"))==null||n.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),xu())}),(s=Ye.querySelector("[data-create-workorder]"))==null||s.addEventListener("click",()=>{Tr()}),Ye.querySelectorAll("[data-workorder-confirm]").forEach(o=>{o.addEventListener("change",()=>{Vl()})}),(r=Ye.querySelector("[data-dispatch-workorder]"))==null||r.addEventListener("click",()=>{HS()}),Ye.querySelectorAll("[data-workorder-writeback]").forEach(o=>{o.addEventListener("change",()=>{Sr()})}),(a=Ye.querySelector("[data-close-workorder]"))==null||a.addEventListener("click",()=>{const o=q.modules.workorder.ticket,l=document.querySelector("[data-close-workorder]"),c=document.querySelector("#workorder-state"),d=document.querySelector("#workorder-code");if(!Tf()){Et("现场复核回写仍有未完成项，暂不能关闭工单");return}c&&(c.textContent=(o==null?void 0:o.closedState)??"现场复核完成"),d&&(d.textContent=(o==null?void 0:o.finalCode)??"WO-GX-20260621-02"),l&&(l.textContent=(o==null?void 0:o.closedActionLabel)??"现场复核已完成",l.disabled=!0),$S(),zt("review-writeback"),Et(q.statuses.ticketClosed)})}Pf();lf();kl.addEventListener("change",()=>{sf(kl.value)});document.querySelectorAll(".part-label[data-bim-part]").forEach(i=>{i.addEventListener("click",()=>{const e=i.dataset.bimPart;if(e==="gearbox"){Ot().focusPart(e).then(()=>Os("alerts"));return}e&&(zt("bim-location"),Ot().focusPart(e))})});document.querySelectorAll(".module-tab").forEach(i=>{i.addEventListener("click",()=>{const e=Es(i.dataset.module)??"health";if(e==="workorder"){Tr(),Xi();return}Ws(e),Xi(),["fusion","scada","cms","bolts","alerts","inspection","maintenance"].includes(e)&&zt(e==="alerts"?"bim-location":"evidence-review")})});var yu;(yu=document.querySelector("#ai-duty-speak"))==null||yu.addEventListener("click",()=>{Fs=!0,of(!0)});var Su;(Su=document.querySelector("#bim-toggle-decompose"))==null||Su.addEventListener("click",i=>{const e=i.currentTarget;if(!(e instanceof HTMLButtonElement))return;(ki?Ot().compose():Ot().decompose()).then(()=>{ki=!ki,e.textContent=ki?"复原模型":"拆解模型",e.dataset.state=ki?"decomposed":"composed"})});var Mu;(Mu=document.querySelector("#bim-warning"))==null||Mu.addEventListener("click",i=>{const e=i.currentTarget;e instanceof HTMLButtonElement&&(Vi=Ot().toggleWarning(),e.textContent=Vi?"停止告警":"告警闪烁")});
