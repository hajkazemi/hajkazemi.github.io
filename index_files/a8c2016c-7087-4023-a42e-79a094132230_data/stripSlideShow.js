define("stripSlideShow/common/SlideShowSantaTypes",["lodash","prop-types","santaComponents","santaProps"],function(t,o,e,i){"use strict";var n=i.createSantaType,s=["wysiwyg.viewer.components.BoxSlideShowSlide","wysiwyg.viewer.components.StripContainerSlideShowSlide"],r=n(o.array,function(o,e){var i=o.siteAPI.getDisplayedDAL(),n=o.siteAPI.getPointers(),r=n.components.getPage(e.rootId,o.siteData.getViewMode()),a=n.components.getComponent(e.structure.id,r),l=n.components.getChildren(a);return t.transform(l,function(o,e,r){var a=n.getInnerPointer(e,"componentType"),l=i.get(a);t.includes(s,l)&&o.push(r)},[])}),a=n(o.bool,function(t,o){return!i.Types.isZoomOpened.fetch(t,o)&&i.Types.RenderFlags.isPlayingAllowed.fetch(t,o)&&!!t.fetchSantaType(i.Types.Component.compProp,t,o).autoPlay&&r.fetch(t,o).length>1}),l=n(o.func,function(o,e){return"undefined"!=typeof window?function(t,n){return setInterval(function(){var n=i.Types.isZoomOpened.fetch(o,e);i.Types.viewportStates.fetch(o,e).in&&!n&&t()},n)}:t.noop}),p=n(o.func,function(){return"undefined"!=typeof window?function(t){clearInterval(t)}:t.noop});return{slideStyle:n(o.object,function(o,i){var n=o.siteData,s=o.siteAPI,r=o.fetchSantaType(e.santaTypesDefinitions.Component.style,o,i),a=s.getPointers(),l=s.getDisplayedDAL(),p=a.components.getPage(i.rootId,n.getViewMode()),d=a.components.getComponent(i.structure.id,p),h=a.components.getParent(d),c=a.getInnerPointer(h,["layout","height"]),u=l.get(c);return t.defaults({minHeight:u},r)}),canAutoPlay:a,slidesIndexes:r,startAutoPlayInViewport:l,stopAutoPlayInViewport:p}}),define("stripSlideShow/common/boxSlideShowAutoPlay",["santaProps","stripSlideShow/common/SlideShowSantaTypes"],function(t,o){"use strict";return{propTypes:{id:t.Types.Component.id.isRequired,compProp:t.Types.Component.compProp.isRequired,startAutoPlayInViewport:o.startAutoPlayInViewport.isRequired,stopAutoPlayInViewport:o.stopAutoPlayInViewport.isRequired},toggleAutoPlay:function(){this.setState({autoPlay:!this.state.autoPlay},this.updateAutoPlayState)},updateAutoPlayState:function(){if(this.props.stopAutoPlayInViewport(this.timeoutId),this.state.autoPlay){var t=1e3*this.props.compProp.autoPlayInterval;this.timeoutId=this.props.startAutoPlayInViewport(this.clickMoveToNextSlide,t)}},componentDidMount:function(){this.updateAutoPlayState()},componentWillUnmount:function(){this.props.stopAutoPlayInViewport(this.timeoutId)}}}),define("stripSlideShow/common/slideNavigationMixin",["santaComponents","lodash","core","santaProps","stripSlideShow/common/boxSlideShowAutoPlay","stripSlideShow/common/SlideShowSantaTypes"],function(t,o,e,i,n,s){"use strict";function r(t,o){var e=t.selectedButtonSizeRatio||1;return Math.floor(o*e)}function a(t){return{currentIndex:o.get(t,"currentIndex",0),isPlaying:o.get(t,"autoPlay",!1)}}var l=e.compMixins,p={center:"center",left:"flex-start",right:"flex-end"},d=e.componentUtils.boxSlideShowCommon;return{propTypes:{triggerFakeModeChange:i.Types.Modes.triggerFakeModeChange.isRequired,compProp:i.Types.Component.compProp.isRequired,canAutoPlay:s.canAutoPlay.isRequired,slidesIndexes:s.slidesIndexes.isRequired},mixins:[l.skinBasedComp,l.timeoutsMixin,n,l.animationsMixin,l.compStateMixin(a)],getInitialState:function(){return this.reverse=!1,this.isDirectionLeftToRight="LTR"===this.props.compProp.direction,o.assign(a(null,this.props.compProp),{isInTransition:!1,autoPlay:this.props.canAutoPlay})},setCurrentSlideAndRegisterRelayout:function(t,e,i,n){if(!this.state.isInTransition||e){this.registerReLayout();var s=o.isFunction(n)?n:o.noop;this.setState({currentIndex:t,isInTransition:i},function(){this.props.triggerFakeModeChange(this.props.currentUrlPageId,this.props.id),s(),this.handleAction("change")})}},componentWillReceiveProps:function(t){if(this.props.compProp.direction!==t.compProp.direction&&(this.isDirectionLeftToRight="LTR"===t.compProp.direction),t.children){var e=this.props.slidesIndexes.length,i=t.slidesIndexes.length;if(i<e){var n=o.map(t.children,"ref"),s=o.map(this.props.children,"ref"),r=s[this.state.currentIndex],a=o.difference(s,n),l=o.indexOf(s,a[0]),p=this.state.currentIndex>0?this.state.currentIndex-1:0;o.includes(n,r)?p=n.indexOf(r):p>=i&&(p=i-1);var d=this.state.currentIndex>=i;if(this.state.currentIndex!==p){var h=this.state.currentIndex===l;this.setCurrentSlideAndRegisterRelayout(p,d,h)}}t.canAutoPlay!==this.state.autoPlay&&this.setState({autoPlay:t.canAutoPlay},this.setAutoPlayStateCallBack)}},setAutoPlayStateCallBack:function(){this.handleAction(this.state.autoPlay?"autoplayOn":"autoplayOff"),this.updateAutoPlayState()},createDotsNavigationButtons:function(){var e=this.getSkinExports(),i=[];return o.forEach(this.props.slidesIndexes,function(o){var n=this.state.currentIndex===o,s=n?r(e,this.props.compProp.navigationDotsSize):this.props.compProp.navigationDotsSize,a={className:this.classSet({"navigation-dot":!0,selected:n})+" reset-button",style:{width:s,height:s,marginRight:this.props.compProp.navigationDotsGap/2,marginLeft:this.props.compProp.navigationDotsGap/2},"aria-label":"Go to slide "+(o+1)};i.push(t.utils.createReactElement("li",{className:this.classSet({"navigation-dot-wrapper":!0}),onClick:this.moveToSlide.bind(this,o),children:t.utils.createReactElement("button",a)}))}.bind(this)),i},getDotsNavigationWrapperStyle:function(){var t=r(this.getSkinExports(),this.props.compProp.navigationDotsSize);return{bottom:this.props.compProp.navigationDotsMargin-.5*t,justifyContent:this.getDotsAlignment(),WebkitJustifyContent:this.getDotsAlignment()}},moveNextSlide:function(t){if(!this.state.isInTransition){this.reverse=!1;var o=d.getNextSlideIndex(this.props.slidesIndexes,this.state.currentIndex);this.setCurrentSlideAndRegisterRelayout(o,!1,!0,t)}},movePreviousSlide:function(t){if(!this.state.isInTransition){this.reverse=!0;var o=d.getPrevSlideIndex(this.props.slidesIndexes,this.state.currentIndex);this.setCurrentSlideAndRegisterRelayout(o,!1,!0,t)}},isSlideDirectionReversed:function(t){var o=this.state.currentIndex;return t>o?0===o&&t===this.props.slidesIndexes.length-1:!(0===t&&o===this.props.slidesIndexes.length-1)},moveToSlide:function(t,e){t===this.state.currentIndex||this.state.isInTransition?o.isFunction(e)&&e():o.isNumber(t)&&t>=0&&t<this.props.slidesIndexes.length&&(this.reverse=this.isSlideDirectionReversed(t),this.setCurrentSlideAndRegisterRelayout(t,!1,!0,e))},onMouseEnter:function(){this.state.autoPlay&&this.props.compProp.pauseAutoPlayOnMouseOver&&this.setState({autoPlay:!1},this.updateAutoPlayState)},onMouseLeave:function(){this.props.compProp.pauseAutoPlayOnMouseOver&&this.setState({autoPlay:this.props.canAutoPlay},this.updateAutoPlayState)},getTransitionDuration:function(){return"NoTransition"===this.props.compProp.transition?0:this.props.compProp.transDuration},transitionCallback:function(t){this.setState({isInTransition:!1},t)},getArrowButtonStyle:function(t){var e=this.props.compProp,i=this.getSkinExports().arrowWidthToHeightRatio||1,n=e.navigationButtonSize/i,s=e.navigationButtonMargin-.5*n,r=t?{left:s}:{right:s};return o.assign(r,{width:n})},getNavigationArrowsStyle:function(){var t=this.getSkinExports().arrowWidthToSizeRatio||1;return{top:"calc(50% - "+this.props.compProp.navigationButtonSize*t+"px)"}},getDotsAlignment:function(){return p[this.props.compProp.navigationDotsAlignment]},clickMoveToNextSlide:function(){this.moveNextSlide()},clickMoveToPreviousSlide:function(){this.movePreviousSlide()},getSlideToRender:function(){return o.at(this.props.children,this.props.slidesIndexes)[this.state.currentIndex]},getShowOnAllSlidesComponents:function(){return o.reject(this.props.children,function(t,e){return o.includes(this.props.slidesIndexes,e)}.bind(this))},keyboardInteractionHandler:function(t){o.includes(["ArrowRight","ArrowLeft","Home","End"],t.key)&&(t.preventDefault(),this.refs.inlineContentParent.contains(window.document.activeElement)&&this.refs.inlineContentParent.focus()),"ArrowRight"===t.key&&this.moveNextSlide(),"ArrowLeft"===t.key&&this.movePreviousSlide(),"Home"===t.key&&this.moveToSlide(0),"End"===t.key&&this.moveToSlide(this.getSlidesFromChildren(this.props.children).length-1)},stopAutoPlay:function(){this.setState({autoPlay:!1})},resumeAutoPlay:function(){this.setState({autoPlay:this.props.canAutoPlay})}}}),define("stripSlideShow/common/stripSlideShow",["react","lodash","core","santaProps","stripSlideShow/common/slideNavigationMixin"],function(t,o,e,i,n){"use strict";var s=t.createFactory(e.wixTransitionGroup);return{displayName:"stripSlideShow",mixins:[n],propTypes:{animations:i.Types.animations,isSiteBusy:i.Types.isSiteBusy,updateColorInfo:i.Types.VerticalAnchorsMenu.updateInformation.isRequired,compProp:i.Types.Component.compProp.isRequired,getScreenWidth:i.Types.getScreenWidth.isRequired},statics:{useSantaTypes:!0,behaviors:{nextSlide:{methodName:"moveNextSlide",params:[]},prevSlide:{methodName:"movePreviousSlide",params:[]},moveToSlide:{methodName:"moveToSlide",params:["slide"]}}},getTransitionParams:function(){return{width:this.props.getScreenWidth()}},getSkinProperties:function(){var o=this.getSlideToRender();return{"":{role:"region","aria-label":"Slideshow",onSwipeLeft:this.clickMoveToNextSlide,onSwipeRight:this.clickMoveToPreviousSlide,onKeyDown:this.keyboardInteractionHandler,onFocus:this.stopAutoPlay,onBlur:this.resumeAutoPlay},inlineContentParent:{style:{overflow:this.props.compProp.shouldHideOverflowContent?"hidden":"visible"},tabIndex:-1},inlineContent:{"aria-live":"polite",parentConst:s,isSiteBusy:this.props.isSiteBusy,transition:this.props.compProp.transition,transitionDuration:this.getTransitionDuration(),transitionCallback:this.transitionCallback,animations:this.props.animations,reverse:this.isDirectionLeftToRight?!this.reverse:this.reverse,getTransitionParams:this.getTransitionParams,children:o&&[t.cloneElement(o,{onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,flexibleBoxHeight:this.props.compProp.flexibleBoxHeight,shouldHideOverflowContent:this.props.compProp.shouldHideOverflowContent,parentId:this.props.id})]},shownOnAllSlides:{children:this.getShowOnAllSlidesComponents()},navigationArrows:{"data-show-navigation-arrows":this.props.compProp.showNavigationButton,"data-navigation-button-margin":this.props.compProp.navigationButtonMargin,style:this.getNavigationArrowsStyle()},dotsMenuWrapper:{"data-show-navigation-dots":this.props.compProp.showNavigationDots,children:this.createDotsNavigationButtons(),style:this.getDotsNavigationWrapperStyle()},prevButton:{onClick:this.clickMoveToPreviousSlide,style:this.getArrowButtonStyle(!0),className:"reset-button"},nextButton:{onClick:this.clickMoveToNextSlide,style:this.getArrowButtonStyle(!1),className:"reset-button"}}}}}),define("stripSlideShow/common/boxSlideShow",["react","lodash","core","santaProps","stripSlideShow/common/slideNavigationMixin"],function(t,o,e,i,n){"use strict";var s=t.createFactory(e.wixTransitionGroup);return{displayName:"boxSlideShow",mixins:[n],propTypes:{animations:i.Types.animations,updateColorInfo:i.Types.VerticalAnchorsMenu.updateInformation.isRequired,isSiteBusy:i.Types.isSiteBusy,compProp:i.Types.Component.compProp.isRequired,styleId:i.Types.Component.styleId.isRequired,id:i.Types.Component.id.isRequired,structure:i.Types.Component.structure.isRequired},statics:{useSantaTypes:!0,behaviors:{nextSlide:{methodName:"moveNextSlide",params:[]},prevSlide:{methodName:"movePreviousSlide",params:[]},moveToSlide:{methodName:"moveToSlide",params:["slide"]}}},getSkinProperties:function(){return{"":{"data-shouldhideoverflowcontent":this.props.compProp.shouldHideOverflowContent,onSwipeLeft:this.clickMoveToNextSlide,onSwipeRight:this.clickMoveToPreviousSlide},inlineContent:{isSiteBusy:this.props.isSiteBusy,parentConst:s,transition:this.props.compProp.transition,transitionDuration:this.getTransitionDuration(),transitionCallback:this.transitionCallback,animations:this.props.animations,reverse:this.isDirectionLeftToRight?!this.reverse:this.reverse,children:[t.cloneElement(this.getSlideToRender(),{onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,flexibleBoxHeight:this.props.compProp.flexibleBoxHeight,shouldHideOverflowContent:this.props.compProp.shouldHideOverflowContent,skin:this.getSkinExports().slide.skin,styleId:this.props.styleId+"slide",parentId:this.props.id})]},shownOnAllSlides:{children:this.getShowOnAllSlidesComponents()},navigationArrows:{"data-show-navigation-arrows":this.props.compProp.showNavigationButton,style:this.getNavigationArrowsStyle()},dotsMenuWrapper:{"data-show-navigation-dots":this.props.compProp.showNavigationDots,children:this.createDotsNavigationButtons(),style:this.getDotsNavigationWrapperStyle()},prevButton:{onClick:this.clickMoveToPreviousSlide,style:this.getArrowButtonStyle(!0)},nextButton:{onClick:this.clickMoveToNextSlide,style:this.getArrowButtonStyle(!1)}}}}}),define("stripSlideShow/skins/skins.json",[],function(){"use strict";var t={};return t["wysiwyg.common.components.boxSlideShow.viewer.skins.longArrowsLargeSelectedCircleSkin"]={react:[["div","bg",[],{}],["div","inlineContent",[],{}],["div","shownOnAllSlides",[],{}],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 39 11",enableBackground:"new 0 0 39 11"},["polygon",null,[],{points:"33.5,0 32.8,0.7 37.1,5 0,5 0,6 37.1,6 32.8,10.3 33.5,11 39,5.5 "}]]],["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 39 11",enableBackground:"new 0 0 39 11"},["polygon",null,[],{points:"33.5,0 32.8,0.7 37.1,5 0,5 0,6 37.1,6 32.8,10.3 33.5,11 39,5.5 "}]]]]],exports:{slide:{skin:"wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin",styleGroup:"inherit"},arrowWidthToHeightRatio:.3,arrowWidthToSizeRatio:.7,selectedButtonSizeRatio:1.66},params:{shd:"BOX_SHADOW",dotsColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{shd:"0 0 0 rgba(0, 0, 0, 0.6)",dotsColor:"color_12",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;pointer-events:auto;position:relative;display:inline-block;cursor:pointer;border-radius:50%;background-color:[dotsColor];","%prevButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:transparent;border:2px solid [dotsColor];","%_btn":"position:absolute;cursor:pointer;","%_btn:hover":"opacity:.6;","%_btn svg":"fill:[arrowColor];"}},t["wysiwyg.common.components.boxSlideShow.viewer.skins.squareButtonsSkin"]={react:[["div","bg",[],{}],["div","inlineContent",[],{}],["div","shownOnAllSlides",[],{}],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50"},["rect",null,[],{width:"50",height:"50"}],["path",null,[],{d:"M28.5,32.4c0.1,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.5,0-0.7L22.2,25l6.7-6.5c0.2-0.2,0.2-0.5,0-0.7\n                \tc-0.2-0.2-0.5-0.2-0.7,0l-7.2,6.9c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1,0.1,0.3,0.2,0.4l7.1,6.8C28.2,32.3,28.4,32.4,28.5,32.4z"}]]],["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50"},["rect",null,[],{width:"50",height:"50"}],["path",null,[],{d:"M28.5,32.4c0.1,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.5,0-0.7L22.2,25l6.7-6.5c0.2-0.2,0.2-0.5,0-0.7\n                \tc-0.2-0.2-0.5-0.2-0.7,0l-7.2,6.9c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1,0.1,0.3,0.2,0.4l7.1,6.8C28.2,32.3,28.4,32.4,28.5,32.4z"}]]]]],exports:{slide:{skin:"wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin",styleGroup:"inherit"},arrowWidthToHeightRatio:.5,arrowWidthToSizeRatio:1,selectedButtonSizeRatio:1},params:{shd:"BOX_SHADOW",dotsColor:"BG_COLOR_ALPHA",dotsSelectedColor:"BG_COLOR_ALPHA",arrowContainerColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{shd:"0 0 0 rgba(0, 0, 0, 0.6)",dotsColor:"color_12",dotsSelectedColor:"color_11",arrowContainerColor:"color_11",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;pointer-events:auto;position:relative;display:inline-block;cursor:pointer;background-color:[dotsColor];","%nextButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:[dotsSelectedColor];","%_btn":"position:absolute;cursor:pointer;","%_btn:hover":"opacity:.6;","%_btn rect":"fill:[arrowContainerColor];","%_btn path":"fill:[arrowColor];"}},t["wysiwyg.common.components.boxSlideShow.viewer.skins.thinArrowsLargeSelectedCircleSkin"]={react:[["div","bg",[],{}],["div","inlineContent",[],{}],["div","shownOnAllSlides",[],{}],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]],["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]]]],exports:{slide:{skin:"wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin",styleGroup:"inherit"},arrowWidthToHeightRatio:1,arrowWidthToSizeRatio:1,selectedButtonSizeRatio:1.66},params:{shd:"BOX_SHADOW",dotsColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{shd:"0 0 0 rgba(0, 0, 0, 0.6)",dotsColor:"color_12",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;pointer-events:auto;position:relative;display:inline-block;cursor:pointer;border-radius:50%;background-color:[dotsColor];","%_btn:hover":"opacity:.6;","%nextButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:transparent;border:2px solid [dotsColor];","%_btn":"position:absolute;cursor:pointer;","%_btn svg":"fill:[arrowColor];stroke:[arrowColor];stroke-width:1px;"}},t["wysiwyg.common.components.boxSlideShow.viewer.skins.thinArrowsSkin"]={react:[["div","bg",[],{}],["div","inlineContent",[],{}],["div","shownOnAllSlides",[],{}],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]],["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]]]],exports:{slide:{skin:"wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin",styleGroup:"inherit"},arrowWidthToHeightRatio:1,arrowWidthToSizeRatio:1,selectedButtonSizeRatio:1},params:{shd:"BOX_SHADOW",dotsColor:"BG_COLOR_ALPHA",dotsSelectedColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{shd:"0 0 0 rgba(0, 0, 0, 0.6)",dotsColor:"color_12",dotsSelectedColor:"color_11",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;[shd]position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;pointer-events:auto;position:relative;display:inline-block;cursor:pointer;border-radius:50%;background-color:[dotsColor];","%_btn:hover":"opacity:.6;","%nextButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:[dotsSelectedColor];","%_btn":"position:absolute;cursor:pointer;","%_btn svg":"fill:[arrowColor];stroke:[arrowColor];stroke-width:1px;"}},t["wysiwyg.common.components.stripSlideShow.viewer.skins.longArrowsLargeSelectedCircleSkin"]={react:[["div","bg",[],{}],["div","shownOnAllSlides",[],{}],["div","inlineContentParent",[],{},["div","inlineContent",[],{}]],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 39 11",enableBackground:"new 0 0 39 11"},["polygon",null,[],{points:"33.5,0 32.8,0.7 37.1,5 0,5 0,6 37.1,6 32.8,10.3 33.5,11 39,5.5 "}]]],["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 39 11",enableBackground:"new 0 0 39 11"},["polygon",null,[],{points:"33.5,0 32.8,0.7 37.1,5 0,5 0,6 37.1,6 32.8,10.3 33.5,11 39,5.5 "}]]]]],exports:{arrowWidthToHeightRatio:.3,arrowWidthToSizeRatio:.7,selectedButtonSizeRatio:1.66},params:{dotsColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{dotsColor:"color_12",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;border-radius:50%;background-color:[dotsColor];","%prevButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:transparent;border:2px solid [dotsColor];","%_btn":"position:absolute;cursor:pointer;","%_btn:hover":"opacity:.6;","%_btn svg":"fill:[arrowColor];"}},t["wysiwyg.common.components.stripSlideShow.viewer.skins.squareButtonsSkin"]={react:[["div","bg",[],{}],["div","shownOnAllSlides",[],{}],["div","inlineContentParent",[],{},["div","inlineContent",[],{}]],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50"},["rect",null,[],{width:"50",height:"50"}],["path",null,[],{d:"M28.5,32.4c0.1,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.5,0-0.7L22.2,25l6.7-6.5c0.2-0.2,0.2-0.5,0-0.7\n                \tc-0.2-0.2-0.5-0.2-0.7,0l-7.2,6.9c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1,0.1,0.3,0.2,0.4l7.1,6.8C28.2,32.3,28.4,32.4,28.5,32.4z"}]]],["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50"},["rect",null,[],{width:"50",height:"50"}],["path",null,[],{d:"M28.5,32.4c0.1,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.5,0-0.7L22.2,25l6.7-6.5c0.2-0.2,0.2-0.5,0-0.7\n                \tc-0.2-0.2-0.5-0.2-0.7,0l-7.2,6.9c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1,0.1,0.3,0.2,0.4l7.1,6.8C28.2,32.3,28.4,32.4,28.5,32.4z"}]]]]],exports:{arrowWidthToHeightRatio:.5,arrowWidthToSizeRatio:1,selectedButtonSizeRatio:1},params:{dotsColor:"BG_COLOR_ALPHA",dotsSelectedColor:"BG_COLOR_ALPHA",arrowContainerColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{dotsColor:"color_12",dotsSelectedColor:"color_11",arrowContainerColor:"color_11",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;background-color:[dotsColor];","%nextButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:[dotsSelectedColor];","%_btn":"position:absolute;cursor:pointer;","%_btn:hover":"opacity:.6;","%_btn rect":"fill:[arrowContainerColor];","%_btn path":"fill:[arrowColor];"}},t["wysiwyg.common.components.stripSlideShow.viewer.skins.thinArrowsLargeSelectedCircleSkin"]={react:[["div","bg",[],{}],["div","shownOnAllSlides",[],{}],["div","inlineContentParent",[],{},["div","inlineContent",[],{}]],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["div","nextButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]],["div","prevButton",["_btn"],{},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]]]],exports:{arrowWidthToHeightRatio:1,arrowWidthToSizeRatio:1,selectedButtonSizeRatio:1.66},params:{dotsColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{dotsColor:"color_12",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;border-radius:50%;background-color:[dotsColor];","%_btn:hover":"opacity:.6;","%nextButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:transparent;border:2px solid [dotsColor];","%_btn":"position:absolute;cursor:pointer;","%_btn svg":"fill:[arrowColor];stroke:[arrowColor];stroke-width:1px;"}},t["wysiwyg.common.components.stripSlideShow.viewer.skins.thinArrowsSkin"]={react:[["div","bg",[],{}],["div","inlineContentParent",[],{},["div","inlineContent",[],{}]],["div","shownOnAllSlides",[],{}],["ol","dotsMenuWrapper",[],{}],["div","navigationArrows",["_navigation-arrows"],{},["button","nextButton",["_btn"],{title:"next"},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]],["button","prevButton",["_btn"],{title:"previous"},["svg",null,[],{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 21 41",enableBackground:"new 0 0 21 41"},["polygon",null,[],{points:"20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "}]]]]],exports:{arrowWidthToHeightRatio:1,arrowWidthToSizeRatio:1,selectedButtonSizeRatio:1},params:{dotsColor:"BG_COLOR_ALPHA",dotsSelectedColor:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{dotsColor:"color_12",dotsSelectedColor:"color_11",arrowColor:"color_12"},css:{"%":"background-color:transparent;box-sizing:border-box !important;position:relative;min-height:50px;",'%[data-shouldhideoverflowcontent="true"] %inlineContent':"overflow:hidden;",'%navigationArrows[data-show-navigation-arrows="false"]':"display:none;",'%dotsMenuWrapper[data-show-navigation-dots="false"]':"display:none;","%bg":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContent":"position:absolute;top:0;right:0;bottom:0;left:0;","%inlineContentParent":"position:absolute;width:100%;height:100%;","%dotsMenuWrapper":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;pointer-events:none;","%_navigation-arrows":"position:absolute;width:100%;","%_navigation-dot":"pointer-events:auto;position:relative;display:inline-block;cursor:pointer;border-radius:50%;background-color:[dotsColor];","%_btn:hover":"opacity:.6;","%nextButton":"-webkit-transform:scale(-1);transform:scale(-1);","%_navigation-dot%_selected":"background-color:[dotsSelectedColor];","%_btn":"position:absolute;cursor:pointer;","%_btn svg":"fill:[arrowColor];stroke:[arrowColor];stroke-width:1px;"}},t}),define("stripSlideShow",["stripSlideShow/common/stripSlideShow","stripSlideShow/common/boxSlideShow","core","skins","stripSlideShow/common/SlideShowSantaTypes","stripSlideShow/skins/skins.json"],function(t,o,e,i,n,s){"use strict";var r={SlideShowSantaTypes:n,boxSlideShow:o,stripSlideShow:t};return e.compRegistrar.register("wysiwyg.viewer.components.BoxSlideShow",r.boxSlideShow,!0).register("wysiwyg.viewer.components.StripContainerSlideShow",r.stripSlideShow,!0),i.skinsMap.addBatch(s),r});
//# sourceMappingURL=stripSlideShow.min.js.map