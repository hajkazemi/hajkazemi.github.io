define("paypalButton/skins/skins.json",[],function(){"use strict";var e={};return e["wysiwyg.viewer.skins.PayPalButtonSkin"]={react:[["form","form",[],{action:"https://www.paypal.com/cgi-bin/webscr",method:"post"},["input","cmd",[],{type:"hidden",name:"cmd"}],["input","item_name",[],{type:"hidden",name:"item_name"}],["input","item_number",[],{type:"hidden",name:"item_number"}],["input","bn",[],{type:"hidden",name:"bn"}],["input","business",[],{type:"hidden",name:"business"}],["input","currency_code",[],{type:"hidden",name:"currency_code"}],["input","notify_url",[],{type:"hidden",name:"notify_url"}],["input","return",[],{type:"hidden",name:"return"}],["input","cancel_return",[],{type:"hidden",name:"cancel_return"}],["input","amount",[],{type:"hidden",name:"amount"}],["img","submitImage",[],{}],["img","trackingPixel",[],{width:"1",height:"1"}]]],params:{clr:"TEXT_COLOR"},paramsDefaults:{clr:"color_1"},css:{"%":"display:table;","%text":"color:[clr];position:absolute;top:48%;left:30%;","%submitImage":"display:block;cursor:pointer;","%trackingPixel":"position:absolute;"}},e}),define("paypalButton",["core","lodash","santaProps","reactDOM","utils","skins","paypalButton/skins/skins.json"],function(e,t,n,i,a,o,r){"use strict";var p=e.compMixins,m=n.Types,s="Buy now via PayPal",u="Donate via PayPal",l={da:{image:"da_DK",pixel:"da_DK"},de:{image:"de_DE",pixel:"de_DE"},en:{image:"en_US",pixel:"en_US"},es:{image:"es_ES",pixel:"es_ES"},fr:{image:"fr_FR",pixel:"fr_FR"},it:{image:"it_IT",pixel:"it_IT"},ja:{image:"ja_JP",pixel:"ja_JP"},jp:{image:"ja_JP",pixel:"ja_JP"},nl:{image:"nl_NL",pixel:"nl_NL"},no:{image:"no_NO",pixel:"en_US"},pl:{image:"pl_PL",pixel:"pl_PL"},pt:{image:"pt_BR",pixel:"pt_BR"},ru:{image:"ru_RU",pixel:"en_US"},sv:{image:"sv_SE",pixel:"sv_SE"},tr:{image:"tr_TR",pixel:"tr_TR"}},c={displayName:"PayPalButton",mixins:[p.skinBasedComp],propTypes:{compData:m.Component.compData,compProp:m.Component.compProp,currentUrl:m.currentUrl,userLanguage:n.Types.WixUserSantaTypes.userLanguage.isRequired},statics:{useSantaTypes:!0},onImageChanged:function(){this.registerReLayout(),this.forceUpdate()},submitForm:function(){i.findDOMNode(this.refs.form).submit()},handleSubmitImageKeyPress:function(e){t.includes([" ","Enter"],e.key)&&(this.submitForm(),e.preventDefault())},getSkinProperties:function(){var e=this.props,n=function(e){var t={};return"buy"===e.buttonType?(t.cmdType="_xclick",t.buildNotation="Wix_BuyNow_WPS_IL",t.itemName=e.itemName,t.itemNumber=e.itemID):(t.cmdType="_donations",t.buildNotation="Wix_Donate_WPS_IL",t.itemName=e.organizationName,t.itemNumber=e.organizationID),t}(e.compProp),i=function(e,t){var n=function(e,t){return"userLang"===e?t:e}(e,t)||"";return l[n.toLowerCase()]||l.en}(e.compProp.language,this.props.userLanguage),o=e.currentUrl.full,r=e.compProp.amount;return{"":{style:{width:"",height:""}},form:{target:e.compProp.target},cmd:{value:n.cmdType},item_name:{value:n.itemName},item_number:{value:n.itemNumber},bn:{value:n.buildNotation},business:{value:e.compData.merchantID},currency_code:{value:e.compProp.currencyCode},notify_url:{value:"https://inventory.wix.com/ecommerce/ipn/paypal"},return:{value:o},cancel_return:{value:o},amount:{value:parseFloat(r,10)>0?r:void 0},trackingPixel:{src:t.template("https://www.paypalobjects.com/${locale}/i/scr/pixel.gif")({locale:i.pixel}),role:"none"},submitImage:{src:t.template("https://www.paypalobjects.com/${locale}/i/btn/btn_${buttonType}${showCreditCards}${buttonSize}.gif")({locale:i.image,buttonType:"buy"===e.compProp.buttonType?"buynow":"donate",showCreditCards:e.compProp.showCreditCards&&!e.compProp.smallButton?"CC":"",buttonSize:e.compProp.smallButton?"_SM":"_LG"}),onLoad:this.onImageChanged,onClick:this.submitForm,onKeyDown:a.accessibility.keyboardInteractions.activateBySpaceOrEnterButton,tabIndex:"0",role:"button","aria-label":function(e){return"buy"===e?s:u}(e.compProp.buttonType)}}}};return e.compRegistrar.register("wysiwyg.viewer.components.PayPalButton",c,!0),o.skinsMap.addBatch(r),c});
//# sourceMappingURL=paypalButton.min.js.map