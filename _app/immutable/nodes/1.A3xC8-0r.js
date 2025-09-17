import{i as O}from"../chunks/BeKq9_lX.js";import{s as C,i as Ie,d as p,b as Se}from"../chunks/DfkzFbBA.js";import{f as N,g as k,i as f,aY as Re,V as Fe,W as He,X as W,Y as Le,j as _,Z as Oe,k as T,a2 as x,_ as We,l as i,s as l,y as e,x as $,z as w,u as a,$ as qe,m as n,n as q,a0 as I,F as De}from"../chunks/DdvI_B30.js";import{c as ge}from"../chunks/BOVqB-bG.js";import{b as re}from"../chunks/DIZsbuz4.js";import{l as j,s as A,a as Ee,b as Ve}from"../chunks/Dyy8wEAt.js";import{s as Xe}from"../chunks/Bc6U3k0k.js";import{g as Ye}from"../chunks/CH_iu5NA.js";import{H as Ue,C as te}from"../chunks/yW5TdxCa.js";import{I as P}from"../chunks/Bom15cto.js";import{T as Ze}from"../chunks/Tq2RnBhJ.js";const Je=()=>{const d=Xe;return{page:{subscribe:d.page.subscribe},navigating:{subscribe:d.navigating.subscribe},updated:d.updated}},Ge={subscribe(d){return Je().page.subscribe(d)}};function Ke(d,c){const h=j(c,["children","$$slots","$$events","$$legacy"]),b=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];P(d,A({name:"arrow-left"},()=>h,{get iconNode(){return b},children:(u,y)=>{var s=N(),g=k(s);C(g,c,"default",{}),f(u,s)},$$slots:{default:!0}}))}function Qe(d,c){const h=j(c,["children","$$slots","$$events","$$legacy"]),b=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];P(d,A({name:"mail"},()=>h,{get iconNode(){return b},children:(u,y)=>{var s=N(),g=k(s);C(g,c,"default",{}),f(u,s)},$$slots:{default:!0}}))}function er(d,c){const h=j(c,["children","$$slots","$$events","$$legacy"]),b=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]];P(d,A({name:"phone"},()=>h,{get iconNode(){return b},children:(u,y)=>{var s=N(),g=k(s);C(g,c,"default",{}),f(u,s)},$$slots:{default:!0}}))}function rr(d,c){const h=j(c,["children","$$slots","$$events","$$legacy"]),b=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];P(d,A({name:"refresh-cw"},()=>h,{get iconNode(){return b},children:(u,y)=>{var s=N(),g=k(s);C(g,c,"default",{}),f(u,s)},$$slots:{default:!0}}))}function tr(d,c){const h=j(c,["children","$$slots","$$events","$$legacy"]),b=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18"}]];P(d,A({name:"server"},()=>h,{get iconNode(){return b},children:(u,y)=>{var s=N(),g=k(s);C(g,c,"default",{}),f(u,s)},$$slots:{default:!0}}))}function or(d,c){const h=j(c,["children","$$slots","$$events","$$legacy"]),b=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];P(d,A({name:"shield"},()=>h,{get iconNode(){return b},children:(u,y)=>{var s=N(),g=k(s);C(g,c,"default",{}),f(u,s)},$$slots:{default:!0}}))}const ar=()=>{window.location.reload()};var sr=_(`<style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
    
    .architectural-grid {
      background-image: 
        linear-gradient(rgba(86, 170, 183, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(86, 170, 183, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: grid-move 20s linear infinite;
    }
    
    @keyframes grid-move {
      0% { background-position: 0 0; }
      100% { background-position: 50px 50px; }
    }
    
    .blueprint-line {
      background: linear-gradient(90deg, transparent, var(--line-color, rgba(86, 170, 183, 0.3)), transparent);
      height: 1px;
      position: absolute;
      width: 100%;
    }
    
    .error-number {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: clamp(100px, 20vw, 200px);
      line-height: 0.8;
      color: transparent;
      -webkit-text-stroke: 2px var(--error-color);
      text-stroke: 2px var(--error-color);
      position: relative;
    }
    
    .error-number::before {
      content: attr(data-number);
      position: absolute;
      top: 0;
      left: 0;
      color: var(--error-color);
      opacity: 0.1;
      -webkit-text-stroke: 0;
      text-stroke: 0;
      z-index: -1;
    }
    
    .icon-decoration {
      position: absolute;
      opacity: 0.05;
      animation: rotate-slow 30s linear infinite;
    }
    
    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .pulse-icon {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }</style>`),ir=_('<div class="icon-decoration top-10 right-10"><!></div> <div class="icon-decoration bottom-10 left-10" style="animation-delay: -15s;"><!></div>',1),nr=_('<div class="icon-decoration top-10 right-10 pulse-icon"><!></div>'),lr=_('<div class="mt-4 p-4 bg-gray-50 rounded-lg max-w-md mx-auto"><p class="text-sm text-gray-500 font-mono break-words"> </p></div>'),cr=_('<a href="/projects" class="hover-lift group flex items-center gap-3 px-8 py-4 border-2 rounded-full font-medium transition-all duration-300"><span>View Our Projects</span> <!></a>'),dr=_('<button class="hover-lift group flex items-center gap-3 px-8 py-4 border-2 rounded-full font-medium transition-all duration-300"><!> <span>Try Again</span></button>'),vr=_('<p class="text-xs text-gray-400 mt-6"> </p>'),ur=_(`<div class="min-h-screen bg-white relative overflow-hidden flex items-center justify-center"><div class="architectural-grid absolute inset-0"></div> <div class="blueprint-line"></div> <div class="blueprint-line"></div> <div class="blueprint-line"></div> <!> <div class="relative z-10 text-center px-6 max-w-4xl mx-auto"><div class="mb-8"><h1 class="error-number"> </h1></div> <div class="space-y-6"><div class="flex justify-center mb-4"><div class="w-16 h-16 rounded-full flex items-center justify-center"><!></div></div> <div class="space-y-2"><h2 class="text-3xl md:text-4xl font-light text-gray-800 font-['Inter']"> </h2> <p class="text-lg text-gray-600 max-w-2xl mx-auto font-['Inter'] font-light"> </p> <!></div> <div class="flex items-center justify-center space-x-4 my-8"><div class="h-px bg-gradient-to-r from-transparent to-transparent w-24"></div> <div class="w-2 h-2 rounded-full"></div> <div class="h-px bg-gradient-to-r from-transparent to-transparent w-24"></div></div> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center"><a href="/" class="hover-lift group flex items-center gap-3 px-8 py-4 text-white rounded-full font-medium transition-all duration-300"><!> <span>Back to Home</span></a> <!></div> <div class="mt-16 pt-8 border-t border-gray-200"><p class="text-sm text-gray-500 mb-4">Need immediate assistance?</p> <div class="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm"><a href="tel:+6285383839900" class="flex items-center gap-2 text-gray-600 transition-colors"><!> <span>0853-8383-9900</span></a> <div class="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div> <a href="mailto:2watujudesign@gmail.com" class="flex items-center gap-2 text-gray-600 transition-colors"><!> <span>2watujudesign@gmail.com</span></a></div> <!></div></div></div> <div class="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 opacity-20"></div> <div class="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 opacity-20"></div> <div class="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 opacity-20"></div> <div class="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 opacity-20"></div></div>`);function kr(d,c){Fe(c,!1);const[h,b]=Ee(),u=()=>Ve(Ge,"$page",h),y=$(),s=$(),g=$(),r=$();let D=$(),E=$(),M=$();const oe={404:{icon:te,title:"Blueprint Not Found",description:"It seems the architectural plans you're looking for have been moved to another location. Let's help you find your way back.",color:"#56AAB7"},403:{icon:or,title:"Access Restricted",description:"This area is under construction and requires special access. Please ensure you have the proper permissions.",color:"#F59E0B"},500:{icon:tr,title:"Foundation Issue",description:"We're experiencing some structural problems with our server. Our team is working to reinforce the foundation.",color:"#EF4444"},default:{icon:Ze,title:"Construction Zone",description:"We've encountered an unexpected issue. Our architectural team is investigating the problem.",color:"#6B7280"}};He(()=>{const t=Ye.timeline();t.fromTo(e(E),{opacity:0,scale:.8,y:50},{opacity:1,scale:1,y:0,duration:1,ease:"power4.out"}),e(M)&&e(M).children&&t.fromTo(e(M).children,{opacity:0,y:30},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out"},"-=0.5");const o=e(D).querySelectorAll(".blueprint-line");t.fromTo(o,{scaleX:0,transformOrigin:"left center"},{scaleX:1,duration:1,stagger:.2,ease:"power2.inOut"},"-=1")}),W(()=>u(),()=>{w(y,u().status===404)}),W(()=>u(),()=>{w(s,u().status||500)}),W(()=>u(),()=>{var t;w(g,((t=u().error)==null?void 0:t.message)||"An unexpected error occurred")}),W(()=>e(s),()=>{w(r,oe[e(s)]||oe.default)}),Le(),Ie();var S=ur();Oe(t=>{var o=sr();T(()=>qe.title=`${e(s)??""} - ${e(r),a(()=>e(r).title)??""} | 2WATUJU Architecture`),f(t,o)});var ae=l(i(S),2),se=l(ae,2),ie=l(se,2),ne=l(ie,2);{var me=t=>{var o=ir(),m=k(o),v=i(m);te(v,{size:200,get style(){return`color: ${e(r),a(()=>e(r).color)??""}`}}),n(m);var L=l(m,2),Be=i(L);te(Be,{size:150,get style(){return`color: ${e(r),a(()=>e(r).color)??""}`}}),n(L),f(t,o)},fe=t=>{var o=nr(),m=i(o);ge(m,()=>e(r).icon,(v,L)=>{L(v,{size:150,get style(){return`color: ${e(r),a(()=>e(r).color)??""}`}})}),n(o),f(t,o)};O(ne,t=>{e(y)?t(me):t(fe,!1)})}var V=l(ne,2),R=i(V),F=i(R),he=i(F,!0);n(F),n(R),re(R,t=>w(E,t),()=>e(E));var X=l(R,2),Y=i(X),U=i(Y),be=i(U);ge(be,()=>e(r).icon,(t,o)=>{o(t,{size:32})}),n(U),n(Y);var Z=l(Y,2),J=i(Z),ye=i(J,!0);n(J);var G=l(J,2),xe=i(G,!0);n(G);var _e=l(G,2);{var $e=t=>{var o=lr(),m=i(o),v=i(m,!0);n(m),n(o),T(()=>I(v,e(g))),f(t,o)};O(_e,t=>{!e(y)&&e(g)&&t($e)})}n(Z);var K=l(Z,2),le=i(K),ce=l(le,2),we=l(ce,2);n(K);var Q=l(K,2),H=i(Q),ke=i(H);Ue(ke,{size:20}),q(2),n(H);var ze=l(H,2);{var Te=t=>{var o=cr(),m=l(i(o),2);Ke(m,{size:20,class:"rotate-180"}),n(o),T(()=>p(o,`border-color: ${e(r),a(()=>e(r).color)??""}; color: ${e(r),a(()=>e(r).color)??""};`)),x("mouseenter",o,v=>{v.currentTarget.style.backgroundColor=e(r).color,v.currentTarget.style.color="white"}),x("mouseleave",o,v=>{v.currentTarget.style.backgroundColor="transparent",v.currentTarget.style.color=e(r).color}),f(t,o)},Ce=t=>{var o=dr();o.__click=[ar];var m=i(o);rr(m,{size:20}),q(2),n(o),T(()=>p(o,`border-color: ${e(r),a(()=>e(r).color)??""}; color: ${e(r),a(()=>e(r).color)??""};`)),x("mouseenter",o,v=>{v.currentTarget.style.backgroundColor=e(r).color,v.currentTarget.style.color="white"}),x("mouseleave",o,v=>{v.currentTarget.style.backgroundColor="transparent",v.currentTarget.style.color=e(r).color}),f(t,o)};O(ze,t=>{e(y)?t(Te):t(Ce,!1)})}n(Q);var de=l(Q,2),ee=l(i(de),2),z=i(ee),Ne=i(z);er(Ne,{size:16}),q(2),n(z);var B=l(z,4),je=i(B);Qe(je,{size:16}),q(2),n(B),n(ee);var Ae=l(ee,2);{var Pe=t=>{var o=vr(),m=i(o);n(o),T(v=>I(m,`Error Code: ${e(s)??""} | Timestamp: ${v??""}`),[()=>a(()=>new Date().toLocaleString())],De),f(t,o)};O(Ae,t=>{e(y)||t(Pe)})}n(de),n(X),re(X,t=>w(M,t),()=>e(M)),n(V);var ve=l(V,2),ue=l(ve,2),pe=l(ue,2),Me=l(pe,2);n(S),re(S,t=>w(D,t),()=>e(D)),T(()=>{p(ae,`top: 20%; --line-color: ${e(r),a(()=>e(r).color)??""}30;`),p(se,`top: 50%; --line-color: ${e(r),a(()=>e(r).color)??""}30;`),p(ie,`top: 80%; --line-color: ${e(r),a(()=>e(r).color)??""}30;`),Se(F,"data-number",e(s)),p(F,`--error-color: ${e(r),a(()=>e(r).color)??""}`),I(he,e(s)),p(U,`background-color: ${e(r),a(()=>e(r).color)??""}20; color: ${e(r),a(()=>e(r).color)??""};`),I(ye,(e(r),a(()=>e(r).title))),I(xe,(e(r),a(()=>e(r).description))),p(le,`background-image: linear-gradient(to right, transparent, ${e(r),a(()=>e(r).color)??""}, transparent);`),p(ce,`background-color: ${e(r),a(()=>e(r).color)??""};`),p(we,`background-image: linear-gradient(to right, transparent, ${e(r),a(()=>e(r).color)??""}, transparent);`),p(H,`background-color: ${e(r),a(()=>e(r).color)??""};`),p(z,`hover:color: ${e(r),a(()=>e(r).color)??""};`),p(B,`hover:color: ${e(r),a(()=>e(r).color)??""};`),p(ve,`border-color: ${e(r),a(()=>e(r).color)??""};`),p(ue,`border-color: ${e(r),a(()=>e(r).color)??""};`),p(pe,`border-color: ${e(r),a(()=>e(r).color)??""};`),p(Me,`border-color: ${e(r),a(()=>e(r).color)??""};`)}),x("mouseenter",z,t=>t.currentTarget.style.color=e(r).color),x("mouseleave",z,t=>t.currentTarget.style.color="#4B5563"),x("mouseenter",B,t=>t.currentTarget.style.color=e(r).color),x("mouseleave",B,t=>t.currentTarget.style.color="#4B5563"),f(d,S),We(),b()}Re(["click"]);export{kr as component};
