define("socialCommon/santaTypes/socialSantaTypes",["prop-types","santaProps"],function(t,e){"use strict";return{CurrentPageSocialUrl:e.createSantaType(t.string,function(t,i){var o=t.fetchSantaType(e.Types.Component.compData,t,i),s=e.Types.urlFormat.fetch(t,i),n=o?o.urlFormat:s,a=e.Types.getCurrentUrl.fetch(t,i)(n,void 0,n!==s);return o&&o.isHttpsEnabled?a:a.replace(/^https:/,"http:")}),MainPageSocialUrl:e.createSantaType(t.string,function(t,i){var o=t.fetchSantaType(e.Types.Component.compData,t,i),s=e.Types.urlFormat.fetch(t,i),n=o?o.urlFormat:s,a=e.Types.getMainPageUrl.fetch(t,i)(n);return o&&o.isHttpsEnabled?a:a.replace(/^https:/,"http:")})}}),define("socialCommon/mixins/socialCompMixin",["santaProps","socialCommon/santaTypes/socialSantaTypes"],function(t,e){"use strict";return{propTypes:{compData:t.Types.Component.compData,currentPageSocialUrl:e.CurrentPageSocialUrl,mainPageSocialUrl:e.MainPageSocialUrl},getSocialUrl:function(t){return t?this.props.mainPageSocialUrl:this.props.currentPageSocialUrl}}}),define("socialCommon/mixins/facebookComponentMixin",["lodash","reactDOM","santaProps"],function(t,e,i){"use strict";return{getInitialState:function(){return this._lastHref=this.getHref(this.props),{}},propTypes:{externalScriptLoader:i.Types.SiteAspects.externalScriptLoader,cookie:i.Types.RequestModel.cookie,currentUrl:i.Types.currentUrl,userLanguage:i.Types.WixUserSantaTypes.userLanguage.isRequired},loadScript:function(){"undefined"==typeof window||window.FB||this.props.externalScriptLoader.loadScript("FACEBOOK",null,{currentUrl:this.props.currentUrl,cookie:this.props.cookie,userLanguage:this.props.userLanguage})},parseFacebookPluginDomNode:function(){t.has(window,"FB.XFBML.parse")&&window.FB.XFBML.parse(e.findDOMNode(this))},componentDidMount:function(){this.loadScript(),this.parseFacebookPluginDomNode()},componentDidUpdate:function(e){var i=this.getHref(this.props);t.isEqual(e.compData,this.props.compData)&&t.isEqual(e.compProp,this.props.compProp)&&!function(t,e){return!!(t&&t.height&&t.width&&e&&e.height&&e.width)&&(t.height!==e.height||t.width!==e.width)}(e.style,this.props.style)&&i===this._lastHref||this.parseFacebookPluginDomNode(),this._lastHref=i}}}),define("socialCommon/mixins/twitterComponentMixin",["lodash","coreUtils","santaProps"],function(t,e,i){"use strict";return{getInitialState:function(){return{width:this.props.style.width,height:this.props.style.height}},propTypes:{compProp:i.Types.Component.compProp.isRequired,id:i.Types.Component.id.isRequired,style:i.Types.Component.style.isRequired,userLanguage:i.Types.WixUserSantaTypes.userLanguage.isRequired},componentDidMount:function(){window.addEventListener("message",this.processMessage)},componentWillUnmount:function(){window.removeEventListener("message",this.processMessage)},processMessage:function(t){t.data&&"twitterSize"===t.data.type&&t.data.compId===this.props.id&&(this.registerReLayout(),this.setState(t.data.size))},getLanguage:function(){return function(t,e){return"userLang"===t?e:t}(this.props.compProp.dataLang,this.props.userLanguage)},getIframeTitle:function(){var t=this.getLanguage();return e.translationsLoader.getTranslationAllKeys("component_label",t,this.getIframeTitleName())},getSkinProperties:function(){return{"":{style:{width:this.state.width,height:this.state.height},title:this.getIframeTitle(),"aria-label":this.getIframeTitle(),tabIndex:0},iframe:{"data-src":this.getIFrameSrc(),width:this.state.width,height:this.state.height,title:this.getIframeTitle(),"aria-label":this.getIframeTitle()}}}}}),define("socialCommon",["socialCommon/mixins/socialCompMixin","socialCommon/mixins/facebookComponentMixin","socialCommon/mixins/twitterComponentMixin"],function(t,e,i){"use strict";return{socialCompMixin:t,facebookComponentMixin:e,twitterComponentMixin:i}});
//# sourceMappingURL=socialCommon.min.js.map