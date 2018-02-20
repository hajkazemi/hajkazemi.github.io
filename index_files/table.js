define("table",["santaComponents","lodash","core","prop-types"],function(e,t,r,o){"use strict";function s(r){var o=r?"header":"footer",s=r?this.props.getHeaderCell:this.props.getFooterCell;return t.times(this.props.compProp.numOfColumns,function(t){var r=s(t),i=o+"_cell_"+t,p={ref:i,key:i};return e.utils.createReactElement("td",p,r)})}var i={displayName:"Table",mixins:[r.compMixins.skinBasedComp],propType:{getBodyCell:o.func.isRequired,getHeaderCell:o.func.isRequired,getFooterCell:o.func.isRequired},getSkinProperties:function(){var r={tableBody:{children:function(){var r=t.times(this.props.compProp.numOfRows,function(r){var o=t.times(this.props.compProp.numOfColumns,function(t){var o=this.props.getBodyCell(t,r),s="cell_"+r+"_"+t,i={style:this.props.compData.columnsStyle[t],ref:s,key:s};return e.utils.createReactElement("td",i,o)}.bind(this));return e.utils.createReactElement("tr",{key:"row_"+r,ref:"row_"+r},o)}.bind(this)),o=e.utils.createReactElement("tr",{key:"row_spacer",ref:"row_spacer",className:this.classSet({spacer:!0})},e.utils.createReactElement("td",{colSpan:"100%"}));return r.push(o),r}.call(this)}};return this.props.compProp.minHeight&&(r[""]={style:{minHeight:this.props.compProp.minHeight,width:"100%"}},r.table={style:{height:this.props.compProp.minHeight}}),this.props.compProp.header&&(r.tableHeader={children:e.utils.createReactElement("tr",{key:"row_header"},s.call(this,!0))}),this.props.compProp.footer&&(r.tableFooter={children:e.utils.createReactElement("tr",{key:"row_footer"},s.call(this,!1))}),r}};return r.compRegistrar.register("wysiwyg.viewer.components.Table",i),i});
//# sourceMappingURL=table.min.js.map