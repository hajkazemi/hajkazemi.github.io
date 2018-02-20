define("widgets/utils/platformAppsConfigurationViewerService",["lodash","js-platform-apps-configuration-viewer"],function(e,t){"use strict";var i={getAllWidgetsApi:function(){return e.get(t,"api")},getWidgetApi:function(t){return e.get(i.getAllWidgetsApi(),t)}};return i}),define("widgets/utils/widgetModel",["lodash","compUtils","coreUtils","siteUtils","widgets/utils/platformAppsConfigurationViewerService"],function(e,t,i,a,n){"use strict";function s(t,s,d,l){var g=t.getCompType(s),f=function(e,t){return e.getAncestorOfType(t,c)}(t,s),m=function(e,t){return!i.displayedOnlyStructureUtil.isDisplayedComponent(e)&&t}(s,!!f),h=o(t,s,g,m),v=t.getActionsAndBehaviors(s),y=i.displayedOnlyStructureUtil.isDisplayedComponent(s),I=t.getCompData(s,m);return{parent:t.getParentId(s),type:g,state:h,layout:t.getCompLayout(s),design:t.getCompDesign(s,m),isDisplayed:function(e,t){var i=t;for(;i;){var a=e.getCompType(i);if(a===u||a===p){var n=i,s=r(e,i);return n===s}i=e.getParentId(i)}return e.isDisplayed(t)}(t,s),id:t.getCompName(s),data:I,publicAPI:function(t,i){var s=e.get(t,"widgetId");if(!s){var o=e.get(t,"applicationId");if(o){var r=e.get(i,o);s=e.get(a.clientSpecMapUtils.getMainSectionWidgetData(r),"widgetId")}}return n.getWidgetApi(s)}(I,l),style:t.getCompStyle(s),fullData:t.getCompData(s,!0),props:t.getCompProps(s,m),children:t.getChildrenIds(s),events:e.map(v,function(t){return e.assign({eventType:e.get(t,"action.name")},e.get(t,"behavior.params"))}),displayedRoot:y&&f?e.get(f,"id"):null,displayedOnlyComponents:y?[]:e.map(t.getDisplayedOnlyCompsForFullComp(s,d),"id")}}function o(i,a,n,s){var o={data:i.getCompData(a,s),fullData:i.getCompData(a,!0),props:i.getCompProps(a,s)},r=i.getCompState(a);return e.isUndefined(r)||e.isEmpty(r)?function(e,i){var a=t.compFactory.getCompReactClass(i);return a&&a.publicState?a.publicState(null,e):{}}(o,n):r}function r(e,t){var i=e.getParentId(t),a=e.getCompStructure(i),n=a&&o(e,i,a.componentType),s=a&&n&&a.components[n.currentIndex];return s&&s.id}function d(t,i,a){var n=function(t,i,a){return e.reduce(t,function(t,n){var s=i.getCompConnections(n),o=e.map(s,function(t){var i=void 0;return i="WixCodeConnectionItem"===t.type?e.assign({},t,{controllerId:a,config:null}):e.defaults({},t,{config:null}),{connection:i,compId:n}});return t.concat(o)},[])}(i,t,a);return e(n).groupBy("connection.controllerId").mapValues(function(t){return e(t).groupBy("connection.role").mapValues(function(t){return e(t).keyBy("compId").mapValues("connection.config").value()}).value()}).value()}var u="wysiwyg.viewer.components.BoxSlideShowSlide",p="wysiwyg.viewer.components.StripContainerSlideShowSlide",c="wysiwyg.viewer.components.Repeater";return{getCompModel:s,getConnectionsModel:d}}),define("widgets/utils/wixCodeRemoteModelService",["lodash","platformUtils","siteUtils","widgets/utils/widgetModel"],function(e,t,i,a){"use strict";var n=t.RemoteModelInterface,s=t.componentsHooks;return{generateRemoteModelInterface:function(t,o,r,d,u,p,c,l,g,f){var m=new n(void 0,g);return m.registerHook(m.getHooks().data,"wysiwyg.viewer.components.Repeater",s.repeaters.updateRepeaterItems),e.forEach(o,function(e){return m.addComponent(e,a.getCompModel(t,e,f,u))}),m.addSiteStructure(r),m.addNavigation(d),m.addConnections(a.getConnectionsModel(t,o,f)),m.resetComponentsScope(),m.addEventTypes(i.constants.ACTION_TYPES),m.addSiteMemberData(c),m.addAppsData(l),m.addSessionInfoProp(p),m},createRemoteModelInterface:function(e,t){var i=new n(e,t);return i.registerHook(i.getHooks().data,"wysiwyg.viewer.components.Repeater",s.repeaters.updateRepeaterItems),i}}}),define("widgets/core/widgetDataHelper",["lodash"],function(e){"use strict";return{registerWidgetHandler:function(t,i){e.set(t,"widgetHandler",i)},getWidgetHandler:function(t){return e.get(t,"widgetHandler")}}}),define("widgets/core/dataResolvers/pageLinkDataResolver",["lodash"],function(e){"use strict";function t(i){var a=[],n=e.get(i,"link");n&&a.push(n);var s=e.get(i,"linkList");return s&&(a=a.concat(s)),e.forEach(i,function(i){e.isObject(i)&&(a=a.concat(t(i)))}),a}function i(i,a,n){var s=a.getSiteData(),o=void 0;return o="Grid"===i.type?function(t,i){var a=e.reduce(i.columns,function(e,t){return t.linkPath&&e.push(t.linkPath),e},[]),n=[];return a.length>0&&e.forEach(t.rows,function(t){e.forEach(a,function(i){var a=i+"_linkObj",s=e.get(t,a);e.isUndefined(s)||n.push(s)})}),n}(i,n):t(i),e.forEach(o,function(t){var i=t.type,a=t.pageId;if(("PageLink"===i||"AnchorLink"===i)&&e.isString(a)){var n=function(t,i){var a=e.compact(t.replace(/^#/,"").split("/")),n=e.findKey(i.getRouters(),{prefix:a[0]});if(n)return{type:"DynamicPageLink",routerId:n,innerRoute:a.slice(1).join("/")}}(t.pageId,s);n?(e.assign(t,n),delete t.pageId):t.pageId=function(t,i){if("#"===t)return"#"+i.getMainPageId();var a=i.findDataOnMasterPageByPredicate(function(e){return e.pageUriSEO===t.replace("#","")}),n=e.get(a,"id",t);return e.startsWith(n,"#")?n:"#"+n}(a,s)}}),i}return{resolve:i}}),define("widgets/core/dataResolvers/emptyImageDataResolver",["lodash"],function(e){"use strict";function t(t){return t.uri?t:e.assign({},t,{uri:i})}var i="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";return{resolve:function(i){return"Image"===i.type?t(i):"ImageList"===i.type?e.assign({},i,{items:i.items&&i.items.map(t)}):i}}}),define("widgets/core/widgetDataResolvers",["lodash","widgets/core/dataResolvers/pageLinkDataResolver","widgets/core/dataResolvers/emptyImageDataResolver"],function(e,t,i){"use strict";var a=[t,i];return{resolve:function(t,i,n){return e.forEach(a,function(e){t=e.resolve(t,i,n)}),t}}}),define("widgets/core/modelBuilderDataHelper",["lodash"],function(e){"use strict";var t={PAGE:"Page",POPUP:"Popup",UNKNOWN:"Unknown"},i=["Page","AppPage"];return{getApi:function(e){return{fetchData:e.getDataByQuery.bind(e),fetchSiteStructure:e.getSiteStructureForRmi.bind(e),fetchNavigationData:e.getNavigationDataRmi.bind(e),fetchClientSpecMap:e.getClientSpecMap.bind(e),fetchSessionInfo:e.getSessionInfoForRmi.bind(e),fetchSiteMemberData:e.getSMbySiteExtensionInstanceForRmi.bind(e),fetchAppsData:e.getAppsDataForRmi.bind(e)}},getWidgetType:function(a){return e.includes(i,e.get(a,"type"))?e.get(a,"isPopup")?t.POPUP:t.PAGE:t.UNKNOWN},WIDGET_TYPES:t}}),define("widgets/core/modelBuilder",["lodash","coreUtils","loggingUtils","widgets/utils/wixCodeRemoteModelService","widgets/core/modelBuilderDataHelper"],function(e,t,i,a,n){"use strict";function s(t,i){var a=[d.PAGES_CONTAINER_ID,d.SITE_PAGES_ID],n=i(t,t);return e(n).omit([d.SITE_STRUCTURE_ID]).keys().difference(a).value()}function o(i,a,o){var r=t.siteConstants.MASTER_PAGE_ID,d=s(r,a),u=e.without(i,r);return e.transform(u,function(e,t){e[t]=s(t,a),function(e,t){var i=t(e,e);return n.getWidgetType(i)===n.WIDGET_TYPES.PAGE}(t,o)&&(e[t]=e[t].concat(d))},{})}function r(t,s,r,d,u){i.performance.mark("build RMI model start");var p=n.getApi(s),c=function(t,i,n,s,o,r,d,u,p){return e.mapValues(i,function(e,i){return a.generateRemoteModelInterface(t,e,s(),o(),r(),d(),u(),p(),n,i)})}(t,o(r,u,p.fetchData),d,p.fetchSiteStructure,p.fetchNavigationData,p.fetchClientSpecMap,p.fetchSessionInfo,p.fetchSiteMemberData,p.fetchAppsData);return i.performance.mark("build RMI model end"),i.performance.measure("build RMI model","build RMI model start","build RMI model end"),c}var d=t.siteConstants;return{build:r,attach:function(t,i,a){return e.forEach(i,function(e){t[e]._onUpdateCallback=a}),t}}}),define("widgets/messages/messageBuilder",[],function(){"use strict";return{loadWidgetsMessage:function(e,t,i,a){return{type:"load_widgets",sdkParameters:{referrer:"undefined"==typeof window?"":window.document.referrer},widgets:e,rootIds:i,routersMap:t||{},popupContexts:a||{}}},loadUserCodesMessage:function(e,t){return{type:"load_user_code",widgets:e,rootIds:t}},initWidgetsMessage:function(e){return{type:"init_widgets",contexts:e}},startWidgetsMessage:function(e,t){return{type:"start_widgets",contexts:e,siteInfo:t}},stopWidgetsMessage:function(e){return{type:"stop_widgets",widgetIds:e}},updateWidgetMessage:function(e,t){return{type:"update",contextId:e,updates:t}},updateSiteMemberData:function(e,t){return{contextId:e,type:"update_site_member",updates:t}},updateSessionInfo:function(e,t){return{contextId:e,type:"update_session_info",updates:t}},updateaNavigation:function(e,t){return{contextId:e,type:"update_navigation",updates:t}},triggerOnRenderMessage:function(e){return{intent:"WIX_CODE",type:"trigger_onRender",contextId:e}},triggerUserFunctionMessage:function(e,t,i){return{intent:"WIX_CODE",type:"wix_code_run_user_function",contextId:e,callbackId:t.callbackId,compId:t.compId,event:i}},updateWixCodeModelDataAfterLoginMessage:function(e,t){return{type:"update_wix_code_model_data_after_login",rootIds:t,widgets:e}},updateAppsData:function(e,t){return{contextId:e,type:"update_apps_data",updates:t}}}}),define("widgets/core/RemoteWidgetHandlerProxy",["lodash","mobx","core","utils","widgets/core/widgetDataResolvers","widgets/core/modelBuilder","widgets/messages/messageBuilder","experiment"],function(e,t,i,a,n,s,o,r){"use strict";function d(t,i,a,n){var s={data:this._runtimeDal.setCompData.bind(this._runtimeDal),style:this._runtimeDal.updateCompStyle.bind(this._runtimeDal),design:this._runtimeDal.setCompDesign.bind(this._runtimeDal),props:this._runtimeDal.setCompProps.bind(this._runtimeDal),layout:this._runtimeDal.updateCompLayout.bind(this._runtimeDal),registerEvent:this._runtimeDal.registerComponentEvent.bind(this._runtimeDal)};t?s[i](t,a):s[i](a),e.isFunction(this._onUpdateCallback)&&this._onUpdateCallback(n)}function u(e,t){this._actionQueue.addItem(function(){this.isWidgetReady(e.contextId)?this.handleCommand(e,t):u.call(this,e,t)}.bind(this))}function p(t){if(!this._isFlushingPendingCommands){var i=this;this._isFlushingPendingCommands=!0;var n=function(){i._isFlushingPendingCommands=!1,i._actionQueue.flush(),function(t){e.forEach(t,function(e){return e()})}(i._commandsFlushListeners),i._siteAPI.getSiteDataAPI().refreshRenderedRootsData()};t?n():a.animationFrame.request(n)}}function c(e,t){this._runtimeDal=e.getRuntimeDal(),this._siteAPI=e,this._displayedDal=e.getDisplayedDAL(),this._pointers=e.getPointers(),this._remoteModelInterfaces={},this._onUpdateCallback=t,this._receivedChanges=void 0,this._isFlushingPendingCommands=!1,this._commandsFlushListeners=[],this._actionQueue=e.getSiteDataAPI().getActionQueue()}var l={State:"stateChanged",Data:"dataChanged",Design:"designChanged",Props:"propsChanged",EventRegister:"registerEvent",Layout:"layoutChanged",Behavior:"executeBehavior",Style:"styleChanged",ExecuteBatch:"executeBatch"},g={WidgetReady:"widget_ready",WarmupData:"wix_code_warmup_data"};return c.prototype.initWidgets=function(e){var t=o.initWidgetsMessage(e);this._sendMessage(t)},c.prototype.startWidgets=function(t){if(!e.isEmpty(t)){e.assign(this._remoteModelInterfaces,function(e){var t=this._siteAPI.getSiteData();if(t.isFirstRenderAfterSSR()&&t.runtimeModels)return s.attach(t.runtimeModels,e,d.bind(this));var i=this._siteAPI.getSiteDataAPI().document,a=i.getFullAndDisplayedOnlyCompsUnderRoot.bind(i);return s.build(this._siteAPI.getRuntimeDal(),t,e,d.bind(this),a)}.call(this,t));var i=e.mapValues(this._remoteModelInterfaces,function(e){return e.toJson()}),a=function(){return{deviceType:this._siteAPI.getSiteData().isMobileView()?"mobile":"desktop"}}.call(this),n=o.startWidgetsMessage(e.pick(i,t),a);this._sendMessage(n)}},c.prototype.loadUserCode=function(e,t){var i=o.loadUserCodesMessage(e,t);this._sendMessage(i)},c.prototype.updateWixCodeModelDataAfterLogin=function(e,t){var i=o.updateWixCodeModelDataAfterLoginMessage(e,t);this._sendMessage(i)},c.prototype.loadWidgets=function(t,i){this.loadUserCode(t,i);var a=e(i).transform(function(e,t){e[t]=this._runtimeDal.getPopupContext(t)}.bind(this),{}).omitBy(e.isUndefined).value(),n=o.loadWidgetsMessage(t,this._siteAPI.getSiteData().getRouters(),i,a);this._sendMessage(n)},c.prototype.getActiveWidgetIds=function(){return e.keys(this._remoteModelInterfaces)},c.prototype.stopWidgets=function(t){if(!e.isEmpty(t)){e.forEach(t,function(e){delete this._remoteModelInterfaces[e];var t=this._pointers.platform.getPlatformWidgetStatePointer(e);this._displayedDal.set(t,!1)}.bind(this));var i=o.stopWidgetsMessage(t);this._sendMessage(i)}},c.prototype.stopAllWidgets=function(){this.stopWidgets(e.keys(this._remoteModelInterfaces))},c.prototype.updateComponent=function(e){this._sendMessage(e)},c.prototype.handleWidgetUpdate=function(t){var i=e(t).keys().head(),a=e.pickBy(this._remoteModelInterfaces,function(t){return e.has(t.toJson(),["components",i])}),n=e.find(e.find(t));if(!e.isEmpty(a)&&!e.isEqual(this._receivedChanges,n)){var s=e(a).keys().head();a[s].updateModel(t);var r=o.updateWidgetMessage(s,t);this._sendMessage(r)}},c.prototype.handleSiteMemberUpdate=function(t){e.forEach(this._remoteModelInterfaces,function(e,i){e.addSiteMemberData(t);var a=o.updateSiteMemberData(i,t);this._sendMessage(a)}.bind(this))},c.prototype.handleAppDataUpdate=function(t){e.forEach(this._remoteModelInterfaces,function(e,i){e.addAppsData(t);var a=o.updateAppsData(i,t);this._sendMessage(a)}.bind(this))},c.prototype.handleSvSessionUpdate=function(t){e.forEach(this._remoteModelInterfaces,function(e,i){e.addSessionInfoProp(t);var a=o.updateSessionInfo(i,{svSession:t});this._sendMessage(a)}.bind(this))},c.prototype.handleLocationUpdate=function(t){e.forEach(this._remoteModelInterfaces,function(e,i){e.addNavigation(t);var a=o.updateaNavigation(i,t);this._sendMessage(a)}.bind(this))},c.prototype.handleRemoteMessage=function(i){switch(i.type){case g.WidgetReady:if(function(e){return this._remoteModelInterfaces[e]}.call(this,i.widgetId)){var a=this._pointers.platform.getPlatformWidgetStatePointer(i.widgetId);t.runInAction(function(){this._displayedDal.set(a,!0),p.call(this,!0);var e=this._siteAPI.getSiteAspect("WidgetAspect");e&&e.flushWidgetReady(i.widgetId)}.bind(this))}break;case g.WarmupData:var n=e.get(i.data,"controllerId"),s=e.get(i.data,"data"),o=this._siteAPI.getSiteData();o.userWarmup=o.userWarmup||{},o.userWarmup[n]=s}},c.prototype.onCommand=function(e,t){u.call(this,e,t),this.isWidgetReady(e.contextId)&&p.call(this,e.command===l.EventRegister)},c.prototype.handleCommand=function(t,a){this._receivedChanges=t.data;var s=this._remoteModelInterfaces[t.contextId];if(s){switch(t.command){case l.ExecuteBatch:s.setBatchData(t.data);break;case l.State:s.setState(t.compId,t.data);break;case l.Data:t.data=function(t,i,a,s){var o=e.assign({},i.getCompData(a),s),r=i.getCompProps(a);return n.resolve(o,t,r)}(this._siteAPI,this._runtimeDal,t.compId,t.data),s.setData(t.compId,t.data);break;case l.Design:s.setDesign(t.compId,t.data);break;case l.Layout:s.setLayout(t.compId,t.data);break;case l.Props:s.setProps(t.compId,t.data,a);break;case l.EventRegister:s.registerEvent(t.contextId,t.compId,t.data.eventType,t.data.callbackId);break;case l.Style:s.setStyle(t.compId,t.data);break;case l.Behavior:var o=t.data,r={group:"command",callback:a};i.behaviorsService.handleBehaviors(this._siteAPI,[o],r,o.type)}this._receivedChanges=void 0}},c.prototype.handleEvent=function(t,i,a,n){var s=void 0;switch(i){case"runCode":s=o.triggerUserFunctionMessage(t,a,function(t){var i=e.merge(e.pick(t,"item"),e.pickBy(t,e.negate(e.isObject)));return i.nativeEvent=e.pickBy(t.nativeEvent,e.negate(e.isObject)),t.data&&(i.data=t.data),i}(n));break;case"onRendered":s=o.triggerOnRenderMessage(t)}this._sendMessage(s)},c.prototype.isWidgetReady=function(e){var t=this._pointers.platform.getPlatformWidgetStatePointer(e);return!!this._displayedDal.get(t)},c.prototype._sendMessage=function(e){this._siteAPI.getWixCodeAppApi().sendMessage(e)},c.prototype.getPostMessageTarget=function(e){var t=this._siteAPI.getWixCodeAppApi(),i=this._siteAPI.getSiteData();return r.isOpen("wixCodeNoIframe",i)&&i.isViewerMode()?t.getWorkerById(e):t.getAppsIframe()},c.prototype.registerCommandsFlushedListener=function(t){if(!e.isFunction(t))throw new TypeError("The callback provided is not a function.");this._commandsFlushListeners.push(t)},c}),define("widgets/core/semiNativeLocalHandlers",[],function(){"use strict";return{relayout:function(e,t,i){e.registerReLayoutPending(i),e.reLayout()}}}),define("widgets/core/semiNativeLocalService",["remoteDOM","lodash","widgets/core/semiNativeLocalHandlers"],function(e,t,i){"use strict";return{initContext:function(a,n,s){var o=s.getSiteData(),r=t.mapValues(i,function(e){return t.partial(e,s)});e.setWindow(window),t.set(o,["semiNativeMessageQueues",a,"handlers"],[]),o.semiNativeMessageQueues[a].queueIndex=e.createMessageQueue({postMessage:function(e){n.sendMessage({intent:"WIX_CODE_RESPONSE",type:"OTW",data:e,contextId:a})},addEventListener:function(e,i){var s={contextId:a,intent:"WIX_CODE",type:"OTW"},r=function(e){t.isMatch(e,s)&&e.data&&i(e)};n.registerMessageHandler(r),o.semiNativeMessageQueues[a].handlers.push(r)}},null,r)},stopContext:function(e,i,a){var n=t.get(a,["semiNativeMessageQueues",e,"handlers"]);t.forEach(n,function(e){i.unregisterMessageHandler(e)}),delete a.semiNativeMessageQueues[e]}}}),define("widgets/core/semiNativeDataHelpers",["lodash","utils","experiment"],function(e,t,i){"use strict";function a(e,t,i){var a=e.getDataByQuery(t,i);return a&&a.content?JSON.parse(a.content):null}var n={APP:"APP",COMPONENT:"COMPONENT"};return{getStyleParams:function(a,n){var s=a.getAllTheme(),o=a.rendererModel.siteInfo.documentType,r=a.getDataByQuery("masterPage").characterSets,d=a.isVisualFocusEnabled(),u=i.isOpen("sv_newFonts2017",a),p=t.styleUtils.getStyleDataToPassIntoApp(n,s,a.santaBase,o,r,a.serviceTopology,!0,u);return e.assign(p,{isVisualFocusEnabled:d})},getPublicData:function(e,t,i,s){var o={};return o[n.APP]=a(e,"tpaData-"+t,"masterPage"),o[n.COMPONENT]=a(e,i,s),o}}}),define("widgets/core/widgetService",["lodash","utils","widgets/utils/widgetModel","widgets/core/widgetDataHelper","widgets/core/RemoteWidgetHandlerProxy","widgets/core/semiNativeLocalService","widgets/core/semiNativeDataHelpers","coreUtils","platformInit"],function(e,t,i,a,n,s,o,r,d){"use strict";function u(e,t){!function(e,t){var i=e.getSiteData().widgetsStore;a.registerWidgetHandler(i,t)}(e,new n(e,t))}function p(t,a,n){if(e.includes(t.getAllRenderedRootIds(),a)){var s=t.getRuntimeDal(),o=t.getSiteDataAPI().document.getAllCompsUnderRoot(a,n),r=e(o).omit(["masterPage"]).mapValues(function(e){return i.getCompModel(s,e.id,a)}).value();h(t).handleWidgetUpdate(r)}}function c(i,a,n){var s=i.getSiteData(),o=h(i);n=e.without(n,t.siteConstants.MASTER_PAGE_ID);var u=d.appsUtils.getApplications(s.getClientSpecMap(),n,s);if(e.isEmpty(u))return a;a=function(t,i,a,n){var s=e.difference(t,e.map(i,"rootId"));return s=e.reject(s,function(e){return!r.siteDataUtils.isPageLoaded(n,e)}),e.isEmpty(s)||(i=y(a,i,t),e.isEmpty(i)||A(a,s)),i}(n,a,i,s);var p=e(a).reject({started:!0}).map("rootId").value();return e.isEmpty(p)?a:(o.startWidgets(p),a=function(t,i){return e.map(t,function(t){return e.includes(i,t.rootId)?e.assign(t,{started:!0}):t})}(a,p))}function l(t,i,a){var n=h(t);return e.isEmpty(a)||e.isEmpty(i)?i:(n.stopWidgets(a),e.forEach(a,function(e){s.stopContext(e,_(t),t.getSiteData())}),e.reject(i,function(t){return e.includes(a,t.rootId)}))}function g(t,i){var a=e.without(t.getRootIdsWhichShouldBeRendered(),"masterPage");if(function(e){return!!e.getRenderFlag("initWixCode")}(t)){return i=l(t,i,function(t,i){var a=e.reject(t,function(t){return e.includes(i,t.rootId)});return e.map(a,"rootId")}(i,a)),c(t,i,a)}return l(t,i,a)}function f(e){return"platform.components.AppController"===e.componentType}function m(t,i){var a=e.filter(t,"json"),n=function(t,i){return e(t).transform(function(t,i){e.assign(t,e.get(i,"data.connections_data"))},{}).values().flatMap(function(t){var a=i.resolveData(t,null,i.dataTypes.CONNECTIONS);return e.get(a,"items")}).groupBy("controllerId").value()}(e.map(a,"json"),i);return e.flatMap(a,function(t){var a=r.dataUtils.getAllCompsInStructure(e.get(t,"json.structure"),!1,f);return e.map(a,function(a){var s=a.dataQuery.replace("#","");return e.omitBy({controllerBehaviors:e.get(i.getDataByQuery(a.behaviorQuery,t.id,i.dataTypes.BEHAVIORS),"items",[]),controllerData:i.getDataByQuery(s,t.id),controllerId:s,compId:a.id,connections:e.get(n,s),dependencies:function(t,i,a){var n=a.getDataByQuery(t.connectionQuery,i.id,a.dataTypes.CONNECTIONS);return n?e(n.items).filter({type:"ConnectionItem"}).map("controllerId").value():[]}(a,t,i)},e.isUndefined)})})}function h(e){var t=e.getSiteData().widgetsStore;return a.getWidgetHandler(t)}function v(i,a){return e(i).without(t.siteConstants.MASTER_PAGE_ID).filter(a.getPageTitle.bind(a)).value()}function y(t,i,a){var n=t.getSiteData(),s=v(a,n);if(e(s).difference(e.map(i,"rootId")).thru(e.isEmpty).value())return i;var o=d.appsUtils.getApplications(n.getClientSpecMap(),s,n);if(e.isEmpty(o))return i;h(t).loadWidgets(o,s);var r=e.map(s,function(e){return{rootId:e}});return i.concat(r)}function I(i,a){var n=function(i,a){var n=[{id:i,json:a.getPageData(i)}];if(e.get(a.getDataByQuery(i),"isPopup"))return n;var s=t.siteConstants.MASTER_PAGE_ID;return n.concat({id:s,json:a.getMasterPageData()})}(a,i),s=m(n,i),d=e.mapValues(function(t){return e(t).groupBy("controllerData.applicationId").mapValues(function(t){return e(t).keyBy("controllerId").mapValues(function(t){return e.pick(t,["controllerData","controllerBehaviors","connections","compId","dependencies"])}).value()}).value()}(s),function(e){return{controllers:e}}),u=function(t,i){var a=e.matchesProperty("componentType","platform.components.semiNativeComponent");return e(t).filter("json").flatMap(function(t){var n=r.dataUtils.getAllCompsInStructure(e.get(t,"json.structure"),!1,a);return e.map(n,function(a){var n=i.getDataByQuery(a.dataQuery.replace("#",""),t.id),s=e.find(i.getClientSpecMap(),"widgets."+n.widgetId);return{compId:a.id,instance:s&&s.instance,compData:n,styleParams:o.getStyleParams(i,a.styleId),publicData:o.getPublicData(i,n.applicationId,n.tpaData,t.id)}})}).value()}(n,i);return e.transform(u,function(t,a){var n=e.get(a,"compData.applicationId"),s=i.getClientSpecMapEntry(n).appDefinitionId;e.set(t,[s,"semiNativeComponents",a.compData.id],e.pick(a,["compId","compData","styleParams","publicData","instance"]))},d)}function A(i,a){var n=i.getSiteData(),o=e.without(a,t.siteConstants.MASTER_PAGE_ID),r=e(o).transform(function(e,t){e[t]=I(n,t)},{}).omitBy(e.isEmpty).value();if(!e.isEmpty(r)){e.forEach(o,function(t){e.some(r[t],"semiNativeComponents")&&s.initContext(t,_(i),i)});h(i).initWidgets(r)}}function D(t,i,a){var n=function(t,i){var a=e.filter(t,function(t){return e.includes(i,t.rootId)});return e.map(a,"rootId")}(i,a);return e(t.getAllRenderedRootIds()).intersection(n).thru(e.isEmpty).value()?i:l(t,i,n)}function _(e){return e.getWixCodeAppApi()}return{getWidgetHandler:h,syncAppsState:g,handleRuntimeDalCompChange:function(t,i,a){var n=e.zipObject([{dataChange:"data",propsChange:"props",stateChange:"state",layoutChange:"layout"}[a.type]],[a.value]),s=e.zipObject([i],[n]);h(t).handleWidgetUpdate(s)},handleDisplayedJsonUpdate:function(e,t,i){p(e,t,i)},handleSiteMemberUpdate:function(e){var t=e.getSiteData().getSMbySiteExtensionInstanceForRmi();h(e).handleSiteMemberUpdate(t)},handleSvSessionUpdate:function(e){var t=e.getSiteData().getSvSession();h(e).handleSvSessionUpdate(t)},handleLocationUpdate:function(e,t){var i=e.getSiteData().getNavigationDataRmi(t);h(e).handleLocationUpdate(i)},updateCompsUnderRoot:p,createAndRegisterWidgetHandler:u,loadUserCode:function(t,i){var a=t.getSiteData(),n=v(i,a),s=d.appsUtils.getUserCodeDefinitions(a.getClientSpecMap(),n,a);e.isEmpty(s)||h(t).loadUserCode(s,n)},loadApps:y,initApps:A,stopApps:D,getContextInitData:I,registerWidgetMessageHandler:function(e,t){_(e).registerMessageHandler(t)},registerWidgetMessageModifier:function(e,t){_(e).registerMessageModifier(t)},sendMessageToWidget:function(e,t){_(e).sendMessage(t)},updateWixCodeModelDataAfterLogin:function(e,t){var i=e.getSiteData(),a=d.appsUtils.getApplications(i.getClientSpecMap(),t,i);h(e).updateWixCodeModelDataAfterLogin(a,t)},handleAppDataUpdate:function(e){var t=e.getSiteData().getAppsDataForRmi();h(e).handleAppDataUpdate(t)}}}),define("widgets/core/WidgetAspect",["lodash","coreUtils","widgets/core/widgetDataHelper","widgets/core/widgetService","widgets/core/modelBuilderDataHelper"],function(e,t,i,a,n){"use strict";function s(t){this._siteAPI=t,this._siteAPI.updateAspectGlobalData(r,{loadedAppsRoots:[]}),this._updateSiteCallBacks=[],this._onWidgetReady={},this._updating=!1,a.createAndRegisterWidgetHandler(t,this.updateSite.bind(this)),this._siteAPI.registerToSiteWillMount(o.bind(this)),this._siteAPI.registerToSiteWillUpdate(o.bind(this)),this._siteAPI.getRuntimeDal().registerChangeListener(e.partial(a.handleRuntimeDalCompChange,this._siteAPI)),this._siteAPI.getSiteDataAPI().registerDisplayedJsonUpdateCallback(e.partial(a.handleDisplayedJsonUpdate,this._siteAPI)),this._siteAPI.registerToFakeModeChange(e.partial(a.updateCompsUnderRoot,this._siteAPI)),this._siteAPI.registerClientSpecMapUpdateCallback(function(){a.handleSiteMemberUpdate(this._siteAPI),a.handleAppDataUpdate(this._siteAPI)}.bind(this)),this._siteAPI.registerToSvSessionChange(e.partial(a.handleSvSessionUpdate,this._siteAPI)),this.getWidgetHandler=e.partial(a.getWidgetHandler,this._siteAPI)}function o(){var e=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots;this._siteAPI.updateAspectGlobalData(r,{loadedAppsRoots:a.syncAppsState(this._siteAPI,e)})}var r="WidgetAspect";return s.prototype.init=function(){this._siteAPI.updateAspectGlobalData(r,{loadedAppsRoots:[]}),this._updateSiteCallBacks=[],this._updating=!1},s.prototype.updateSite=function(i){if(i&&this._updateSiteCallBacks.push(i),!this._updating){this._updating=!0;var a=this;t.animationFrame.request(function(){a._updating=!1,e.invokeMap(a._updateSiteCallBacks,e.call),a._updateSiteCallBacks=[]})}},s.prototype.allContextsReady=function(){var t=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots;return e(t).map("rootId").every(this.isContextReady.bind(this))},s.prototype.isContextReady=function(t){var a=this._siteAPI.getSiteData();if(a.isFirstRenderAfterSSR())return!0;var s=a.widgetsStore,o=i.getWidgetHandler(s),d=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots,u=e.map(d,"rootId"),p=function(t,i,a){return"masterPage"!==t?t:e.find(i,function(e){var t=a.getDataByQuery(e);return n.getWidgetType(t)===n.WIDGET_TYPES.PAGE})}(t,u,a);return!!e.isEmpty(d)||e.includes(u,p)&&o.isWidgetReady(p)},s.prototype.loadUserCode=function(e){a.loadUserCode(this._siteAPI,e)},s.prototype.updateWixCodeModelDataAfterLogin=function(){var t=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots;if(!e.isEmpty(t)){var i=e.map(t,"rootId");a.updateWixCodeModelDataAfterLogin(this._siteAPI,i)}},s.prototype.loadApps=function(e){if(this._siteAPI.getRenderFlag("initWixCode")){a.loadUserCode(this._siteAPI,e);var t=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots;this._siteAPI.updateAspectGlobalData(r,{loadedAppsRoots:a.loadApps(this._siteAPI,t,e)})}},s.prototype.initApps=function(e){this._siteAPI.getRenderFlag("initWixCode")&&a.initApps(this._siteAPI,e)},s.prototype.stopApps=function(e){var t=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots;this._siteAPI.updateAspectGlobalData(r,{loadedAppsRoots:a.stopApps(this._siteAPI,t,e)})},s.prototype.restartApps=function(){var t=this._siteAPI.getAspectGlobalData(r).loadedAppsRoots;if(!e.isEmpty(t)){var i=e.map(t,"rootId");this.stopApps(i),this.loadApps(i),this.initApps(i)}},s.prototype.registerToOnWidgetReady=function(t,i){e.isFunction(i)&&(this.isContextReady(t)?i():(this._onWidgetReady[t]||(this._onWidgetReady[t]=[]),this._onWidgetReady[t].push(i)))},s.prototype.pageNavigationInfoChanged=function(){a.handleLocationUpdate(this._siteAPI)},s.prototype.flushWidgetReady=function(t){var i=this._onWidgetReady[t];e.forEach(i,function(e){e()}),delete this._onWidgetReady[t]},s}),define("widgets/behaviors/widgetBehaviorHandler",["lodash"],function(e){"use strict";var t=["type","name","targetId"];return{handle:function(t,i,a){var n=i.getSiteAspect("WidgetAspect").getWidgetHandler();e.forEach(t,function(e){n.handleEvent(e.targetId,e.name,e.params,a)})},getUniqueIdentifier:function(i){var a=e.at(i,t);return a.push(i.params.callbackId),a.push(i.params.compId),a.join(",")}}}),define("widgets/behaviors/widgetBehaviorPreprocessor",["lodash"],function(e){"use strict";return function(t,i,a){return e.assign({},t,{targetId:function(e,t){var i=e.getRuntimeDal().getPageId(t);return i?"masterPage"===i?e.getSiteData().getFocusedRootId():i:null}(a,i.sourceId)})}}),define("widgets",["core","widgets/utils/wixCodeRemoteModelService","widgets/core/WidgetAspect","widgets/core/widgetDataHelper","widgets/core/modelBuilder","widgets/behaviors/widgetBehaviorHandler","widgets/behaviors/widgetBehaviorPreprocessor","widgets/messages/messageBuilder","widgets/utils/widgetModel","widgets/core/widgetService"],function(e,t,i,a,n,s,o,r,d,u){"use strict";return e.behaviorHandlersFactory.registerHandler("widget",s),e.behaviorHandlersFactory.registerBehaviorPreprocessor("widget",o),e.siteAspectsRegistry.registerSiteAspect("WidgetAspect",i),{wixCodeRemoteModelService:t,widgetDataHelper:a,messageBuilder:r,modelBuilder:n,widgetModel:d,widgetService:u}});
//# sourceMappingURL=widgets.min.js.map