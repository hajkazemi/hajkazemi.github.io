define("wTwitterFollow/skins/skins.json",[],function(){"use strict";var e={};return e["skins.core.TwitterFollowSkin"]={react:[["iframe","iframe",[],{allowFullScreen:!0,frameBorder:0,scrolling:"no"}]],css:{}},e}),define("wTwitterFollow",["lodash","core","utils","santaProps","socialCommon","skins","wTwitterFollow/skins/skins.json"],function(e,t,o,i,s,r,n){"use strict";var a={displayName:"WTwitterFollow",mixins:[t.compMixins.skinBasedComp,s.twitterComponentMixin],propTypes:{compData:i.Types.Component.compData.isRequired,compProp:i.Types.Component.compProp.isRequired,id:i.Types.Component.id.isRequired,origin:i.Types.Location.origin,santaBase:i.Types.santaBase.isRequired},statics:{useSantaTypes:!0},getIFrameSrc:function(){var e=function(e){return e.accountToFollow.replace("@","")}(this.props.compData),t={screen_name:e,href:"https://twitter.com/"+e,show_count:this.props.compProp.showCount.toString(),show_screen_name:this.props.compProp.showScreenName.toString(),lang:this.getLanguage(),align:"left",compId:this.props.id,origin:this.props.origin,widgetType:"FOLLOW"};return this.props.santaBase+"/static/external/twitter.html?"+o.urlUtils.toQueryString(t)},getIframeTitleName:function(){return"component_label_ twitterTweetTitle"}};return t.compRegistrar.register("wysiwyg.viewer.components.WTwitterFollow",a,!0),r.skinsMap.addBatch(n),a});
//# sourceMappingURL=wTwitterFollow.min.js.map