define("twitterFeed/skins/skins.json",[],function(){"use strict";var t={};return t["wysiwyg.viewer.skins.TwitterFeedSkin"]={react:[["div","header",[],{},["a",null,["_tw"],{href:"https://twitter.com"}],["a","link",[],{href:""},["span","label",[],{}]]],["div","content",[],{}]],params:{bg2:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",bg:"BG_COLOR_ALPHA",txt:"TEXT_COLOR",tdr:"URL"},paramsDefaults:{bg2:"color_12",rd:"5px",bg:"color_11",txt:"color_15",tdr:"BASE_THEME_DIRECTORY"},css:{"%":"background-color:[bg2];[rd]  position:absolute;top:0;right:0;bottom:0;left:0;","%content":"background-color:[bg];position:absolute;top:60px;right:0;bottom:60px;left:0;[rd]  padding:10px;","%header":"height:50px;overflow:hidden;padding:5px;","%label":"color:[txt];display:inline-block;margin-right:10px;font-family:lucida grande, lucida, tahoma, helvetica, arial, sans-serif;font-size:16px;font-weight:bold;","%_tw":"display:inline-block;background:url([tdr]widget-bird.png) no-repeat 0 0;width:18px;height:16px;"}},t}),define("twitterFeed",["core","santaProps","skins","twitterFeed/skins/skins.json"],function(t,e,i,r){"use strict";var n=t.compMixins,o={displayName:"TwitterFeed",mixins:[n.skinBasedComp,n.skinInfo],propTypes:{compData:e.Types.Component.compData.isRequired},statics:{useSantaTypes:!0},getSkinProperties:function(){var t=function(t){return t.accountToFollow||"wix"}(this.props.compData);return{label:{children:t},link:{href:"https://twitter.com/intent/user?screen_name="+t}}}};return t.compRegistrar.register("wysiwyg.viewer.components.TwitterFeed",o,!0),i.skinsMap.addBatch(r),o});
//# sourceMappingURL=twitterFeed.min.js.map