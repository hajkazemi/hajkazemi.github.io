define("semiNativeComponent/skins/skins.json",[],function(){"use strict";var e={};return e["wysiwyg.viewer.skins.semiNativeComponentSkin"]={react:[["div","localContainer",[],{}]]},e}),define("semiNativeComponent",["core","santaProps","remoteDOM","skins","semiNativeComponent/skins/skins.json"],function(e,i,n,t,o){"use strict";var s=e.compMixins,a={displayName:"SemiNativeComponent",propTypes:{queueIndex:i.Types.SemiNative.queueIndex,isPreviewMode:i.Types.isPreviewMode,compData:i.Types.Component.compData.isRequired,clientSpecMap:i.Types.RendererModel.clientSpecMap.isRequired,registerReLayoutPending:i.Types.Layout.registerReLayoutPending,reLayoutIfPending:i.Types.Layout.reLayoutIfPending},mixins:[s.skinBasedComp],statics:{useSantaTypes:!0},getAppData:function(){return this.props.clientSpecMap[this.props.compData.applicationId]||{}},getSkinProperties:function(){return{localContainer:{style:{top:0,position:"absolute",width:"100%"},className:"app-"+this.getAppData().appDefinitionId+" "+this.props.id}}},componentDidMount:function(){var e=this.props;e.isPreviewMode||n.createContainer(e.queueIndex,this.refs.localContainer,e.id,function(){e.registerReLayoutPending(e.id),e.reLayoutIfPending()})},componentDidUpdate:function(e){var i=this.props;i.queueIndex!==e.queueIndex&&(this.refs.localContainer.innerHTML="",n.createContainer(i.queueIndex,this.refs.localContainer,i.id,function(){i.registerReLayoutPending(i.id),i.reLayoutIfPending()}))}};return e.compRegistrar.register("platform.components.semiNativeComponent",a,!0),t.skinsMap.addBatch(o),a});
//# sourceMappingURL=semiNativeComponent.min.js.map