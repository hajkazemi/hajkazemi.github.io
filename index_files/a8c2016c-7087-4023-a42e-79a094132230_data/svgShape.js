function _defineProperty(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}define("svgShape/components/svgShape",["lodash","santaComponents","skins","utils","santaProps"],function(e,s,t,o,r){"use strict";var i=s.utils.skinsRenderer,p=t.skinsMap;return{displayName:"SvgShape",mixins:[s.mixins.baseCompMixin],statics:{useSantaTypes:!0},propTypes:{id:r.Types.Component.id,structure:r.Types.Component.structure,skin:r.Types.Component.skin,compData:r.Types.Component.compData.isRequired,compProp:r.Types.Component.compProp.isRequired,theme:r.Types.Component.theme,rootNavigationInfo:r.Types.Component.rootNavigationInfo,THEME_DATA:r.Types.Theme.THEME_DATA,svgString:r.Types.VectorImage.legacySvgString.isRequired,svgInfo:r.Types.VectorImage.legacySvgInfo.isRequired,styleId:r.Types.Component.styleId,linkRenderInfo:r.Types.Link.linkRenderInfo,serviceTopology:r.Types.ServiceTopology.serviceTopology,setCustomClickOccurred:r.Types.setCustomClickOccurred,isExperimentOpen:r.Types.isExperimentOpen,strokeWidth:r.Types.VectorImage.strokeWidth,isQAMode:r.Types.isQAMode,renderFixedPosition:r.Types.Component.renderFixedPosition},getSkinProperties:function(){var s=this.props.skin,r={"":{}},n=function(e,s){return"skins.viewer.svgshape.SvgShapeDefaultSkin"===s?'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376.654 376.654"><g><polygon points="298.185,264.061 149.092,352.082 0,264.061 0,88.021 149.092,0 298.185,88.021 "/></g></svg>':e||null}(this.props.svgString,s);if(n){var a=this.props.theme,c="",l=t.skinsMap.get("skins.viewer.svgshape.SvgShapeDefaultSkin",this.props.isExperimentOpen),g={},h=this.props.compData;if(h&&h.link){var v=o.linkRenderer.renderLink(h.link,this.props.linkRenderInfo,this.props.rootNavigationInfo);v.tabIndex="-1",n=function(s,t){var o="";return e.forOwn(t,function(e,s){o+=" "+s+'="'+e+'"'}),"<a"+o+">"+s+"</a>"}(n,v)}a&&(g={css:l.css,params:l.params,paramsDefaults:l.paramsDefaults},c='<style type="text/css">'+i.createSkinCss(g,a.style.properties,this.props.THEME_DATA,this.props.styleId,null,this.props.serviceTopology,function(e){return p.get(e)})+"</style>"),r[""]={"data-viewbox":this.props.svgInfo.viewBox,"data-strokewidth":this.props.strokeWidth,"data-svg-id":this.props.skin,"data-display-mode":this.props.compProp.maintainAspectRatio?"legacyFit":"stretch",key:!this.props.compProp.maintainAspectRatio&&this.props.strokeWidth?"stretchWithStroke":"noPoly",dangerouslySetInnerHTML:{__html:c+n||""},tabIndex:"0",role:"image",onKeyDown:function(s){if("Enter"===s.key||" "===s.key){var t=s.target.querySelector("a");e.invoke(t,"click")}}}}return this.updateRootRefDataStyles(r[""]),r},render:function(){var e=this.getSkinProperties();return i.renderSkinHTML(null,e,this.props.styleId,this.props.id,this.props.structure,this.props,this.state,this.props.isQAMode)}}}),define("svgShape/components/popupCloseIconButton",["lodash","svgShape/components/svgShape","santaProps","utils"],function(e,s,t,o){"use strict";var r=e.cloneDeep(s);return r.propTypes=e.defaults({closePopupPage:t.Types.popupPage.close},s.propTypes),r.displayName="PopupCloseIconButton",r.getSkinProperties=function(){var e=s.getSkinProperties.apply(this,arguments);return e[""].onClick=function(){this.props.closePopupPage()}.bind(this),e[""].style.cursor="pointer",e[""].role="button",e[""].onKeyDown=o.accessibility.keyboardInteractions.activateBySpaceOrEnterButton,e[""].tabIndex="0",e[""].title="Back to site",e[""]["aria-label"]="Back to site",e},r}),define("svgShape/components/vectorImage",["react-dom-factories","prop-types","lodash","core","santaProps"],function(e,s,t,o,r){"use strict";return{displayName:"VectorImage",mixins:[o.compMixins.skinBasedComp],statics:{useSantaTypes:!0},propTypes:{id:r.Types.Component.id,styleId:r.Types.Component.styleId,style:r.Types.Component.style,svgId:r.Types.VectorImage.svgId,link:r.Types.VectorImage.link,compProp:r.Types.Component.compProp,theme:r.Types.Component.theme,svgString:r.Types.VectorImage.svgString,svgInfo:r.Types.VectorImage.svgInfo,svgType:r.Types.VectorImage.svgType,overrideColorsAsCss:r.Types.VectorImage.overrideColorsAsCss,shapeStyle:r.Types.VectorImage.shapeStyle,preserveViewBox:s.bool},getSkinProperties:function(){var s=void 0,r=t.get(this.props.shapeStyle,"strokeWidth"),i=t.get(this.props.svgInfo,"viewBox",""),p={"":{"data-svg-id":this.props.svgId,"data-display-mode":this.props.compProp.displayMode,"data-strokewidth":r,"data-viewbox":i,"data-preserve-viewbox":this.props.preserveViewBox?"preserve":"ignore",style:this.props.style},link:function(s){var o=void 0;return t.isEmpty(s)?o={parentConst:e.div}:(o=s).style={cursor:"pointer"},o}(this.props.link),svg:{style:this.props.shapeStyle,className:this.classSet(_defineProperty({},this.props.id,!0)),key:this.props.compProp.displayMode+(r?"_stroke":"_nostroke"),dangerouslySetInnerHTML:{__html:this.props.svgString}}};if(!t.isEmpty(this.props.overrideColorsAsCss)){var n=function(e,s,o){return t.reduce(e,function(e,t){return e+" ."+s+"_"+o+" "+t},"")}(this.props.overrideColorsAsCss,this.props.styleId,this.props.id);s=o.createReactElement("style",{dangerouslySetInnerHTML:{__html:n}}),p[""].addChildren=[s]}return p}}}),define("svgShape/skins/skins.json",[],function(){"use strict";var e={};return e["skins.viewer.svgshape.SvgShapeDefaultSkin"]={react:[],params:{fillcolor:"COLOR","alpha-fillcolor":"ALPHA",stroke:"BORDER_COLOR_ALPHA",strokewidth:"BORDER_SIZE"},paramsDefaults:{fillcolor:"color_11","alpha-fillcolor":"1",stroke:"color_15",strokewidth:"1px"},css:{"% svg":"width:100%;height:100%;position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;fill:[fillcolor];fill-opacity:[alpha-fillcolor];stroke:[stroke];stroke-width:[strokewidth];","% svg *":"vector-effect:non-scaling-stroke;","% a":"display:block;height:100%;"}},e["skins.viewer.VectorImageShapeBasicSkin"]={react:[["div","svg",[],{}],["a","link",[],{}]],params:{fillcolor:"BG_COLOR_ALPHA"},paramsDefaults:{fillcolor:"color_18"},css:{"% svg":"width:100%;height:100%;fill:[fillcolor];","% svg *":"vector-effect:non-scaling-stroke;"}},e["skins.viewer.VectorImageSkin"]={react:[["div","svg",[],{}],["a","link",[],{}]],css:{"%link,%svg":"position:absolute;top:0;right:0;bottom:0;left:0;","% svg":"position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;margin:auto;","% svg *":"vector-effect:non-scaling-stroke;"}},e}),define("svgShape/util/svgShapeDataRequirementsChecker",["core","lodash","utils"],function(e,s,t){"use strict";function o(e,o,r){return s(r).without("skins.viewer.svgshape.SvgShapeDefaultSkin").map(s.partial(t.svg.createSvgFetchRequest,e,o,s)).compact().value()}function r(e,s){return o(e.serviceTopology.mediaRootUrl,e,s.skins)}var i=e.dataRequirementsChecker;return i.registerCheckerForCompType("wysiwyg.viewer.components.svgshape.SvgShape",r),i.registerCheckerForCompType("wysiwyg.viewer.components.PopupCloseIconButton",r),{requirementChecker:o,DEFAULT_SHAPE:t.svg.EMPTY_SHAPE,SVG_ROOT:t.svg.SVG_ROOT}}),define("svgShape/util/vectorImageDataRequirementsChecker",["lodash","core","utils"],function(e,s,t){"use strict";var o=s.dataRequirementsChecker,r=t.svg;o.registerCheckerForCompType("wysiwyg.viewer.components.VectorImage",function(s,t){return e.compact([r.createSvgFetchRequest(s.serviceTopology.mediaRootUrl,s,e.get(t,["data","svgId"],e.get(t,["style","style","properties","svgId"])))])})}),define("svgShape",["core","svgShape/components/popupCloseIconButton","svgShape/components/svgShape","svgShape/components/vectorImage","skins","svgShape/skins/skins.json","svgShape/util/svgShapeDataRequirementsChecker","svgShape/util/vectorImageDataRequirementsChecker"],function(e,s,t,o,r,i){"use strict";return e.compRegistrar.register("wysiwyg.viewer.components.svgshape.SvgShape",t,!0).register("wysiwyg.viewer.components.VectorImage",o,!0).register("wysiwyg.viewer.components.PopupCloseIconButton",s,!0),r.skinsMap.addBatch(i),{popupCloseIconButton:s,svgShape:t,vectorImage:o}});
//# sourceMappingURL=svgShape.min.js.map