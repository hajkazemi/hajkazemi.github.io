define("containerCommon/mixins/containerMixin",["lodash","core","prop-types","santaProps"],function(t,o,e,i){"use strict";return{mixins:[o.compMixins.skinBasedComp],propTypes:{windowScrollEventAspect:i.Types.SiteAspects.windowScrollEvent.isRequired,compActions:i.Types.Component.compActions.isRequired,isMobileView:i.Types.isMobileView,getRootIdsWhichShouldBeRendered:i.Types.getRootIdsWhichShouldBeRendered.isRequired,rootId:i.Types.Component.rootId,pageStub:e.bool},getInitialState:function(){return this.props.compActions.scroll&&this.props.windowScrollEventAspect.registerToScroll(this),function(t){var o={};return t&&(o.$mobile="mobileView"),o}(this.props.isMobileView)},componentWillReceiveProps:function(o){this.props.compActions.scroll&&t.isUndefined(o.compActions.scroll)&&this.props.windowScrollEventAspect.unregisterToScroll(this),o.compActions.scroll&&t.isUndefined(this.props.compActions.scroll)&&o.windowScrollEventAspect.registerToScroll(this)},onScroll:function(t,o){var e={left:t.x,top:t.y,direction:o};this.handleAction("scroll",e)}}}),define("containerCommon/skins/skins.json",[],function(){"use strict";var t={};return t["wysiwyg.viewer.skins.mediaContainer.DefaultMediaContainer"]={react:[["div","container",[],{},["div","background",[],{}],["div","inlineContentParent",[],{},["div","inlineContent",[],{}]]]],css:{"%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%container":"position:absolute;top:0;left:0;width:100%;height:100%;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.AppleScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{shd:"BOX_SHADOW",bg:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",brw:"SIZE",brd:"BORDER_COLOR_ALPHA",tdr:"URL"},paramsDefaults:{shd:"0 1px 3px rgba(0, 0, 0, 0.5)",bg:"color_11",rd:"0",brw:"0",brd:"color_15",tdr:"BASE_THEME_DIRECTORY"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];[rd]  border:[brw] solid [brd];background-image:url([tdr]apple_box.png);background-repeat:repeat-x;background-position:0 0;","%inlineContent":"position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.GradientBottomScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{tdr:"URL",bgc:"BG_COLOR_ALPHA"},paramsDefaults:{tdr:"BASE_THEME_DIRECTORY",bgc:"color_11"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;background-image:url([tdr]gradient_bottom_white.png);background-repeat:repeat-x;background-position:0 100%;background-color:[bgc];",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.GradientTopScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{tdr:"URL",bgc:"BG_COLOR_ALPHA"},paramsDefaults:{tdr:"BASE_THEME_DIRECTORY",bgc:"color_11"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;background-image:url([tdr]gradient_top_white.png);background-repeat:repeat-x;background-color:[bgc];",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.GrassScreen"]={react:[["div","screenWidthBackground",["_grass"],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{bgc:"BG_COLOR_ALPHA",$BorderRadius:"BORDER_RADIUS",$boxShadow:"BOX_SHADOW",baseThemeDir:"URL"},paramsDefaults:{bgc:"color_11",$BorderRadius:"10px",$boxShadow:"0 1px 3px rgba(0, 0, 0, 0.8)",baseThemeDir:"BASE_THEME_DIRECTORY"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%centeredContent":"position:absolute;left:0;height:100%;","%bg":"position:absolute;top:10px;right:0;bottom:10px;left:0;background-color:[bgc];[$BorderRadius]  [$boxShadow]","%inlineContent":"position:absolute;top:50px;right:0;bottom:50px;left:0;","%_grass":"background-image:url([baseThemeDir]bg_grass.jpg);"}},t["wysiwyg.viewer.skins.screenwidthcontainer.GridScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{bg:"BG_COLOR_ALPHA",xxx:"BG_COLOR_ALPHA",tdr:"URL"},paramsDefaults:{bg:"color_11",xxx:"color_1",tdr:"BASE_THEME_DIRECTORY"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bg];background:[xxx] url([tdr]net.png) center center repeat;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;background:#fff url([tdr]grid.png) repeat-y 50% 0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.LiftedShadowScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div",null,["_left","_shd"],{}],["div",null,["_right","_shd"],{}],["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{shd:"BOX_SHADOW",bg:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",brw:"SIZE",brd:"BORDER_COLOR_ALPHA",tdr:"URL"},paramsDefaults:{shd:"0 1px 3px rgba(0, 0, 0, 0.5)",bg:"color_11",rd:"0",brw:"0",brd:"color_15",tdr:"BASE_THEME_DIRECTORY"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bg];[rd]  border:[brw] solid [brd];","%_shd":"position:absolute;bottom:-26px;width:165px;height:26px;background-image:url([tdr]liftedshadow_medium.png);background-repeat:no-repeat;pointer-events:none;","%_left":"left:-20px;background-position:0 0;","%_right":"right:-20px;background-position:100% 0;","%inlineContent":"position:absolute;top:[brw];right:[brw];bottom:[brw];left:[brw];","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.PopupOverlayContainer"]={react:[["div","background",[],{}],["div","inlineContent",[],{}]],css:{"%inlineContent,%background":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.ShadowScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{shd:"BOX_SHADOW",bgc:"BG_COLOR_ALPHA",clr:"BORDER_COLOR_ALPHA",xxx:"BG_COLOR_ALPHA",tdr:"URL"},paramsDefaults:{shd:"0 0 5px rgba(0, 0, 0, 0.5)",bgc:"color_11",clr:"color_15",xxx:"color_11",tdr:"BASE_THEME_DIRECTORY"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]  background-color:[bgc];border:1px solid [clr];background:[xxx] url([tdr]net.png) center center repeat;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.SimpleScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{bgc1:"BG_COLOR_ALPHA",bgc2:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",shd:"BOX_SHADOW"},paramsDefaults:{bgc1:"color_11",bgc2:"color_11",rd:"5px",shd:"0 1px 3px rgba(0, 0, 0, 0.5)"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc1];",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%centeredContent":"position:absolute;left:0;height:100%;","%bg":"position:absolute;top:10px;right:0;bottom:10px;left:0;background-color:[bgc2];[rd]  [shd]","%inlineContent":"position:absolute;top:20px;right:20px;bottom:20px;left:20px;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.TransparentHalfScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{}],["div","inlineContent",[],{}]]],params:{xxx:"BG_COLOR_ALPHA",tdr:"URL",bgc1:"BG_COLOR",bgc2:"BG_COLOR"},paramsDefaults:{xxx:"color_1",tdr:"BASE_THEME_DIRECTORY",bgc1:"color_15",bgc2:"color_15"},paramsMutators:{bgc1:{type:"alpha",value:.1},bgc2:{type:"alpha",value:.5}},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc1];background:[xxx] url([tdr]net.png) center center repeat;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc2];","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.screenwidthcontainer.TwoColorScreen"]={react:[["div","screenWidthBackground",[],{}],["div","centeredContent",[],{},["div","bg",[],{},["div","inlineContent",[],{}]]]],params:{bgc1:"BG_COLOR_ALPHA",brw:"BORDER_TOP_SIZE",brw1:"BORDER_BOTTOM_SIZE",xxx:"BG_COLOR_ALPHA",tdr:"URL",bgc2:"BG_COLOR_ALPHA"},paramsDefaults:{bgc1:"color_11",brw:"1px",brw1:"0",xxx:"color_11",tdr:"BASE_THEME_DIRECTORY",bgc2:"color_11"},css:{"%screenWidthBackground":"position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc1];border-top:[brw] solid #f00;border-bottom:[brw1] solid #f00;overflow:hidden;background:[xxx] url([tdr]net.png) center center repeat;",'%[data-state~="fixedPosition"]':"position:fixed !important;left:auto !important;z-index:50;",'%[data-state~="fixedPosition"]%_footer':"top:auto;bottom:0;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;background-color:[bgc2];","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%centeredContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t["wysiwyg.viewer.skins.stripContainer.DefaultStripContainer"]={react:[["div","background",[],{}],["div","inlineContent",[],{}]],css:{"%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;"}},t}),define("containerCommon",["containerCommon/mixins/containerMixin","santaComponents","skins","containerCommon/skins/skins.json"],function(t,o,e,i){"use strict";return e.skinsMap.addBatch(i),{mixins:{containerMixin:t,fixedPositionContainerMixin:o.mixins.fixedPositionContainerMixin}}});
//# sourceMappingURL=containerCommon.min.js.map