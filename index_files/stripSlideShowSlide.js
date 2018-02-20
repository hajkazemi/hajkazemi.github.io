define("stripSlideShowSlide/skins/skins.json",[],function(){"use strict";var e={};return e["wysiwyg.common.components.stripSlideShowSlide.viewer.skins.stripSlideShowSlideSkin"]={react:[["div","background",[],{},["div","backgroundMedia",[],{}]],["div","borderNode",[],{}],["div","inlineContentParent",[],{},["div","inlineContent",[],{}]]],params:{brw:"BORDER_SIZE",brd:"BORDER_COLOR_ALPHA"},paramsDefaults:{brw:"0",brd:"color_11"},css:{"%borderNode":"border:[brw] solid [brd];position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;",'%[data-shouldhideoverflowcontent="true"]':"overflow:hidden;"}},e}),define("stripSlideShowSlide",["lodash","zepto","prop-types","reactDOM","components","containerCommon","core","skins","stripSlideShow","stripSlideShowSlide/skins/skins.json"],function(e,i,o,n,t,s,r,d,l,a){"use strict";var p=s.mixins.containerMixin,h={displayName:"stripSlideShowSlide",mixins:[t.mediaCommon.mediaLogicMixins.fill,p,r.compMixins.createChildComponentMixin],propTypes:{style:l.SlideShowSantaTypes.slideStyle,shouldHideOverflowContent:o.bool,flexibleBoxHeight:o.bool,onMouseEnter:o.func,onMouseLeave:o.func,parentId:o.string},statics:{applyCompSpecificDomOnlyPatches:function(e,o){i(n.findDOMNode(e)).data("min-height",o.minHeight)},useSantaTypes:!0,behaviors:t.mediaCommon.mediaBehaviors.fill},getSkinProperties:function(){return{"":{onMouseEnter:this.props.onMouseEnter,onMouseLeave:this.props.onMouseLeave,"data-flexibleboxheight":this.props.flexibleBoxHeight,"data-parent-id":this.props.parentId,"data-min-height":this.props.style.minHeight},background:this.createFillLayers(),inlineContent:{children:this.props.children},inlineContentParent:{style:{overflowX:this.props.shouldHideOverflowContent?"hidden":"visible",overflowY:this.props.shouldHideOverflowContent&&!this.props.flexibleBoxHeight?"hidden":"visible"}}}}};return r.compRegistrar.register("wysiwyg.viewer.components.StripContainerSlideShowSlide",h,!0),d.skinsMap.addBatch(a),h});
//# sourceMappingURL=stripSlideShowSlide.min.js.map