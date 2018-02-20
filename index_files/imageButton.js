define("imageButton/skins/skins.json",[],function(){"use strict";var e={};return e["wysiwyg.common.components.imagebutton.viewer.skins.ImageButtonSkin"]={react:[["a","link",[],{},["div",null,["_correct-positioning"],{},["div","defaultImage",[],{}]],["div",null,["_correct-positioning"],{},["div","hoverImage",[],{}]],["div",null,["_correct-positioning"],{},["div","activeImage",[],{}]]]],exports:{defaultImage:{skin:"skins.core.ImageNewSkin"},hoverImage:{skin:"skins.core.ImageNewSkin"},activeImage:{skin:"skins.core.ImageNewSkin"}},params:{fade_next:"TRANSITION",fade_prev:"TRANSITION"},paramsDefaults:{fade_next:"opacity 0.1s ease 0s",fade_prev:"opacity 0.5s ease 0s"},css:{"%link":"position:relative;display:block;z-index:0;overflow:visible;-ms-touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;","%link:after":'content:"";position:absolute;z-index:5;width:100%;height:100%;display:block;',"%defaultImage":"position:absolute;opacity:1;","%hoverImage":"position:absolute;opacity:0;","%activeImage":"position:absolute;opacity:0;","%_correct-positioning":"position:absolute;",'%[data-state~="hovered"] %defaultImage':"opacity:0;",'%[data-state~="hovered"] %hoverImage':"opacity:1;",'%[data-state~="hovered"] %activeImage':"opacity:0;",'%[data-state~="pressed"] %defaultImage':"opacity:0;",'%[data-state~="pressed"] %hoverImage':"opacity:0;",'%[data-state~="pressed"] %activeImage':"opacity:1;",'%[data-state~="transition_fade"][data-state~="prepare_adh"] %defaultImage,%[data-state~="transition_fade"][data-state~="prepare_ahd"] %hoverImage,%[data-state~="transition_fade"][data-state~="prepare_dah"] %activeImage,%[data-state~="transition_fade"][data-state~="prepare_dha"] %hoverImage,%[data-state~="transition_fade"][data-state~="prepare_had"] %activeImage,%[data-state~="transition_fade"][data-state~="prepare_hda"] %defaultImage':"z-index:1;[fade_next]",'%[data-state~="transition_fade"][data-state~="prepare_adh"] %activeImage,%[data-state~="transition_fade"][data-state~="prepare_ahd"] %activeImage,%[data-state~="transition_fade"][data-state~="prepare_dah"] %defaultImage,%[data-state~="transition_fade"][data-state~="prepare_dha"] %defaultImage,%[data-state~="transition_fade"][data-state~="prepare_had"] %hoverImage,%[data-state~="transition_fade"][data-state~="prepare_hda"] %hoverImage,%[data-state~="transition_fade"][data-state~="prepare_adh"] %hoverImage':"z-index:3;[fade_prev]",'%[data-state~="transition_fade"][data-state~="prepare_ahd"] %defaultImage,%[data-state~="transition_fade"][data-state~="prepare_dah"] %hoverImage,%[data-state~="transition_fade"][data-state~="prepare_dha"] %activeImage,%[data-state~="transition_fade"][data-state~="prepare_had"] %defaultImage,%[data-state~="transition_fade"][data-state~="prepare_hda"] %activeImage':"z-index:2;[fade_prev]"}},e}),define("imageButton",["lodash","core","santaProps","utils","image","skins","imageButton/skins/skins.json"],function(e,t,a,n,o,s,i){"use strict";function r(e){e.component.setState({$prepare:e.preTransitionClass}),n.animationFrame.request(function(){e.component._isMounted&&e.component.setState(e.state)})}function p(e){e.state.$pressed&&r({component:e,preTransitionClass:"prepare_adh",state:{$pressed:"",$hovered:""}})}function d(e){e.state.$pressed?p(e):e.state.$hovered&&r({component:e,preTransitionClass:"prepare_hda",state:{$hovered:""}})}function c(t,a){var o=t.props.compData[a];if(!o)return{};o=e.assign({alt:t.props.compData.alt},o);var s={id:t.props.id+a,ref:a,skinPart:a,imageData:o,containerWidth:t.props.style.width,containerHeight:t.props.style.height,displayMode:n.imageUtils.fittingTypes.LEGACY_FULL};return t.createChildComponent(o,"core.components.Image",a,s)}var m=t.compMixins,u={displayName:"ImageButton",mixins:[m.timeoutsMixin,m.skinBasedComp,m.createChildComponentMixin],propTypes:e.assign({compData:a.Types.Component.compData,compProp:a.Types.Component.compProp,linkRenderInfo:a.Types.Link.linkRenderInfo,rootNavigationInfo:a.Types.Component.rootNavigationInfo,style:a.Types.Component.style,windowFocusEvents:a.Types.SiteAspects.windowFocusEvents},a.santaTypesUtils.getSantaTypesByDefinition(o)),statics:{useSantaTypes:!0},getInitialState:function(){return this.blurEventAspect=this.props.windowFocusEvents,this.blurEventAspect.registerToFocusEvent("blur",this),{$opacity:"supports_opacity",$transition:"transition_"+this.props.compProp.transition,$prepare:"",$hovered:"",$pressed:""}},getSkinProperties:function(){var e=this,t={onMouseEnter:function(){!function(e){e.state.$hovered||r({component:e,preTransitionClass:"prepare_dha",state:{$hovered:"hovered"}})}(e)},onMouseLeave:function(){d(e)},onMouseDown:function(){!function(e){e.state.$pressed||r({component:e,preTransitionClass:"prepare_had",state:{$pressed:"pressed"}})}(e)},onMouseUp:function(){!function(e){e.state.$pressed&&r({component:e,preTransitionClass:"prepare_ahd",state:{$pressed:""}})}(e)},onDragStart:function(e){e.preventDefault()},onTouchStart:function(){!function(e){e.state.$pressed||r({component:e,preTransitionClass:"prepare_dah",state:{$pressed:"pressed"}})}(e)},onTouchEnd:function(){e._isMounted&&p(e)},onTouchMove:function(){e.state.$pressed&&(e.timeoutidToRemoveOnUnmount=e.setTimeout(t.onTouchEnd,500))},onClick:function(){p(e)}};return{"":t,defaultImage:c(e,"defaultImage"),hoverImage:c(e,"hoverImage"),activeImage:c(e,"activeImage"),link:function(e,t){var a={};return t.linkRef&&(a=t.linkRef,a=n.linkRenderer.renderLink(a,t.linkRenderInfo,t.rootNavigationInfo)),a.title=t.title,a.style={width:e.props.style.width,height:e.props.style.height},a}(e,{linkRef:e.props.compData.link,title:e.props.compData.alt,linkRenderInfo:e.props.linkRenderInfo,rootNavigationInfo:e.props.rootNavigationInfo})}},onBlur:function(){d(this)},componentDidMount:function(){this._isMounted=!0},componentWillUnmount:function(){clearTimeout(this.timeoutidToRemoveOnUnmount),this._isMounted=!1,this.blurEventAspect.unregisterFromFocusEvent("blur",this)}};return t.compRegistrar.register("wysiwyg.common.components.imagebutton.viewer.ImageButton",u,!0),s.skinsMap.addBatch(i),u});
//# sourceMappingURL=imageButton.min.js.map