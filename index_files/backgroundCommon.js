define("backgroundCommon/mixins/backgroundDetectionMixin",["lodash","prop-types","utils","coreUtils","color","santaProps"],function(e,t,i,o,a,s){"use strict";function n(t){return e.get(t.compDesign,"background")||e.get(t.compData,"background",{})}function r(){var e=n(this.props);return new a(i.colorParser.getColor(this.props.colorsMap,e.color,e.colorOpacity))}function p(e,t){var i=e&&e.uri,a=i!==this.lastBackgroundImageUrl,s=t&&t.hexString(),n=this.lastBackgroundBgColor&&this.lastBackgroundBgColor.hexString(),p=!i&&s!==n,d=t&&t.values.alpha!==this.lastAlpha;(a||p||d)&&function(e){var t=e&&e.uri;if(t){var i={id:t,width:e.width,height:e.height},a=o.imageClientApi,s=a.getData(a.fittingTypes.SCALE_TO_FILL,i,{width:1,height:1}).uri,n=this.props.getMediaFullStaticUrl(s);this.props.updateImageInfo(this.props.id,this.props.rootId,n)}else{var p=r.call(this);this.props.updateColorInfo(this.props.id,this.props.rootId,{brightness:p.values.hsv[2],alpha:p.values.alpha})}}.call(this,e),this.lastBackgroundImageUrl=i,this.lastBackgroundBgColor=t,this.lastAlpha=t.values.alpha}return{propTypes:{id:t.string,compDesign:t.object,compData:t.object,colorsMap:s.Types.Theme.colorsMap.isRequired,isMobileView:s.Types.isMobileView.isRequired,updateColorInfo:s.Types.VerticalAnchorsMenu.updateInformation.isRequired,updateImageInfo:s.Types.VerticalAnchorsMenu.updateImageInfo.isRequired,getMediaFullStaticUrl:s.Types.ServiceTopology.getMediaFullStaticUrl.isRequired},componentDidMount:function(){if(!this.props.isMobileView){var e=r.call(this),t=this.getMediaImageData();p.call(this,t,e)}},componentDidUpdate:function(){if(!this.props.isMobileView){var e=r.call(this),t=e&&e.hexString(),i=this.lastBackgroundBgColor&&this.lastBackgroundBgColor.hexString(),o=this.getMediaImageData(),a=t!==i,s=(o&&o.uri)!==this.lastBackgroundImageUrl,n=e&&e.values.alpha!==this.lastAlpha;(a||s||n)&&p.call(this,o,e)}},getMediaImageData:function(){var e=n(this.props).mediaRef;if(e)switch(e.type){case"Image":return e;case"WixVideo":return e.posterImageRef}return null}}}),define("backgroundCommon/components/bgImage",["lodash","prop-types","core","imageCommon","santaProps"],function(e,t,i,o,a){"use strict";var s=i.compMixins,n=o.imageElements;return{displayName:"bgImage",mixins:[s.skinBasedComp],propTypes:{cssFiltersSupported:a.Types.BrowserFlags.cssFiltersSupported.isRequired,compData:t.object.isRequired,"data-type":t.string.isRequired,filterEffect:t.object},statics:{useSantaTypes:!0},extendWithFilterData:function(t){var i=void 0,o=void 0,a=n.getValidFilterName(this.props.filterEffect);a&&(i=this.props.id+"_"+a,o=n.getFilterComponent(i,a),this.props.cssFiltersSupported&&(t[""].addChildren=o,e.assign(t.image.style,n.getCssStyleForFilterUse(i))))},getSkinProperties:function(){var t={position:"absolute",width:"100%"};e.isNumber(this.props.compData.opacity)&&(t.opacity=this.props.compData.opacity);var i={"":{style:{width:"100%"}},image:{style:t,"data-type":this.props["data-type"]}};return this.extendWithFilterData(i),i}}}),define("backgroundCommon/mixins/videoPlayerMixin",["lodash","utils"],function(e,t){"use strict";var i=t.mediaConsts;return{externalAPI:["play","pause","stop","seek","setVolume","mute","unMute","setRate","setSrc"],mediaAPI:function(t,i){var o=this[t];o&&e.includes(this.externalAPI,t)&&o.apply(this,i)},getPosterImageComp:function(t,o,a){var s={display:o?"none":void 0};(function(t){return e.includes(["png"],function(e){return(/[.]([^.]+)$/.exec(e)&&/[.]([^.]+)$/.exec(e)[1]||"").toLowerCase()}(t))})(t.uri)&&(s.backgroundColor="#000000");return this.createChildComponent(t,"core.components.Image",i.balataConsts.POSTER,e.assign({ref:i.balataConsts.POSTER,id:this.props.id+i.balataConsts.POSTER,imageData:t,displayMode:this.props.compData.fittingType,alignType:this.props.compData.alignType,containerWidth:0,containerHeight:0,style:s},a))}}}),define("backgroundCommon/components/html5Video",["lodash","prop-types","santaProps","core","utils","image","backgroundCommon/mixins/videoPlayerMixin"],function(e,t,i,o,a,s,n){"use strict";function r(t){return e.includes(t,"video")}var p=a.mediaConsts;return{displayName:"html5Video",mixins:[n,o.compMixins.skinBasedComp,o.compMixins.createChildComponentMixin],propTypes:e.defaults({compData:t.object.isRequired,compProp:t.object,playMobileVideoInline:i.Types.BrowserFlags.playMobileVideoInline.isRequired,videoRenderParts:t.array,playerInteraction:t.string,mediaQuality:t.string,notifyMediaState:t.func.isRequired,setMediaAPI:t.func.isRequired},i.santaTypesUtils.getSantaTypesByDefinition(s)),statics:{useSantaTypes:!0},getInitialState:function(){return this.playWhenReady=!1,{showVideo:!1}},componentDidMount:function(){this.props.setMediaAPI(this.mediaAPI),this.refs.video.addEventListener("timeupdate",this.handlePosterVisibilityOnce),this.props.notifyMediaState({type:p.eventTypes.MOUNT,playbackState:p.playbackTypes.LOADING}),r(this.props.videoRenderParts)&&this.setRate(this.props.compData.playbackSpeed||1)},componentDidUpdate:function(){r(this.props.videoRenderParts)&&this.setRate(this.props.compData.playbackSpeed||1)},componentWillUnmount:function(){this.props.setMediaAPI(null),r(this.props.videoRenderParts)&&(this.refs.video.removeEventListener("timeupdate",this.handlePosterVisibilityOnce),this.removeVideoSecurely())},handlePosterVisibilityOnce:function(){this.refs.video.currentTime>0&&(this.setState({showVideo:this.props.playMobileVideoInline}),this.refs.video.removeEventListener("timeupdate",this.handlePosterVisibilityOnce))},resetPosterState:function(){this.state.showVideo&&(this.setState({showVideo:!1}),this.refs.video.addEventListener("timeupdate",this.handlePosterVisibilityOnce))},removeVideoSecurely:function(){this.refs.video.pause(),e.forEach(this.refs.video.children,function(e){"source"===e.nodeName.toLowerCase()&&e.setAttribute("src","")}),this.refs.video.load()},canVideoPlay:function(){return this.refs.video.readyState>=this.refs.video.HAVE_CURRENT_DATA},play:function(){this.canVideoPlay()?this.refs.video.play():this.playWhenReady=!0},pause:function(){this.refs.video.pause()},stop:function(){this.pause(),this.seek(0),this.resetPosterState()},setVolume:function(e){this.refs.video.volume=Math.max(0,Math.min(1,e))},mute:function(){this.refs.video.muted=!0},unMute:function(){this.refs.video.muted=!1},seek:function(e){this.refs.video.currentTime=Math.max(0,Math.min(e,this.refs.video.duration||this.props.compData.duration))},setRate:function(e){this.refs.video.playbackRate=Math.max(0,e)},onLoadStart:function(){this.props.notifyMediaState({type:p.eventTypes.LOAD,playbackState:p.playbackTypes.READY,volume:this.refs.video.volume,muted:this.refs.video.muted,looped:this.props.compProp.loop,currentTime:this.refs.video.currentTime,progress:0})},onDurationChange:function(){this.props.notifyMediaState({type:p.eventTypes.LOAD,duration:parseInt(100*this.refs.video.duration,10)/100})},onLoadedData:function(){this.playWhenReady||this.props.notifyMediaState({type:p.eventTypes.LOAD,playbackState:p.playbackTypes.IDLE})},onCanPlay:function(){this.playWhenReady&&(this.play(),this.playWhenReady=!1)},onTimeUpdate:function(){this.props.notifyMediaState({type:p.eventTypes.TIME_UPDATE,currentTime:this.refs.video.currentTime})},onPlayEnded:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PLAYING})},onPause:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PAUSED})},onError:function(e){e.currentTarget.networkState===e.currentTarget.NETWORK_NO_SOURCE?this.props.notifyMediaState({type:p.eventTypes.ERROR,error:p.errorTypes.NO_VIDEO_FOUND}):this.props.notifyMediaState({type:p.eventTypes.ERROR,error:p.errorTypes.VIDEO_GENERAL_ERROR})},onStalled:function(e){e.currentTarget.readyState===e.currentTarget.HAVE_NOTHING&&this.props.notifyMediaState({type:p.eventTypes.ERROR,error:p.errorTypes.NO_VIDEO_FOUND})},onProgress:function(){var e=this.refs.video.buffered;this.props.notifyMediaState({type:p.eventTypes.PROGRESS,progress:e&&e.length?e.end(e.length-1):0})},onSeekStart:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(){this.props.notifyMediaState({type:p.eventTypes.VOLUME,volume:this.refs.video.volume,muted:this.refs.video.muted})},onRateChange:function(){this.props.notifyMediaState({type:p.eventTypes.RATE,playbackRate:this.refs.video.playbackRate})},onVideoClick:function(e){e.stopPropagation()},getVideo:function(){var e={preload:this.props.compData.preload||"none",onEnded:this.onPlayEnded,onError:this.onError,onLoadStart:this.onLoadStart,onLoadedData:this.onLoadedData,onCanPlay:this.onCanPlay,onDurationChange:this.onDurationChange,onPause:this.onPause,onPlay:this.onPlay,onProgress:this.onProgress,onRateChange:this.onRateChange,onSeeked:this.onSeekEnd,onSeeking:this.onSeekStart,onStalled:this.onStalled,onTimeUpdate:this.onTimeUpdate,onVolumeChange:this.onVolumeChange,onClick:this.onVideoClick,style:{visibility:this.state.showVideo?void 0:"hidden"}};return"useNative"===this.props.playerInteraction&&(e.controls=!0),(this.props.compProp.mute||!1===this.props.compData.hasAudio)&&(e.muted="muted"),e},getRenderParts:function(){var t=this,i={video:null,poster:null};return e.forEach(this.props.videoRenderParts,function(e){switch(e){case"video":i.video=t.getVideo();break;case"poster":i.poster=t.getPosterImageComp(t.props.compData.posterImageRef,t.state.showVideo)}}),i},getSkinProperties:function(){var e=this.getRenderParts();return{"":{"data-quality":this.props.mediaQuality,"data-player-type":"html5",style:{width:"100%"}},video:e.video,poster:e.poster}}}}),define("backgroundCommon/components/youtubeVideo",["lodash","core","santaProps","prop-types","reactDOM","utils","image","backgroundCommon/mixins/videoPlayerMixin"],function(e,t,i,o,a,s,n,r){"use strict";var p=s.mediaConsts;return{displayName:"YoutubeVideo",mixins:[r,t.compMixins.skinBasedComp,t.compMixins.createChildComponentMixin],propTypes:e.defaults({compData:o.object.isRequired,compProp:o.object,isPlayingAllowed:o.bool,mediaQuality:o.string,notifyMediaState:o.func.isRequired,setMediaAPI:o.func.isRequired},i.santaTypesUtils.getSantaTypesByDefinition(n)),statics:{useSantaTypes:!0},getInitialState:function(){return this.ytPlayer=null,this.ytScriptReady=!1,this.setVideoPlayerWhenReady=!1,this.isPlaying=!1,this.timeUpdateTimer={type:"",id:null},{showVideo:!1}},componentDidMount:function(){this.loadYTScript(),this.props.setMediaAPI(this.mediaAPI),this.props.notifyMediaState({type:p.eventTypes.MOUNT,playbackState:p.playbackTypes.LOADING}),this.props.compProp.autoplay&&this.props.isPlayingAllowed&&this.play()},componentWillUnmount:function(){this.props.setMediaAPI(null),this.stopSimulateTimeUpdate(),this.removeVideoSecurely(),this.props.notifyMediaState({type:p.eventTypes.MOUNT,playbackState:p.playbackTypes.LOADING})},loadYTScript:function(){if("undefined"==typeof window||e.get(window,"YT"))this.onYoutubeScriptReady();else{var t=window.document.createElement("script");t.src="https://www.youtube.com/player_api";var i=window.document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i),window.onYouTubeIframeAPIReady=this.onYoutubeScriptReady}},handlePosterVisibilityOnce:function(){this.setState({showVideo:!0})},resetPosterState:function(){this.state.showVideo&&this.setState({showVideo:!1})},onYoutubeScriptReady:function(){this.ytScriptReady=!0,this.setVideoPlayerWhenReady&&this.setVideoPlayer()},startSimulateTimeUpdate:function(){this.isPlaying?this.timeUpdateTimer={type:"requestAnimationFrame",id:window.requestAnimationFrame(this.startSimulateTimeUpdate)}:window.requestIdleCallback?this.timeUpdateTimer={type:"requestIdleCallback",id:window.requestIdleCallback(this.startSimulateTimeUpdate)}:this.timeUpdateTimer={type:"setTimeout",id:window.setTimeout(this.startSimulateTimeUpdate,100)},this.onTimeUpdate(),this.onProgress()},stopSimulateTimeUpdate:function(){switch(this.timeUpdateTimer.type){case"requestAnimationFrame":window.cancelAnimationFrame(this.timeUpdateTimer.id);break;case"requestIdleCallback":window.cancelIdleCallback(this.timeUpdateTimer.id);break;case"setTimeout":window.clearTimeout(this.timeUpdateTimer.id)}},setVideoPlayer:function(){this.ytScriptReady?this.ytPlayer=new window.YT.Player(this.refs.video,{videoId:this.props.compData.videoId,width:a.findDOMNode(this).offsetWidth,height:a.findDOMNode(this).offsetHeight,events:{onReady:this.onPlayerReady,onStateChange:this.onPlayerStateChange,onPlaybackRateChange:this.onRateChange,onError:this.onError},autoplay:1,loop:this.props.compProp.loop?1:0,rel:0}):this.setVideoPlayerWhenReady=!0},removeVideoSecurely:function(){this.ytPlayer&&this.ytPlayer.destroy()},play:function(){this.ytPlayer?this.ytPlayer.playVideo&&this.ytPlayer.playVideo():this.setVideoPlayer()},pause:function(){this.ytPlayer&&this.ytPlayer.pauseVideo()},stop:function(){this.ytPlayer&&this.ytPlayer.stopVideo()},setVolume:function(e){var t=void 0;this.ytPlayer&&(t=100*Math.max(0,Math.min(1,e)),this.ytPlayer.setVolume(t),this.onVolumeChange({volume:t}))},mute:function(){this.ytPlayer&&(this.ytPlayer.mute(),this.onVolumeChange({mute:!0}))},unMute:function(){this.ytPlayer&&(this.ytPlayer.unMute(),this.onVolumeChange({mute:!1}))},seek:function(e){this.ytPlayer&&(this.ytPlayer.seekTo(Math.max(0,Math.min(e,this.ytPlayer.getDuration())),!0),this.onSeekEnd())},setRate:function(e){this.ytPlayer&&this.ytPlayer.setPlaybackRate(Math.max(0,e))},onPlayerReady:function(){this.props.compProp.mute&&this.mute(),this.setRate(this.props.compData.playbackSpeed||1),this.handlePosterVisibilityOnce(),this.onLoadStart()},onPlayerStateChange:function(e){var t=window.YT.PlayerState;switch(e.data){case t.ENDED:this.onPlayEnded();break;case t.PLAYING:this.onPlay();break;case t.PAUSED:this.onPause();break;case t.BUFFERING:this.onProgress();break;case t.CUED:}},onLoadStart:function(){this.props.notifyMediaState({type:p.eventTypes.LOAD,playbackState:p.playbackTypes.READY,volume:this.ytPlayer.getVolume()/100,muted:this.ytPlayer.isMuted(),currentTime:this.ytPlayer.getCurrentTime(),progress:0})},onTimeUpdate:function(){this.props.notifyMediaState({type:p.eventTypes.TIME_UPDATE,currentTime:this.ytPlayer.getCurrentTime(),duration:this.ytPlayer.getDuration()})},onPlayEnded:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PLAYING}),this.startSimulateTimeUpdate()},onPause:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PAUSED}),this.stopSimulateTimeUpdate()},onError:function(){this.props.notifyMediaState({type:p.eventTypes.ERROR,error:p.errorTypes.VIDEO_GENERAL_ERROR}),this.stopSimulateTimeUpdate()},onProgress:function(){this.props.notifyMediaState({type:p.eventTypes.PROGRESS,progress:this.ytPlayer.getDuration()*this.ytPlayer.getVideoLoadedFraction()})},onSeekStart:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(t){t=t||{};var i=(e.isNumber(t.volume)?t.volume:this.ytPlayer.getVolume())/100,o=e.isBoolean(t.mute)?t.mute:this.ytPlayer.isMuted();this.props.notifyMediaState({type:p.eventTypes.VOLUME,volume:i,muted:o})},onRateChange:function(){this.props.notifyMediaState({type:p.eventTypes.RATE,playbackRate:this.ytPlayer.getPlaybackRate()})},getSkinProperties:function(){var e=this.props.compData.posterImage||{uri:"//img.youtube.com/vi/"+this.props.compData.videoId+"/hqdefault.jpg"},t=this.getPosterImageComp(e,this.state.showVideo);return{"":{"data-quality":this.props.mediaQuality,"data-player-type":"youtube",style:{width:"100%"}},video:{},poster:t}}}}),define("backgroundCommon/components/bgMedia",["lodash","prop-types","core","santaProps","image","backgroundCommon/components/bgImage","backgroundCommon/components/html5Video","backgroundCommon/components/youtubeVideo","utils"],function(e,t,i,o,a,s,n,r,p){"use strict";function d(t){var i=t.compData,o=void 0,a=function(t,i,o){o=o||{};var a=u.isFilterExists(o.effectType);return e.includes(m,t)&&(!a||a&&i)?h:f}(t.fittingType,t.cssFiltersSupported,t.filterEffect),s={image:{id:t.id+y.balataConsts.CONTENT,componentType:a.comp,skinPartData:{skin:a.skin,styleId:a.style},compData:i},poster:{id:t.id+y.balataConsts.CONTENT,componentType:a.comp,skinPartData:{skin:a.skin,styleId:a.style},compData:i.posterImageRef},video:{id:t.id+y.balataConsts.CONTENT,componentType:g.comp,skinPartData:{skin:g.skin,styleId:g.style},compData:i},youtube:{id:t.id+y.balataConsts.CONTENT,componentType:v.comp,skinPartData:{skin:v.skin,styleId:v.style},compData:i},iframe:{id:t.id+y.balataConsts.CONTENT,componentType:T.comp,skinPartData:{skin:T.skin,styleId:T.style},compData:i}};switch(i.type){case"Image":o=s.image;break;case"WixVideo":o=t.enableVideo?s.video:s.poster;break;case"Video":switch(i.videoType){case"YOUTUBE":o=s.youtube}}return o}var l=i.compMixins,c=p.containerBackgroundUtils,y=p.mediaConsts,u=p.svgFilters,m=[p.imageUtils.fittingTypes.TILE],h={comp:"wysiwyg.viewer.components.background.bgImage",skin:"skins.viewer.bgImage.bgImageSkin",style:"bgImage","data-type":y.balataConsts.BG_IMAGE},f={comp:"core.components.Image",skin:"skins.core.ImageNewSkinZoomable",style:"bgImage","data-type":y.balataConsts.IMAGE},g={comp:"wysiwyg.viewer.components.background.html5Video",skin:"skins.viewer.bgVideo.html5VideoSkin",style:"bgVideo"},v={comp:"wysiwyg.viewer.components.background.youtubeVideo",skin:"skins.viewer.bgVideo.youtubeVideoSkin",style:"youtubeVideo"},T={comp:"wysiwyg.viewer.components.background.iframeVideo",skin:"skins.viewer.bgVideo.iframeVideoSkin",style:"iframeVideo"};return{displayName:"bgMedia",mixins:[l.skinBasedComp,l.createChildComponentMixin],propTypes:e.defaults({id:t.string.isRequired,compData:t.object.isRequired,compProp:t.object,alignType:t.string,fittingType:t.string,mediaTransforms:t.object,filterEffect:t.object,bgEffectName:t.string,style:t.object.isRequired,isPlayingAllowed:t.bool,enableVideo:t.bool,mediaQuality:t.string,renderParts:t.object,notifyMediaState:t.func,setMediaAPI:t.func,cssFiltersSupported:o.Types.BrowserFlags.cssFiltersSupported.isRequired,renderFixedPositionBackgrounds:o.Types.RenderFlags.renderFixedPositionBackgrounds},o.santaTypesUtils.getSantaTypesByDefinition(a),o.santaTypesUtils.getSantaTypesByDefinition(s),o.santaTypesUtils.getSantaTypesByDefinition(n),o.santaTypesUtils.getSantaTypesByDefinition(r)),statics:{useSantaTypes:!0},getDefaultSkinName:function(){return"skins.viewer.balata.bgMediaSkin"},getMediaComponent:function(){var t=d(this.props),i=function(e,t){var i={};return t===h.comp?i={ref:y.balataConsts.CONTENT,filterEffect:e.filterEffect,"data-type":h["data-type"]}:t===f.comp?i={ref:y.balataConsts.CONTENT,key:"img_"+e.bgEffectName,containerWidth:0,containerHeight:0,imageData:e.compData,filterEffect:e.filterEffect,displayMode:e.fittingType,fittingType:e.fittingType,alignType:e.alignType,"data-type":f["data-type"]}:t!==g.comp&&t!==v.comp&&t!==T.comp||(i={ref:y.balataConsts.CONTENT,key:"vid_"+e.compData.videoId,notifyMediaState:e.notifyMediaState,isPlayingAllowed:e.isPlayingAllowed,playerInteraction:e.playerInteraction,setMediaAPI:e.setMediaAPI,mediaQuality:e.mediaQuality,videoRenderParts:e.renderParts.media.video,compProp:e.compProp}),i}(this.props,t.componentType),o=e.assign({id:t.id},i);return this.createChildComponent(t.compData,t.componentType,t.skinPartData,o)},getSkinProperties:function(){var t=c.getPositionByEffect(this.props.bgEffectName,this.props.renderFixedPositionBackgrounds),i=e.assign({},this.props.style,{position:t,pointerEvents:this.props.bgEffectName?"none":"auto",top:0}),o=e.mapKeys(this.props.mediaTransforms,function(e,t){return"data-"+t});return{"":e.assign({key:["media",this.props.isPlayingAllowed?"playback":"no_playback",this.props.enableVideo?"video":"no_video"].join("_"),children:this.getMediaComponent(),style:i,"data-effect":this.props.bgEffectName||"none","data-fitting":this.props.fittingType,"data-align":this.props.alignType},o)}}}}),define("backgroundCommon/components/bgOverlay",["prop-types","lodash","core","utils","santaProps"],function(e,t,i,o,a){"use strict";function s(e){var t={};return e.colorOverlay&&(t.backgroundColor=o.colorParser.getColor(e.colorsMap,e.colorOverlay,e.colorOverlayOpacity)),e.imageOverlay&&(t.backgroundImage=function(e,t){return"url("+o.urlUtils.joinURL(e,t.uri)+")"}(e.staticMediaUrl,e.imageOverlay)),t}function n(){var e=t.assign({position:"absolute"},this.props.style,{width:"100%",height:"100%"});return function(e,t,i){return t&&o.containerBackgroundUtils.isFullScreenByEffect(e,i)}(this.props.bgEffectName,this.props.fixedBackgroundColorBalata,this.props.renderFixedPositionBackgrounds)&&t.assign(e,{top:0,position:"fixed"}),e}return{displayName:"bgOverlay",mixins:[i.compMixins.skinBasedComp],propTypes:{style:e.object,colorOverlay:e.string,colorOverlayOpacity:e.number,imageOverlay:e.object,bgEffectName:e.string,colorsMap:a.Types.Theme.colorsMap.isRequired,staticMediaUrl:a.Types.ServiceTopology.staticMediaUrl,fixedBackgroundColorBalata:a.Types.BrowserFlags.fixedBackgroundColorBalata.isRequired,renderFixedPositionBackgrounds:a.Types.RenderFlags.renderFixedPositionBackgrounds},statics:{useSantaTypes:!0},getSkinProperties:function(){var e=n.call(this),i=function(e){var i=s(e);return t.assign({width:"100%",height:"100%",position:"absolute"},i)}(this.props),a={"":{style:e}};return a[o.balataConsts.OVERLAY]={style:i},a}}}),define("backgroundCommon/components/iframeVideoFactory",["santaComponents","lodash","prop-types","core","santaProps","utils","pmrpc","image","backgroundCommon/mixins/videoPlayerMixin"],function(e,t,i,o,a,s,n,r,p){"use strict";var d=s.mediaConsts;return{getIframeVideoComponent:function(l){var c=l.url,y=l.id;return{displayName:l.displayName||"iframeVideo",mixins:[p,o.compMixins.skinBasedComp,o.compMixins.createChildComponentMixin],propTypes:t.defaults({compData:i.object.isRequired,compProp:i.object,isPlayingAllowed:i.bool,mediaQuality:i.string,notifyMediaState:i.func.isRequired,setMediaAPI:i.func.isRequired,staticVideoUrl:a.Types.ServiceTopology.staticVideoUrl},a.santaTypesUtils.getSantaTypesByDefinition(r)),statics:{useSantaTypes:!0},getInitialState:function(){return this.player=null,this.eventHandlers=[],{loadVideo:!1,showVideo:!1}},componentDidMount:function(){this.props.setMediaAPI(this.mediaAPI),this.props.notifyMediaState({type:d.eventTypes.MOUNT,playbackState:d.playbackTypes.LOADING}),this.props.compProp.autoplay&&this.props.isPlayingAllowed&&this.play()},componentDidUpdate:function(){this.setRate(this.props.compData.playbackSpeed||1)},componentWillUnmount:function(){this.props.setMediaAPI(null),this.removeVideoSecurely()},getUrl:function(e,i){var o="https://video.wixstatic.com/";if(!i)return"";var a=t.find(e.qualities,{quality:i});return a.url?s.urlUtils.joinURL(o,a.url):s.urlUtils.joinURL(o,e.videoId,i,"mp4","file.mp4")},onVideoFrameReady:function(){var e=this,t=this.getUrl(this.props.compData,this.props.mediaQuality);n.api.request(y,{target:this.refs.video}).then(function(i){e.player=i,e.player.set(t,{loop:!1,mute:e.props.compProp.mute||!1===e.props.compData.hasAudio,autoplay:!0,rate:e.props.compData.playbackSpeed||1,preload:e.props.compData.preload||"none"},e.onVideoEvent),e.addVideoEventListener("timeupdate",e.handlePosterVisibilityOnce),e.addVideoEventListener("ended",e.onPlayEnded),e.addVideoEventListener("error",e.onError),e.addVideoEventListener("loadstart",e.onLoadStart),e.addVideoEventListener("durationchange",e.onDurationChange),e.addVideoEventListener("pause",e.onPause),e.addVideoEventListener("play",e.onPlay),e.addVideoEventListener("progress",e.onProgress),e.addVideoEventListener("ratechange",e.onRateChange),e.addVideoEventListener("seeked",e.onSeekEnd),e.addVideoEventListener("seeking",e.onSeekStart),e.addVideoEventListener("stalled",e.onStalled),e.addVideoEventListener("timeupdate",e.onTimeUpdate),e.addVideoEventListener("volumechange",e.onVolumeChange)}).catch(function(e){console.log("Video API not loaded.",e)})},addVideoEventListener:function(e,i){if(!t.find(this.eventHandlers,{eventType:e,handler:i}))return this.eventHandlers.push({eventType:e,handler:i}),!0},removeVideoEventListener:function(e,i){if(t.find(this.eventHandlers,{eventType:e,handler:i}))return this.eventHandlers=t.reject(this.eventHandlers,{eventType:e,handler:i}),!0},onVideoEvent:function(e){var i=t.filter(this.eventHandlers,{eventType:e.type});t.forEach(i,function(t){t.handler(e)})},handlePosterVisibilityOnce:function(e){e.currentTime>0&&(this.removeVideoEventListener("timeupdate",this.handlePosterVisibilityOnce),this.setState({showVideo:!0}))},resetPosterState:function(){this.state.showVideo&&(this.setState({showVideo:!1}),this.addVideoEventListener("timeupdate",this.handlePosterVisibilityOnce))},removeVideoSecurely:function(){this.player&&(this.eventHandlers=[],this.player.reset())},play:function(){this.player?this.player.play():this.setState({loadVideo:!0})},pause:function(){this.player&&this.player.pause()},stop:function(){this.player&&(this.pause(),this.seek(0),this.resetPosterState())},setVolume:function(e){this.player&&this.player.setVolume(e)},mute:function(){this.player&&this.player.setMute(!0)},unMute:function(){this.player&&this.player.setMute(!1)},seek:function(e){this.player&&this.player.seek(e)},setRate:function(e){this.player&&this.player.setRate(e)},onLoadStart:function(e){this.props.notifyMediaState({type:d.eventTypes.LOAD,playbackState:d.playbackTypes.READY,volume:e.volume,muted:e.muted,looped:this.props.compProp.loop,currentTime:e.currentTime,progress:0})},onDurationChange:function(e){this.props.notifyMediaState({type:d.eventTypes.LOAD,duration:e.duration})},onTimeUpdate:function(e){this.props.notifyMediaState({type:d.eventTypes.TIME_UPDATE,currentTime:e.currentTime})},onPlayEnded:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.PLAYING})},onPause:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.PAUSED})},onError:function(e){e.networkState===e.NETWORK_NO_SOURCE?this.props.notifyMediaState({type:d.eventTypes.ERROR,error:d.errorTypes.NO_VIDEO_FOUND}):this.props.notifyMediaState({type:d.eventTypes.ERROR,error:d.errorTypes.VIDEO_GENERAL_ERROR})},onStalled:function(e){e.readyState===e.HAVE_NOTHING&&this.props.notifyMediaState({type:d.eventTypes.ERROR,error:d.errorTypes.NO_VIDEO_FOUND})},onProgress:function(e){this.props.notifyMediaState({type:d.eventTypes.PROGRESS,progress:e.progress})},onSeekStart:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(e){this.props.notifyMediaState({type:d.eventTypes.VOLUME,volume:e.volume,muted:e.muted})},onRateChange:function(e){this.props.notifyMediaState({type:d.eventTypes.RATE,playbackRate:e.playbackRate})},getVideo:function(){return e.utils.createReactElement("iframe",{ref:"video",id:this.props.id+"video",frameBorder:0,allowFullScreen:!0,"data-src":this.state.loadVideo?c:"about:blank",onLoad:this.onVideoFrameReady})},getSkinProperties:function(){var e=this.getPosterImageComp(this.props.compData.posterImageRef,this.state.showVideo);return{"":{"data-quality":this.props.mediaQuality,"data-player-type":"iframe",style:{width:"100%"}},video:this.getVideo(),poster:e}}}}}}),define("backgroundCommon/components/iframeVideo",["backgroundCommon/components/iframeVideoFactory"],function(e){"use strict";return e.getIframeVideoComponent({url:"https://wix-private.github.io/video-fx-player/360.html",id:"wix-video-fx-player",displayName:"iframeVideo"})}),define("backgroundCommon/skins/skins.json",[],function(){"use strict";var e={};return e["skins.viewer.bgImage.bgImageSkin"]={react:[["div","image",[],{}]],css:{}},e["skins.viewer.bgMedia.bgMediaSkin"]={react:[],css:{}},e["skins.viewer.bgOverlay.bgOverlaySkin"]={react:[["div","overlay",[],{}]]},e["skins.viewer.bgVideo.html5VideoSkin"]={react:[["video","video",[],{},["source","mp4",[],{}]],["div","poster",[],{}]],exports:{poster:{skin:"skins.core.ImageNewSkinZoomable"}},css:{}},e["skins.viewer.bgVideo.iframeVideoSkin"]={react:[["div","video",[],{}],["div","poster",[],{}]],exports:{poster:{skin:"skins.core.ImageNewSkinZoomable"}},css:{}},e["skins.viewer.bgVideo.youtubeVideoSkin"]={react:[["div","video",[],{}],["div","poster",[],{}]],exports:{poster:{skin:"skins.core.ImageNewSkinZoomable"}},css:{}},e}),define("backgroundCommon",["backgroundCommon/mixins/backgroundDetectionMixin","backgroundCommon/components/bgImage","backgroundCommon/components/bgMedia","backgroundCommon/components/bgOverlay","backgroundCommon/components/html5Video","backgroundCommon/components/youtubeVideo","backgroundCommon/components/iframeVideo","core","skins","backgroundCommon/skins/skins.json"],function(e,t,i,o,a,s,n,r,p,d){"use strict";var l={mixins:{backgroundDetectionMixin:e},components:{bgImage:t,bgMedia:i,bgOverlay:o,html5Video:a,youtubeVideo:s,iframeVideo:n}};return r.compRegistrar.register("wysiwyg.viewer.components.background.bgMedia",l.components.bgMedia).register("wysiwyg.viewer.components.background.bgImage",l.components.bgImage).register("wysiwyg.viewer.components.background.html5Video",l.components.html5Video).register("wysiwyg.viewer.components.background.youtubeVideo",l.components.youtubeVideo).register("wysiwyg.viewer.components.background.iframeVideo",l.components.iframeVideo).register("wysiwyg.viewer.components.background.bgOverlay",l.components.bgOverlay),p.skinsMap.addBatch(d),l});
//# sourceMappingURL=backgroundCommon.min.js.map