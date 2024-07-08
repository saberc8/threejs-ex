<?xml version="1.0" encoding="UTF-8"?>
<DuchampElementCaseWidget xmlVersion="20211223" releaseVersion="11.0.0">
<fontDependencies value="Source Han Sans-FVS ExtraLight"/>
<ElementCaseEditor applyWithPXUnit="true">
<WidgetAttr aspectRatioLocked="false" aspectRatioBackup="-1.0" description="">
<MobileBookMark useBookMark="false" bookMarkName="" frozen="false" index="-1" oldWidgetName=""/>
<PrivilegeControl/>
</WidgetAttr>
<FollowingTheme borderStyle="false"/>
<Margin top="0" left="0" bottom="0" right="0"/>
<Border>
<border style="0" borderRadius="0" type="0" borderStyle="0">
<color>
<FineColor color="-723724" hor="-1" ver="-1"/>
</color>
</border>
<WidgetTitle>
<O>
<![CDATA[新建标题]]></O>
<FRFont name="SimSun" style="0" size="72"/>
<Position pos="0"/>
</WidgetTitle>
<Alpha alpha="1.0"/>
</Border>
<FormElementCase>
<ReportPageAttr>
<HR F="0" T="0"/>
<FR/>
<HC/>
<FC/>
<UPFCR COLUMN="false" ROW="true"/>
<USE REPEAT="true" PAGE="true" WRITE="false"/>
</ReportPageAttr>
<ColumnPrivilegeControl/>
<RowPrivilegeControl/>
<RowHeight defaultValue="723900">
<![CDATA[838200,841828,723900,723900,723900,723900,723900,723900,723900,723900,723900]]></RowHeight>
<ColumnWidth defaultValue="2743200">
<![CDATA[6797040,3840480,3413760,2743200,2743200,2743200,2743200,2743200,2743200,2743200,2743200]]></ColumnWidth>
<CellElementList>
<C c="0" r="0" s="0">
<O>
<![CDATA[物耗类型]]></O>
<PrivilegeControl/>
<Expand>
<cellSortAttr>
<sortExpressions/>
<sortHeader sortArea="A1"/>
</cellSortAttr>
</Expand>
</C>
<C c="1" r="0" s="1">
<O>
<![CDATA[数量]]></O>
<PrivilegeControl/>
<Expand>
<cellSortAttr/>
</Expand>
</C>
<C c="2" r="0" s="1">
<O>
<![CDATA[状态]]></O>
<PrivilegeControl/>
<Expand>
<cellSortAttr/>
</Expand>
</C>
<C c="0" r="1" s="2">
<O t="DSColumn">
<Attributes dsName="1-5物耗状态" columnName="物耗类型"/>
<Complex/>
<RG class="com.fr.report.cell.cellattr.core.group.FunctionGrouper"/>
<Parameters/>
<cellSortAttr/>
</O>
<PrivilegeControl/>
<HighlightList>
<Highlight class="com.fr.report.cell.cellattr.highlight.DefaultHighlight">
<Name>
<![CDATA[条件属性1]]></Name>
<Condition class="com.fr.data.condition.FormulaCondition">
<Formula>
<![CDATA[ROUNDUP((ROW()-1)/1,0)%2=0]]></Formula>
</Condition>
<HighlightAction class="com.fr.report.cell.cellattr.highlight.BackgroundHighlightAction">
<Scope val="1"/>
<Background name="ImageBackground" layout="1">
<FineImage fm="png" imageId="__ImageCache__4EE598CF800F1AE91D48C9C470CEEF17">
<IM>
<![CDATA[lO<9(kN.ld@UNU%p%320@UNU!#\8j4YQ7>X1?JibQ0[\o(fE*OmF?p'$jmCJ%,O.o39OC[AY
3pN;V/+C]Aj&gh1bAK:c+jlL;h?/jNQkm8-f]Am0,_d"R\CXi\7lkeU4FJdg[$\\Ye^%ft;aM,
t~
]]></IM>
</FineImage>
</Background>
</HighlightAction>
</Highlight>
</HighlightList>
<Expand dir="0">
<cellSortAttr/>
</Expand>
</C>
<C c="1" r="1" s="2">
<O t="DSColumn">
<Attributes dsName="1-5物耗状态" columnName="数量"/>
<Complex/>
<RG class="com.fr.report.cell.cellattr.core.group.FunctionGrouper"/>
<Parameters/>
<cellSortAttr/>
</O>
<PrivilegeControl/>
<CellGUIAttr adjustmode="1" showAsDefault="true"/>
<CellPageAttr/>
<CellOptionalAttrHolder>
<DesensitizationAttr class="com.fr.report.cell.cellattr.CellDesensitizationAttr">
<Desensitizations desensitizeScope="0"/>
</DesensitizationAttr>
</CellOptionalAttrHolder>
<Expand dir="0">
<cellSortAttr/>
</Expand>
</C>
<C c="2" r="1" s="2">
<O t="DSColumn">
<Attributes dsName="1-5物耗状态" columnName="状态"/>
<Complex/>
<RG class="com.fr.report.cell.cellattr.core.group.FunctionGrouper"/>
<Parameters/>
<cellSortAttr/>
</O>
<PrivilegeControl/>
<Expand dir="0">
<cellSortAttr/>
</Expand>
</C>
</CellElementList>
<ReportAttrSet>
<ReportSettings headerHeight="0" footerHeight="0">
<PaperSetting/>
<FollowingTheme background="true"/>
<Background name="ColorBackground">
<color>
<FineColor color="-1" hor="-1" ver="-1"/>
</color>
</Background>
</ReportSettings>
</ReportAttrSet>
</FormElementCase>
<StyleList>
<Style horizontal_alignment="0" imageLayout="1">
<FRFont name="Source Han Sans-FVS ExtraLight" style="1" size="96">
<foreground>
<FineColor color="-2302499" hor="-1" ver="-1"/>
</foreground>
</FRFont>
<Background name="ImageBackground" layout="2">
<FineImage fm="png" imageId="__ImageCache__D18AEECC275B56ECF4A5001BF46396DD">
<IM>
<![CDATA[lO<9(kN.ld@UNU%p%320!n%=)=Gh_?8Fl/V-id-oSh?$H'm&5<<b,`;&3+WZT;2.t'/d3Dol
K;;^?suForO\B:E%\0+,>-3-]AAoneJ-<84IOl1,<R-?BYj-GR<;L2*M90/!UXCdFS0]AXkEO<
r!!~
]]></IM>
</FineImage>
</Background>
<Border>
<Top>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Top>
<Bottom>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Bottom>
<Left>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Left>
<Right>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Right>
</Border>
</Style>
<Style horizontal_alignment="0" imageLayout="1">
<FRFont name="Source Han Sans-FVS ExtraLight" style="1" size="112">
<foreground>
<FineColor color="-2302499" hor="-1" ver="-1"/>
</foreground>
</FRFont>
<Background name="ImageBackground" layout="2">
<FineImage fm="png" imageId="__ImageCache__D18AEECC275B56ECF4A5001BF46396DD">
<IM>
<![CDATA[lO<9(kN.ld@UNU%p%320!n%=)=Gh_?8Fl/V-id-oSh?$H'm&5<<b,`;&3+WZT;2.t'/d3Dol
K;;^?suForO\B:E%\0+,>-3-]AAoneJ-<84IOl1,<R-?BYj-GR<;L2*M90/!UXCdFS0]AXkEO<
r!!~
]]></IM>
</FineImage>
</Background>
<Border>
<Top>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Top>
<Bottom>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Bottom>
<Left>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Left>
<Right>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Right>
</Border>
</Style>
<Style horizontal_alignment="0" imageLayout="1">
<FRFont name="Source Han Sans-FVS ExtraLight" style="1" size="96">
<foreground>
<FineColor color="-6118491" hor="-1" ver="-1"/>
</foreground>
</FRFont>
<Background name="NullBackground"/>
<Border>
<Top>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Top>
<Bottom>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Bottom>
<Left>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Left>
<Right>
<color>
<FineColor color="-9539986" hor="-1" ver="-1"/>
</color>
</Right>
</Border>
</Style>
</StyleList>
<DesensitizationList/>
<heightRestrict heightrestrict="false"/>
<heightPercent heightpercent="0.75"/>
<ElementCaseMobileAttrProvider horizontal="1" vertical="1" zoom="true" refresh="false" isUseHTML="false" isMobileCanvasSize="false" appearRefresh="false" allowFullScreen="false" allowDoubleClickOrZoom="true" functionalWhenUnactivated="false"/>
<MobileFormCollapsedStyle class="com.fr.form.ui.mobile.MobileFormCollapsedStyle">
<collapseButton showButton="true" foldedHint="" unfoldedHint="" defaultState="0">
<color>
<FineColor color="-6710887" hor="-1" ver="-1"/>
</color>
</collapseButton>
<collapsedWork value="false"/>
<lineAttr number="1"/>
</MobileFormCollapsedStyle>
</ElementCaseEditor>
</DuchampElementCaseWidget>
