/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','./PlanningCalendarRow','./library','sap/ui/unified/library'],function(q,C,L,P,l,u){"use strict";var a=C.extend("sap.m.PlanningCalendar",{metadata:{library:"sap.m",properties:{startDate:{type:"object",group:"Data"},viewKey:{type:"string",group:"Appearance",defaultValue:sap.ui.unified.CalendarIntervalType.Hour},singleSelection:{type:"boolean",group:"Misc",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},showRowHeaders:{type:"boolean",group:"Appearance",defaultValue:true},noDataText:{type:"string",group:"Misc",defaultValue:null}},aggregations:{rows:{type:"sap.m.PlanningCalendarRow",multiple:true,singularName:"row"},views:{type:"sap.m.PlanningCalendarView",multiple:true,singularName:"view"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},toolbarContent:{type:"sap.ui.core.Control",multiple:true,singularName:"toolbarContent"},table:{type:"sap.m.Table",multiple:false,visibility:"hidden"}},events:{appointmentSelect:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"},multiSelect:{type:"boolean"}}},intervalSelect:{parameters:{startDate:{type:"object"}}},rowSelectionChange:{parameters:{rows:{type:"sap.m.PlanningCalendarRow[]"}}},startDateChange:{},viewChange:{}}}});var b=sap.ui.core.Control.extend("CalendarHeader",{metadata:{aggregations:{"toolbar":{type:"sap.m.Toolbar",multiple:false},"allCheckBox":{type:"sap.m.CheckBox",multiple:false}}},renderer:function(R,H){R.write("<div");R.writeControlData(H);R.addClass("sapMPlanCalHead");R.writeClasses();R.write(">");var T=H.getToolbar();if(T){R.renderControl(T);}var A=H.getAllCheckBox();if(A){R.renderControl(A);}R.write("</div>");}});a.prototype.init=function(){this._iBreakPointTablet=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];if(sap.ui.Device.system.phone||q('html').hasClass("sapUiMedia-Std-Phone")){this._iSize=0;this._iSizeScreen=0;}else if(sap.ui.Device.system.tablet||q('html').hasClass("sapUiMedia-Std-Tablet")){this._iSize=1;this._iSizeScreen=1;}else{this._iSize=2;this._iSizeScreen=2;}var i=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();var j=new sap.ui.core.Locale(i);this._oLocaleData=L.getInstance(j);this._oIntervalTypeSelect=new sap.m.Select(this.getId()+"-IntType",{maxWidth:"15rem"});this._oIntervalTypeSelect.attachEvent("change",_,this);this._oTodayButton=new sap.m.Button(this.getId()+"-Today",{text:this._oLocaleData.getRelativeDay(0),type:sap.m.ButtonType.Transparent});this._oTodayButton.attachEvent("press",c,this);this._oHeaderToolbar=new sap.m.Toolbar(this.getId()+"-HeaderToolbar",{design:sap.m.ToolbarDesign.Transparent,content:[this._oIntervalTypeSelect,this._oTodayButton]});this._oCalendarHeader=new b(this.getId()+"-CalHead",{toolbar:this._oHeaderToolbar});this._oInfoToolbar=new sap.m.Toolbar(this.getId()+"-InfoToolbar",{height:"auto",design:sap.m.ToolbarDesign.Transparent,content:[this._oCalendarHeader,this._oTimeInterval]});var T=new sap.m.Table(this.getId()+"-Table",{infoToolbar:this._oInfoToolbar,mode:sap.m.ListMode.SingleSelectMaster,columns:[new sap.m.Column({styleClass:"sapMPlanCalRowHead"}),new sap.m.Column({width:"80%",styleClass:"sapMPlanCalAppRow",minScreenWidth:sap.m.ScreenSize.Desktop,demandPopin:true})]});T.attachEvent("selectionChange",k,this);this.setAggregation("table",T,true);this.setStartDate(new Date());this._resizeProxy=q.proxy(f,this);};a.prototype.exit=function(){if(this._sResizeListener){sap.ui.core.ResizeHandler.deregister(this._sResizeListener);this._sResizeListener=undefined;}if(this._sUpdateCurrentTime){q.sap.clearDelayedCall(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined;}var T=this.getAggregation("table");T.removeAllItems();if(this._oTimeInterval){this._oTimeInterval._oPlanningCalendar=undefined;this._oTimeInterval.destroy();this._oTimeInterval=undefined;}if(this._oDateInterval){this._oDateInterval._oPlanningCalendar=undefined;this._oDateInterval.destroy();this._oDateInterval=undefined;}if(this._oMonthInterval){this._oMonthInterval._oPlanningCalendar=undefined;this._oMonthInterval.destroy();this._oMonthInterval=undefined;}if(this._aViews){for(var i=0;i<this._aViews.length;i++){this._aViews[i].destroy();}}if(this._oSelectAllCheckBox){this._oSelectAllCheckBox.destroy();}if(this.getToolbarContent().length==0&&this._oToolbar){this._oToolbar.destroy();this._oToolbar=undefined;}};a.prototype.onBeforeRendering=function(){this._bBeforeRendering=true;if((!this._oTimeInterval&&!this._oDateInterval&&!this._oMonthInterval)||this._bCheckView){this.setViewKey(this.getViewKey());this._bCheckView=undefined;}r.call(this);if(this._sUpdateCurrentTime){q.sap.clearDelayedCall(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined;}this._bBeforeRendering=undefined;};a.prototype.onAfterRendering=function(E){E.size={width:this.getDomRef().offsetWidth};f.call(this,E,true);if(!this._sResizeListener){this._sResizeListener=sap.ui.core.ResizeHandler.register(this,this._resizeProxy);}g.call(this,false);};a.prototype.setStartDate=function(S){if(!S){S=new Date();}if(!(S instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var Y=S.getFullYear();if(Y<1||Y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}this.setProperty("startDate",S,true);if(this._oTimeInterval){this._oTimeInterval.setStartDate(new Date(S.getTime()));}if(this._oDateInterval){this._oDateInterval.setStartDate(new Date(S.getTime()));}if(this._oMonthInterval){this._oMonthInterval.setStartDate(new Date(S.getTime()));}var R=this.getRows();for(var i=0;i<R.length;i++){var j=R[i];j.getCalendarRow().setStartDate(new Date(S.getTime()));}if(this.getDomRef()){g.call(this,false);}return this;};a.prototype.setViewKey=function(K){this.setProperty("viewKey",K,true);this._oIntervalTypeSelect.setSelectedKey(K);if(this._oInfoToolbar.getContent().length>1){this._oInfoToolbar.removeContent(1);}var S=this.getStartDate();var V=p.call(this,K,!this._bBeforeRendering);if(!V){this._bCheckView=true;this.invalidate();}else{var I=V.getIntervalType();var j=s.call(this,V);switch(I){case sap.ui.unified.CalendarIntervalType.Hour:if(!this._oTimeInterval){this._oTimeInterval=new sap.ui.unified.CalendarTimeInterval(this.getId()+"-TimeInt",{startDate:new Date(S.getTime()),items:j,pickerPopup:true});this._oTimeInterval.attachEvent("startDateChange",d,this);this._oTimeInterval.attachEvent("select",e,this);this._oTimeInterval._oPlanningCalendar=this;this._oTimeInterval.getSpecialDates=function(){return this._oPlanningCalendar.getSpecialDates();};}else if(this._oTimeInterval.getItems()!=j){this._oTimeInterval.setItems(j);}this._oInfoToolbar.addContent(this._oTimeInterval);break;case sap.ui.unified.CalendarIntervalType.Day:if(!this._oDateInterval){this._oDateInterval=new sap.ui.unified.CalendarDateInterval(this.getId()+"-DateInt",{startDate:new Date(S.getTime()),days:j,showDayNamesLine:false,pickerPopup:true});this._oDateInterval.attachEvent("startDateChange",d,this);this._oDateInterval.attachEvent("select",e,this);this._oDateInterval._oPlanningCalendar=this;this._oDateInterval.getSpecialDates=function(){return this._oPlanningCalendar.getSpecialDates();};}else if(this._oDateInterval.getDays()!=j){this._oDateInterval.setDays(j);}this._oInfoToolbar.addContent(this._oDateInterval);break;case sap.ui.unified.CalendarIntervalType.Month:if(!this._oMonthInterval){this._oMonthInterval=new sap.ui.unified.CalendarMonthInterval(this.getId()+"-MonthInt",{startDate:new Date(S.getTime()),months:j,pickerPopup:true});this._oMonthInterval.attachEvent("startDateChange",d,this);this._oMonthInterval.attachEvent("select",e,this);this._oMonthInterval._oPlanningCalendar=this;this._oMonthInterval.getSpecialDates=function(){return this._oPlanningCalendar.getSpecialDates();};}else if(this._oMonthInterval.setMonths()!=j){this._oMonthInterval.setMonths(j);}this._oInfoToolbar.addContent(this._oMonthInterval);break;default:throw new Error("Unknown IntervalType: "+I+"; "+this);}var R=this.getRows();for(var i=0;i<R.length;i++){var A=R[i];var B=A.getCalendarRow();B.setIntervalType(I);B.setIntervals(j);B.setShowSubIntervals(V.getShowSubIntervals());}if(this.getDomRef()){g.call(this,false);}}return this;};a.prototype.setShowIntervalHeaders=function(S){this.setProperty("showIntervalHeaders",S,true);var R=this.getRows();for(var i=0;i<R.length;i++){var j=R[i];j.getCalendarRow().setShowIntervalHeaders(S);}return this;};a.prototype.setShowRowHeaders=function(S){this.setProperty("showRowHeaders",S,true);var T=this.getAggregation("table");T.getColumns()[0].setVisible(S);this.$().toggleClass("sapMPlanCalNoHead",!S);x.call(this);z.call(this);return this;};a.prototype.addRow=function(R){this.addAggregation("rows",R,true);R.attachEvent("_change",y,this);var T=this.getAggregation("table");T.addItem(R.getColumnListItem());var i=R.getCalendarRow();i.setStartDate(this.getStartDate());i.setShowIntervalHeaders(this.getShowIntervalHeaders());i.attachEvent("select",h,this);i.attachEvent("startDateChange",d,this);i.attachEvent("leaveRow",v,this);w.call(this);if(this._oTimeInterval||this._oDateInterval||this._oMonthInterval){var K=this.getViewKey();var V=p.call(this,K);var I=V.getIntervalType();var j=s.call(this,V);i.setIntervalType(I);i.setIntervals(j);i.setShowSubIntervals(V.getShowSubIntervals());}z.call(this);return this;};a.prototype.insertRow=function(R,i){this.insertAggregation("rows",R,i);R.attachEvent("_change",y,this);var T=this.getAggregation("table");T.insertItem(R.getColumnListItem(),i,true);var j=R.getCalendarRow();j.setStartDate(this.getStartDate());j.setShowIntervalHeaders(this.getShowIntervalHeaders());j.attachEvent("select",h,this);j.attachEvent("startDateChange",d,this);j.attachEvent("leaveRow",v,this);w.call(this);if(this._oTimeInterval||this._oDateInterval||this._oMonthInterval){var K=this.getViewKey();var V=p.call(this,K);var I=V.getIntervalType();var A=s.call(this,V);j.setIntervalType(I);j.setIntervals(A);j.setShowSubIntervals(V.getShowSubIntervals());}z.call(this);return this;};a.prototype.removeRow=function(O){var R=this.removeAggregation("rows",O,true);R.detachEvent("_change",y,this);var T=this.getAggregation("table");T.removeItem(R.getColumnListItem(),true);var i=R.getCalendarRow();i.detachEvent("select",h,this);i.detachEvent("startDateChange",d,this);i.detachEvent("leaveRow",v,this);w.call(this);z.call(this);return R;};a.prototype.removeAllRows=function(){var R=this.removeAllAggregation("rows",true);var T=this.getAggregation("table");T.removeAllItems(true);for(var i=0;i<R.length;i++){var j=R[i];j.detachEvent("_change",y,this);var A=j.getCalendarRow();A.detachEvent("select",h,this);A.detachEvent("startDateChange",d,this);A.detachEvent("leaveRow",v,this);}w.call(this);z.call(this);return R;};a.prototype.destroyRows=function(){var i=this.destroyAggregation("rows",true);var T=this.getAggregation("table");T.destroyItems(true);w.call(this);z.call(this);return i;};a.prototype.addToolbarContent=function(i){this.addAggregation("toolbarContent",i,true);m.call(this);return this;};a.prototype.insertToolbarContent=function(i,I){this.insertAggregation("toolbarContent",i,I);m.call(this);return this;};a.prototype.removeToolbarContent=function(O){var R=this.removeAggregation("toolbarContent",O,true);m.call(this);return R;};a.prototype.removeAllToolbarContent=function(){var R=this.removeAllAggregation("toolbarContent",true);m.call(this);return R;};a.prototype.destroyToolbarContent=function(){var i=this.destroyAggregation("toolbarContent",true);m.call(this);return i;};a.prototype.indexOfContent=function(i){return this.indexOfToolbarContent(i);};a.prototype.setSingleSelection=function(S){this.setProperty("singleSelection",S,true);x.call(this);z.call(this);if(S){this.selectAllRows(false);}else{w.call(this);}this.$().toggleClass("sapMPlanCalMultiSel",!S);return this;};a.prototype.setNoDataText=function(N){this.setProperty("noDataText",N,true);var T=this.getAggregation("table");T.setNoDataText(N);return this;};a.prototype.invalidate=function(O){if(this._bDateRangeChanged||(O&&O instanceof sap.ui.unified.DateRange)){if(this.getDomRef()){var K=this.getViewKey();var V=p.call(this,K);var i=V.getIntervalType();switch(i){case sap.ui.unified.CalendarIntervalType.Hour:if(this._oTimeInterval){this._oTimeInterval.invalidate(arguments);}break;case sap.ui.unified.CalendarIntervalType.Day:if(this._oDateInterval){this._oDateInterval.invalidate(arguments);}break;case sap.ui.unified.CalendarIntervalType.Month:if(this._oMonthInterval){this._oMonthInterval.invalidate(arguments);}break;default:throw new Error("Unknown IntervalType: "+i+"; "+this);}}this._bDateRangeChanged=undefined;}else{C.prototype.invalidate.apply(this,arguments);}};a.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};a.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var D=this.destroyAggregation("specialDates");return D;};a.prototype.getSelectedRows=function(){return this.getRows().filter(function(R){return R.getSelected();});};a.prototype.selectAllRows=function(S){var R=this.getRows();if(!(S&&this.getSingleSelection())){for(var i=0;i<R.length;i++){var j=R[i];j.setSelected(S);}if(this._oSelectAllCheckBox){this._oSelectAllCheckBox.setSelected(S);}}return this;};a.prototype.onsaphomemodifiers=function(E){if((E.metaKey||E.ctrlKey)&&!E.altKey&&!E.shiftKey){var R=this.getRows();var i=R[0];var N=new q.Event("saphome");N.originalEvent=N.originalEvent||{};N._bPlanningCalendar=true;i.getCalendarRow().onsaphome(N);E.preventDefault();E.stopPropagation();}};a.prototype.onsapendmodifiers=function(E){if((E.metaKey||E.ctrlKey)&&!E.altKey&&!E.shiftKey){var R=this.getRows();var i=R[R.length-1];var N=new q.Event("sapend");N.originalEvent=N.originalEvent||{};N._bPlanningCalendar=true;i.getCalendarRow().onsapend(N);E.preventDefault();E.stopPropagation();}};function _(E){this.setViewKey(E.getParameter("selectedItem").getKey());this.fireViewChange();}function c(E){this.setStartDate(new Date());this.fireStartDateChange();}function d(E){var S=E.oSource.getStartDate();this.setStartDate(new Date(S.getTime()));this.fireStartDateChange();}function e(E){var S=E.oSource.getSelectedDates();var i=new Date(S[0].getStartDate());S[0].setStartDate();this.fireIntervalSelect({startDate:i});}function f(E,N){if(E.size.width<=0){return;}var R=this.getRows();var j;var i=0;var O=this._iSize;n.call(this,E.size.width);if(O!=this._iSize){var K=this.getViewKey();var V=p.call(this,K);var I=V.getIntervalType();var A=s.call(this,V);for(i=0;i<R.length;i++){j=R[i];var B=j.getCalendarRow();if(A!=B.getIntervals()){B.setIntervals(A);}else{B.handleResize();}}switch(I){case sap.ui.unified.CalendarIntervalType.Hour:if(this._oTimeInterval&&this._oTimeInterval.getItems()!=A){this._oTimeInterval.setItems(A);}break;case sap.ui.unified.CalendarIntervalType.Day:if(this._oDateInterval&&this._oDateInterval.getDays()!=A){this._oDateInterval.setDays(A);}break;case sap.ui.unified.CalendarIntervalType.Month:if(this._oMonthInterval&&this._oMonthInterval.getMonths()!=A){this._oMonthInterval.setMonths(A);}break;default:throw new Error("Unknown IntervalType: "+I+"; "+this);}x.call(this);}else if(!N){for(i=0;i<R.length;i++){j=R[i];j.getCalendarRow().handleResize();}}}function g(U){if(this._sUpdateCurrentTime){q.sap.clearDelayedCall(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined;}if(U){var R=this.getRows();for(var i=0;i<R.length;i++){var j=R[i];j.getCalendarRow().updateCurrentTimeVisualization();}}var N=new Date();var S=this.getStartDate();var K=this.getViewKey();var V=p.call(this,K);var I=V.getIntervalType();var A=s.call(this,V);var T=0;var B=0;var E=0;switch(I){case sap.ui.unified.CalendarIntervalType.Hour:T=60000;B=S.getTime()-3600000;E=S.getTime()+A*3600000;break;case sap.ui.unified.CalendarIntervalType.Day:T=1800000;B=S.getTime()-3600000;E=S.getTime()+A*86400000;break;default:T=-1;break;}if(N.getTime()<=E&&N.getTime()>=B&&T>0){this._sUpdateCurrentTime=q.sap.delayedCall(T,this,g,[true]);}}function h(E){var A=E.getParameter("appointment");var M=E.getParameter("multiSelect");var B=E.getParameter("appointments");if(!M){var R=this.getRows();for(var i=0;i<R.length;i++){var D=R[i];var F=D.getCalendarRow();if(E.oSource!=F){var G=D.getAppointments();for(var j=0;j<G.length;j++){var H=G[j];H.setSelected(false);}}}}this.fireAppointmentSelect({appointment:A,appointments:B,multiSelect:M});}function k(E){var j=[];var R=this.getRows();for(var i=0;i<R.length;i++){var A=R[i];var B=A.getColumnListItem();var S=B.getSelected();if(A.getSelected()!=S){A.setProperty("selected",S,true);j.push(A);}}if(!this.getSingleSelection()){w.call(this);}if(j.length>0){this.fireRowSelectionChange({rows:j});}}function m(){var T=this.getAggregation("table");if(this.getToolbarContent().length>0){if(!this._oToolbar){this._oToolbar=new sap.m.OverflowToolbar(this.getId()+"-Toolbar",{design:sap.m.ToolbarDesign.Transpaent});this._oToolbar._oPlanningCalendar=this;this._oToolbar.getContent=function(){return this._oPlanningCalendar.getToolbarContent();};}if(!T.getHeaderToolbar()){T.setHeaderToolbar(this._oToolbar);}}else if(T.getHeaderToolbar()){T.setHeaderToolbar();}this._oToolbar.invalidate();}function n(W){if(W<this._iBreakPointTablet){this._iSize=0;}else if(W<this._iBreakPointDesktop){this._iSize=1;}else{this._iSize=2;}if(q('html').hasClass("sapUiMedia-Std-Phone")){this._iSizeScreen=0;}else if(q('html').hasClass("sapUiMedia-Std-Tablet")){this._iSizeScreen=1;}else{this._iSizeScreen=2;}}function o(){var V=this.getViews();if(V.length==0){if(!this._aViews){this._aViews=[];var i=new sap.m.PlanningCalendarView(this.getId()+"-HourView",{key:sap.ui.unified.CalendarIntervalType.Hour,intervalType:sap.ui.unified.CalendarIntervalType.Hour,description:this._oLocaleData.getDisplayName("hour"),intervalsS:6,intervalsM:6,intervalsL:12});this._aViews.push(i);var j=new sap.m.PlanningCalendarView(this.getId()+"-DayView",{key:sap.ui.unified.CalendarIntervalType.Day,intervalType:sap.ui.unified.CalendarIntervalType.Day,description:this._oLocaleData.getDisplayName("day"),intervalsS:7,intervalsM:7,intervalsL:14});this._aViews.push(j);var A=new sap.m.PlanningCalendarView(this.getId()+"-MonthView",{key:sap.ui.unified.CalendarIntervalType.Month,intervalType:sap.ui.unified.CalendarIntervalType.Month,description:this._oLocaleData.getDisplayName("month"),intervalsS:3,intervalsM:6,intervalsL:12});this._aViews.push(A);}V=this._aViews;}return V;}function p(K,N){var V=o.call(this);var j;for(var i=0;i<V.length;i++){j=V[i];if(j.getKey()!=K){j=undefined;}else{break;}}if(!j&&!N){throw new Error("PlanningCalendarView with key "+K+"not assigned "+this);}return j;}function r(){var V=o.call(this);var I=this._oIntervalTypeSelect.getItems();var i=0;var j;if(V.length<I.length){for(i=V.length;i<I.length;i++){j=I[i];this._oIntervalTypeSelect.removeItem(j);j.destroy();}}for(i=0;i<V.length;i++){var A=V[i];j=I[i];if(j){if(j.getKey()!=A.getKey()||j.getText()!=A.getDescription()){j.setKey(A.getKey());j.setText(A.getDescription());j.setTooltip(A.getTooltip());}}else{j=new sap.ui.core.Item(this.getId()+"-"+i,{key:A.getKey(),text:A.getDescription(),tooltip:A.getTooltip()});this._oIntervalTypeSelect.addItem(j);}}}function s(V){var i=0;switch(this._iSize){case 0:i=V.getIntervalsS();break;case 1:i=V.getIntervalsM();break;default:i=V.getIntervalsL();break;}return i;}function t(E){var A=E.getParameter("selected");var R=this.getRows();if(A){R=this.getRows().filter(function(i){return!i.getSelected();});}this.selectAllRows(A);this.fireRowSelectionChange({rows:R});}function v(E){var j=E.oSource;var T=E.getParameter("type");var R=this.getRows();var A;var N;var B;var D;var i=0;var I=0;var F;for(i=0;i<R.length;i++){A=R[i];if(A.getCalendarRow()==j){I=i;break;}}switch(T){case"sapup":B=j.getFocusedAppointment();D=B.getStartDate();if(I>0){I--;}N=R[I];N.getCalendarRow().focusNearestAppointment(D);break;case"sapdown":B=j.getFocusedAppointment();D=B.getStartDate();if(I<R.length-1){I++;}N=R[I];N.getCalendarRow().focusNearestAppointment(D);break;case"saphome":if(I>0){N=R[0];F=new q.Event(T);F.originalEvent=F.originalEvent||{};F._bPlanningCalendar=true;N.getCalendarRow().onsaphome(F);}break;case"sapend":if(I<R.length-1){N=R[R.length-1];F=new q.Event(T);F.originalEvent=F.originalEvent||{};F._bPlanningCalendar=true;N.getCalendarRow().onsapend(F);}break;default:break;}}function w(){if(this._oSelectAllCheckBox){var R=this.getRows();var S=this.getSelectedRows();if(R.length==S.length&&S.length>0){this._oSelectAllCheckBox.setSelected(true);}else{this._oSelectAllCheckBox.setSelected(false);}}}function x(){if(this.getSingleSelection()){if(this._oCalendarHeader.getAllCheckBox()){this._oCalendarHeader.setAllCheckBox();}else if(this._oInfoToolbar.getContent().length>2){this._oInfoToolbar.removeContent(this._oSelectAllCheckBox);}}else{if(!this._oSelectAllCheckBox){this._oSelectAllCheckBox=new sap.m.CheckBox(this.getId()+"-All",{text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("COLUMNSPANEL_SELECT_ALL")});this._oSelectAllCheckBox.attachEvent("select",t,this);}if(this._iSizeScreen<2||!this.getShowRowHeaders()){var i=this._oInfoToolbar.indexOfContent(this._oSelectAllCheckBox);if(this._iSizeScreen<2){if(i<this._oInfoToolbar.getContent().length-1){this._oInfoToolbar.addContent(this._oSelectAllCheckBox);}}else if(i<0||i>1){if(i>1){this._oInfoToolbar.removeContent(this._oSelectAllCheckBox);}this._oInfoToolbar.insertContent(this._oSelectAllCheckBox,1);}}else{this._oCalendarHeader.setAllCheckBox(this._oSelectAllCheckBox);}}}function y(E){if(E.getParameter("name")=="selected"){w.call(this);}}function z(){var T=this.getAggregation("table");var M=T.getMode();var i;if(this.getSingleSelection()){if(!this.getShowRowHeaders()&&this.getRows().length==1){i=sap.m.ListMode.None;}else{i=sap.m.ListMode.SingleSelectMaster;}}else{i=sap.m.ListMode.MultiSelect;}if(M!=i){T.setMode(i);}}return a;},true);
