/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("switchable/base",function(h,f,j,m){function i(a,b){b=b||{};if(!("markupType"in b))if(b.panelCls)b.markupType=1;else if(b.panels)b.markupType=2;b=h.merge(i.Config,b);this.container=f.get(a);this.config=b;this.activeIndex=b.activeIndex;this._init()}var l=h.require("event/target");i.Config={markupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",panelCls:"ks-switchable-panel",triggers:[],panels:[],hasTriggers:true,triggerType:"mouse",delay:0.1,
activeIndex:0,activeTriggerCls:"ks-active",steps:1,viewSize:[]};i.Plugins=[];h.augment(i,l,{_init:function(){var a=this,b=a.config;a._parseMarkup();b.switchTo&&a.switchTo(b.switchTo);b.hasTriggers&&a._bindTriggers();h.each(i.Plugins,function(c){c.init&&c.init(a)});a.fire("init")},_parseMarkup:function(){var a=this.container,b=this.config,c,d=[],e=[];switch(b.markupType){case 0:if(c=f.get("."+b.navCls,a))d=f.children(c);c=f.get("."+b.contentCls,a);e=f.children(c);break;case 1:d=f.query("."+b.triggerCls,
a);e=f.query("."+b.panelCls,a);break;case 2:d=b.triggers;e=b.panels}a=e.length;this.length=a/b.steps;if(b.hasTriggers&&a>0&&d.length===0)d=this._generateTriggersMarkup(this.length);this.triggers=h.makeArray(d);this.panels=h.makeArray(e);this.content=c||e[0].parentNode},_generateTriggersMarkup:function(a){var b=this.config,c=f.create("<ul>"),d,e;c.className=b.navCls;for(e=0;e<a;e++){d=f.create("<li>");if(e===this.activeIndex)d.className=b.activeTriggerCls;d.innerHTML=e+1;c.appendChild(d)}this.container.appendChild(c);
return f.children(c)},_bindTriggers:function(){var a=this,b=a.config,c=a.triggers,d,e,g=c.length;for(e=0;e<g;e++)(function(k){d=c[k];j.on(d,"click",function(){a._onFocusTrigger(k)});if(b.triggerType==="mouse"){j.on(d,"mouseenter",function(){a._onMouseEnterTrigger(k)});j.on(d,"mouseleave",function(){a._onMouseLeaveTrigger(k)})}})(e)},_onFocusTrigger:function(a){if(this._triggerIsValid(a)){this._cancelSwitchTimer();this.switchTo(a)}},_onMouseEnterTrigger:function(a){var b=this;if(b._triggerIsValid(a))b.switchTimer=
h.later(function(){b.switchTo(a)},b.config.delay*1E3)},_onMouseLeaveTrigger:function(){this._cancelSwitchTimer()},_triggerIsValid:function(a){return this.activeIndex!==a},_cancelSwitchTimer:function(){if(this.switchTimer){this.switchTimer.cancel();this.switchTimer=m}},switchTo:function(a,b){var c=this.config,d=this.triggers,e=this.panels,g=this.activeIndex,k=c.steps,n=g*k,r=a*k;if(!this._triggerIsValid(a))return this;if(this.fire("beforeSwitch",{toIndex:a})===false)return this;if(c.hasTriggers)this._switchTrigger(g>
-1?d[g]:null,d[a]);if(b===m)b=a>g?"forward":"backward";this._switchView(e.slice(n,n+k),e.slice(r,r+k),a,b);this.activeIndex=a;return this},_switchTrigger:function(a,b){var c=this.config.activeTriggerCls;a&&f.removeClass(a,c);f.addClass(b,c)},_switchView:function(a,b,c){f.css(a,"display","none");f.css(b,"display","block");this._fireOnSwitch(c)},_fireOnSwitch:function(a){this.fire("switch",{currentIndex:a})},prev:function(){var a=this.activeIndex;this.switchTo(a>0?a-1:this.length-1,"backward")},next:function(){var a=
this.activeIndex;this.switchTo(a<this.length-1?a+1:0,"forward")}});return i},{requires:["dom","event"]});
KISSY.add("switchable/accordion",function(h,f,j){function m(l,a){if(!(this instanceof m))return new m(l,a);m.superclass.constructor.call(this,l,h.merge(i,a));if(this.config.multiple)this._switchTrigger=function(){};return 0}var i={markupType:1,triggerType:"click",multiple:false};h.extend(m,j);h.augment(m,{_triggerIsValid:function(l){return this.activeIndex!==l||this.config.multiple},_switchView:function(l,a,b){var c=this.config,d=a[0];if(c.multiple){f.toggleClass(this.triggers[b],c.activeTriggerCls);
f.css(d,"display",d.style.display=="none"?"block":"none");this._fireOnSwitch(b)}else m.superclass._switchView.call(this,l,a,b)}});return m},{requires:["dom","switchable/base"]});
KISSY.add("switchable/autoplay",function(h,f,j,m){h.mix(j.Config,{autoplay:false,interval:5,pauseOnHover:true});j.Plugins.push({name:"autoplay",init:function(i){function l(){c=h.later(function(){i.paused||i.switchTo(i.activeIndex<i.length-1?i.activeIndex+1:0,"forward")},b,true)}var a=i.config,b=a.interval*1E3,c;if(a.autoplay){if(a.pauseOnHover){f.on(i.container,"mouseenter",function(){i.stop();i.paused=true});f.on(i.container,"mouseleave",function(){i.paused=false;l()})}l();i.stop=function(){if(c){c.cancel();
c=m}}}}});return j},{requires:["event","switchable/base"]});KISSY.add("switchable/autorender",function(h,f,j,m){m.autoRender=function(i,l){i="."+(i||"KS_Widget");f.query(i,l).each(function(a){var b=a.getAttribute("data-widget-type"),c;if(b&&"Switchable Tabs Slide Carousel Accordion".indexOf(b)>-1)try{if(c=a.getAttribute("data-widget-config"))c=c.replace(/'/g,'"');new h[b](a,j.parse(c))}catch(d){}})}},{requires:["dom","json","switchable/base"]});
KISSY.add("switchable/carousel",function(h,f,j,m,i){function l(g,k){var n=this;if(!(n instanceof l))return new l(g,k);n.on("init",function(){a(n)});l.superclass.constructor.call(n,g,h.merge(e,k));return 0}function a(g){var k=g.config,n=k.disableBtnCls,r=false;h.each(["prev","next"],function(o){var p=g[o+"Btn"]=f.get(b+k[o+"BtnCls"],g.container);j.on(p,"click",function(s){s.preventDefault();r||f.hasClass(p,n)||g[o]()})});if(!k.circular){g.on("beforeSwitch",function(){r=true});g.on("switch",function(o){o=
o.currentIndex;o=o===0?g[c]:o===g.length-1?g[d]:i;f.removeClass([g[c],g[d]],n);o&&f.addClass(o,n);r=false})}j.on(g.panels,"click focus",function(){g.fire("itemSelected",{item:this})})}var b=".",c="prevBtn",d="nextBtn",e={circular:true,prevBtnCls:"ks-switchable-prev-btn",nextBtnCls:"ks-switchable-next-btn",disableBtnCls:"ks-switchable-disable-btn"};h.extend(l,m);return l},{requires:["dom","event","switchable/base"]});
KISSY.add("switchable/effect",function(h,f,j,m,i,l){var a;h.mix(i.Config,{effect:"none",duration:0.5,easing:"easeNone",nativeAnim:true});i.Effects={none:function(b,c,d){f.css(b,"display","none");f.css(c,"display","block");d()},fade:function(b,c,d){b.length!==1&&h.error("fade effect only supports steps == 1.");var e=this,g=e.config,k=b[0],n=c[0];e.anim&&e.anim.stop(true);f.css(n,"opacity",1);e.anim=(new m(k,{opacity:0},g.duration,g.easing,function(){e.anim=l;f.css(n,"z-index",9);f.css(k,"z-index",
1);d()},g.nativeAnim)).run()},scroll:function(b,c,d,e){var g=this;b=g.config;c=b.effect==="scrollx";var k={};k[c?"left":"top"]=-(g.viewSize[c?0:1]*e)+"px";g.anim&&g.anim.stop();g.anim=(new m(g.content,k,b.duration,b.easing,function(){g.anim=l;d()},b.nativeAnim)).run()}};a=i.Effects;a.scrollx=a.scrolly=a.scroll;i.Plugins.push({name:"effect",init:function(b){var c=b.config,d=c.effect,e=b.panels,g=b.content,k=c.steps,n=b.activeIndex,r=e.length;b.viewSize=[c.viewSize[0]||e[0].offsetWidth*k,c.viewSize[1]||
e[0].offsetHeight*k];if(d!=="none"){h.each(e,function(u){f.css(u,"display","block")});switch(d){case "scrollx":case "scrolly":f.css(g,"position","absolute");f.css(g.parentNode,"position","relative");if(d==="scrollx"){f.css(e,"float","left");f.width(g,b.viewSize[0]*(r/k))}break;case "fade":var o=n*k,p=o+k-1,s;h.each(e,function(u,t){s=t>=o&&t<=p;f.css(u,{opacity:s?1:0,position:"absolute",zIndex:s?9:1})})}}}});h.augment(i,{_switchView:function(b,c,d,e){var g=this,k=g.config.effect;(h.isFunction(k)?k:
a[k]).call(g,b,c,function(){g._fireOnSwitch(d)},d,e)}});return i},{requires:["dom","event","anim","switchable/base"]});
KISSY.add("switchable/circular",function(h,f,j,m){function i(p,s,u,t,w){var q=this;p=q.config;s=q.length;var x=q.activeIndex,v=p.scrollType===o,y=v?d:e,z=q.viewSize[v?0:1];v=-z*t;var B={},C,A=w===r;if(C=A&&x===0&&t===s-1||w===n&&x===s-1&&t===0)v=l.call(q,q.panels,t,A,y,z);B[y]=v+k;q.anim&&q.anim.stop();q.anim=(new j(q.content,B,p.duration,p.easing,function(){C&&a.call(q,q.panels,t,A,y,z);q.anim=undefined;u()},p.nativeAnim)).run()}function l(p,s,u,t,w){var q=this.config.steps;s=this.length;var x=u?
s-1:0,v=(x+1)*q;for(q=x*q;q<v;q++){f.css(p[q],b,c);f.css(p[q],t,(u?-1:1)*w*s)}return u?w:-w*s}function a(p,s,u,t,w){var q=this.config.steps;s=this.length;var x=u?s-1:0,v=(x+1)*q;for(q=x*q;q<v;q++){f.css(p[q],b,g);f.css(p[q],t,g)}f.css(this.content,t,u?-w*(s-1):g)}var b="position",c="relative",d="left",e="top",g="",k="px",n="forward",r="backward",o="scrollx";h.mix(m.Config,{circular:false});m.Plugins.push({name:"circular",init:function(p){p=p.config;if(p.circular&&(p.effect===o||p.effect==="scrolly")){p.scrollType=
p.effect;p.effect=i}}})},{requires:["dom","anim","switchable/base","switchable/effect"]});
KISSY.add("switchable/countdown",function(h,f,j,m,i,l){h.mix(i.Config,{countdown:false,countdownFromStyle:"",countdownToStyle:"width: 0"});i.Plugins.push({name:"countdown",init:function(a){function b(){c();r=(new m(g[a.activeIndex],n,e-1)).run()}function c(){if(r){r.stop();r=l}}var d=a.config,e=d.interval,g=[],k=d.countdownFromStyle,n=d.countdownToStyle,r;if(!(!d.autoplay||!d.hasTriggers||!d.countdown)){h.each(a.triggers,function(o,p){o.innerHTML='<div class="ks-switchable-trigger-mask"></div><div class="ks-switchable-trigger-content">'+
o.innerHTML+"</div>";g[p]=o.firstChild});if(d.pauseOnHover){j.on(a.container,"mouseenter",function(){c();var o=g[a.activeIndex];if(k)r=(new m(o,k,0.2,"easeOut")).run();else f.removeAttr(o,"style")});j.on(a.container,"mouseleave",function(){c();f.removeAttr(g[a.activeIndex],"style");h.later(b,200)})}a.on("beforeSwitch",function(){c();f.removeAttr(g[a.activeIndex],"style")});a.on("switch",function(){a.paused||b()});b(a.activeIndex)}}});return i},{requires:["dom","event","anim","switchable/base"]});
KISSY.add("switchable/lazyload",function(h,f,j){var m="beforeSwitch",i="img-src",l="area-data",a={};a[i]="data-ks-lazyload-custom";a[l]="ks-datalazyload-custom";h.mix(j.Config,{lazyDataType:l});j.Plugins.push({name:"lazyload",init:function(b){function c(n){var r=e.steps;n=n.toIndex*r;d.loadCustomLazyData(b.panels.slice(n,n+r),g);a:{var o,p;if(n=(r=g===i)?"img":g===l?"textarea":""){n=f.query(n,b.container);o=0;for(p=n.length;o<p;o++)if(r?f.attr(n[o],k):f.hasClass(n[o],k)){r=false;break a}}r=true}r&&
b.detach(m,c)}var d=h.require("datalazyload"),e=b.config,g=e.lazyDataType,k=a[g];!d||!g||!k||b.on(m,c)}});return j},{requires:["dom","switchable/base"]});KISSY.add("switchable/slide",function(h,f){function j(i,l){if(!(this instanceof j))return new j(i,l);j.superclass.constructor.call(this,i,h.merge(m,l));return 0}var m={autoplay:true,circular:true};h.extend(j,f);return j},{requires:["switchable/base"]});
KISSY.add("switchable/tabs",function(h,f){function j(a,b){if(!(this instanceof j))return new j(a,b);j.superclass.constructor.call(this,a,b);return 0}function m(a,b){a.tabIndex=b;l.query("*",a).each(function(c){c.tabIndex=b})}var i=h.Event,l=h.DOM;h.extend(j,f,{_init:function(){j.superclass._init.call(this);var a=this.activeIndex;this.lastActiveIndex=a;var b=this.triggers,c=this.panels,d=0;h.each(b,function(e){e.setAttribute("role","tab");m(e,d==a?"0":"-1");if(!e.id)e.id=h.guid("ks-switchable");d++});
d=0;h.each(c,function(e){e.setAttribute("role","tabpanel");e.setAttribute("aria-hidden",d==a?"false":"true");e.setAttribute("aria-labelledby",b[d].id);d++});this.on("switch",this._tabSwitch,this);c=this.container;i.on(c,"keydown",this._tabKeydown,this);i.on(c,"keypress",this._tabKeypress,this)},_currentTabFromEvent:function(a){var b;h.each(this.triggers,function(c){if(c==a||l.contains(c,a))b=c});return b},_currentPanelFromEvent:function(a){var b;h.each(this.panels,function(c){if(c==a||l.contains(c,
a))b=c});return b},_tabKeypress:function(a){switch(a.keyCode){case 33:case 34:a.ctrlKey&&!a.altKey&&!a.shiftKey&&a.halt();break;case 9:a.ctrlKey&&!a.altKey&&a.halt()}},_tabKeydown:function(a){var b=a.target,c=this.triggers,d=!a.ctrlKey&&!a.shiftKey&&!a.altKey,e=a.ctrlKey&&!a.shiftKey&&!a.altKey;switch(a.keyCode){case 37:case 38:if(this._currentTabFromEvent(b)){this.prev();a.halt()}break;case 39:case 40:if(this._currentTabFromEvent(b)){this.next();a.halt()}break;case 34:if(e){a.halt();a.preventDefault();
this.next()}break;case 33:if(e){a.halt();this.prev()}break;case 36:if(d){this.switchTo(0);a.halt()}break;case 35:if(d){this.switchTo(c.length-1);a.halt()}break;case 9:if(a.ctrlKey&&!a.altKey){a.halt();a.shiftKey?this.prev():this.next()}}},_tabSwitch:function(a){var b=this.lastActiveIndex;a=a.currentIndex;if(!(b===undefined||b==a)){var c=this.triggers[a],d=this.panels[b],e=this.panels[a];m(this.triggers[b],"-1");m(c,"0");c.focus();d.setAttribute("aria-hidden","true");e.setAttribute("aria-hidden","false");
this.lastActiveIndex=a}}});return j},{requires:["switchable/base"]});KISSY.add("switchable",function(h,f,j,m,i,l,a,b,c,d,e,g){h.Switchable=f;j={Accordion:j,Carousel:l,Slide:e,Tabs:g};h.mix(h,j);h.mix(f,j);return f},{requires:["switchable/base","switchable/accordion","switchable/autoplay","switchable/autorender","switchable/carousel","switchable/circular","switchable/countdown","switchable/effect","switchable/lazyload","switchable/slide","switchable/tabs"]});