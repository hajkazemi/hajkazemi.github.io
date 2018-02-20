define("popupContainer",["lodash","reactDOM","core","santaProps","components"],function(e,i,n,o,t){"use strict";var s=n.compMixins,r={displayName:"PopupContainer",mixins:[t.mediaCommon.mediaLogicMixins.fill,s.skinBasedComp,s.popupPagesMixin,s.createChildComponentMixin],propTypes:{closePopupPage:o.Types.popupPage.close,windowKeyboardEvent:o.Types.SiteAspects.windowKeyboardEvent.isRequired,isViewerMode:o.Types.isViewerMode.isRequired},statics:{useSantaTypes:!0,behaviors:t.mediaCommon.mediaBehaviors.fill},forceRedrawOnAnimationEnded:!0,previousVisibilityState:"hidden",getDefaultSkinName:function(){return"wysiwyg.viewer.skins.stripContainer.DefaultStripContainer"},componentWillMount:function(){this.props.windowKeyboardEvent&&this.props.windowKeyboardEvent.registerToEscapeKey(this),this.props.isViewerMode&&this.registerOnAnimationEnd(function(){var e=this.refs[""];e&&i.findDOMNode(e).focus(),this.unregisterOnAnimationEnd()})},componentDidMount:function(){this._focusedElementBeforeLightbox=e.get(window,"document.activeElement")},componentWillUnmount:function(){this.props.windowKeyboardEvent&&this.props.windowKeyboardEvent.unRegisterKeys(this),this.forceRedrawOnAnimationEnded=!1,this._focusedElementBeforeLightbox&&this._focusedElementBeforeLightbox.focus()},onEscapeKey:function(){this.props.closePopupPage()},componentDidLayout:function(){if(this.props.isViewerMode){i.findDOMNode(this.refs[""]).contains(window.document.activeElement)||i.findDOMNode(this.refs[""]).focus()}},getSkinProperties:function(){return{"":{onKeyDown:this.preventTabbingOut,role:"dialog",style:{pointerEvents:"auto"},tabIndex:-1},background:this.createFillLayers(),inlineContent:{children:this.props.children}}}};return n.compRegistrar.register("wysiwyg.viewer.components.PopupContainer",r,!0),r});
//# sourceMappingURL=popupContainer.min.js.map