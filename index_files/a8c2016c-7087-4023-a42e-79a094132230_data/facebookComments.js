define("facebookComments/skins/skins.json",[],function(){"use strict";var e={};return e["skins.core.FacebookCommentSkin"]={react:[["div","fb-root",[],{}],["div","facebook",[],{}],["div","facebookPreviewBlocker",[],{}]],params:{tdr:"URL"},paramsDefaults:{tdr:"BASE_THEME_DIRECTORY"},css:{"%fb-root":"display:none;",'%[data-state~="dark"]':"background:url([tdr]dark-facebook-comments.png) no-repeat;",'%[data-state~="light"]':"background:url([tdr]bright-facebook-comments.png) no-repeat;",'%[data-state~="mobileView"][data-state~="dark"]':"background:url([tdr]mobile-dark-facebook-comments.jpg) no-repeat;",'%[data-state~="mobileView"][data-state~="light"]':"background:url([tdr]mobile-bright-facebook-comments.jpg) no-repeat;",'%[data-state~="disabled"]':"pointer-events:none;"}},e}),define("facebookComments",["santaComponents","lodash","core","socialCommon","santaProps","skins","facebookComments/skins/skins.json"],function(e,o,t,s,i,n,a){"use strict";var r=t.compMixins,c=["xfbml.render","xfbml.resize","comment.create","comment.remove"],m={displayName:"WFacebookComment",mixins:[r.skinBasedComp,r.timeoutsMixin,s.facebookComponentMixin,s.socialCompMixin],scriptDesc:null,propTypes:{id:i.Types.Component.id.isRequired,isMobileView:i.Types.isMobileView.isRequired,compData:i.Types.Component.compData.isRequired,compProp:i.Types.Component.compProp.isRequired,registerReLayoutPending:i.Types.Layout.registerReLayoutPending.isRequired},statics:{useSantaTypes:!0},getInitialState:function(){return{ready:!1,lastEventTimeStamp:Date.now()}},commentsAreReady:function(){this.props.registerReLayoutPending(this.props.id),this.setState({lastEventTimeStamp:Date.now()})},subscribeToFacebookEvents:function(){o.forEach(c,function(e){window.FB.Event.subscribe(e,this.commentsAreReady)}.bind(this))},getHref:function(){return this.getSocialUrl()},componentDidMount:function(){window.fbAsyncInit=this.subscribeToFacebookEvents,window.FB&&this.subscribeToFacebookEvents()},componentWillUnmount:function(){window.FB&&o.forEach(c,function(e){window.FB.Event.unsubscribe(e,this.commentsAreReady)}.bind(this))},getSkinProperties:function(){return{facebook:{children:e.utils.createReactElement("div",{className:"fb-comments","data-href":this.getHref(),"data-width":this.props.isMobileView?320:this.props.compProp.width,"data-numposts":this.props.compProp.numPosts,"data-colorscheme":this.props.compProp.colorScheme,"data-mobile":!1})}}}};return t.compRegistrar.register("wysiwyg.viewer.components.WFacebookComment",m,!0),n.skinsMap.addBatch(a),m});
//# sourceMappingURL=facebookComments.min.js.map