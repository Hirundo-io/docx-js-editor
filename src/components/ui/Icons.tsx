/**
 * Inline SVG Icons - Material Symbols
 *
 * Official Material Symbols from Google Fonts, bundled as inline SVGs.
 * Source: https://fonts.google.com/icons
 */

import type { CSSProperties } from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const defaultSize = 20;

// SVG wrapper for Material Symbols (viewBox 0 -960 960 960)
function SvgIcon({
  size = defaultSize,
  className = '',
  style,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
      style={{ display: 'inline-flex', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ============================================================================
// TOOLBAR ICONS
// ============================================================================

export function IconUndo(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
    </SvgIcon>
  );
}

export function IconRedo(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
    </SvgIcon>
  );
}

export function IconPrint(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z" />
    </SvgIcon>
  );
}

export function IconBold(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
    </SvgIcon>
  );
}

export function IconItalic(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
    </SvgIcon>
  );
}

export function IconUnderline(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M200-120v-80h560v80H200Zm123-223q-56-63-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63q-101 0-157-63Z" />
    </SvgIcon>
  );
}

export function IconStrikethrough(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M486-160q-76 0-135-45t-85-123l88-38q14 48 48.5 79t85.5 31q42 0 76-20t34-64q0-18-7-33t-19-27h112q5 14 7.5 28.5T694-340q0 86-61.5 133T486-160ZM80-480v-80h800v80H80Zm402-326q66 0 115.5 32.5T674-674l-88 39q-9-29-33.5-52T484-710q-41 0-68 18.5T386-640h-96q2-69 54.5-117.5T482-806Z" />
    </SvgIcon>
  );
}

export function IconSuperscript(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M760-600v-80q0-17 11.5-28.5T800-720h80v-40H760v-40h120q17 0 28.5 11.5T920-760v40q0 17-11.5 28.5T880-680h-80v40h120v40H760ZM235-160l185-291-172-269h106l124 200h4l123-200h107L539-451l186 291H618L482-377h-4L342-160H235Z" />
    </SvgIcon>
  );
}

export function IconSubscript(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M760-160v-80q0-17 11.5-28.5T800-280h80v-40H760v-40h120q17 0 28.5 11.5T920-320v40q0 17-11.5 28.5T880-240h-80v40h120v40H760Zm-525-80 185-291-172-269h106l124 200h4l123-200h107L539-531l186 291H618L482-457h-4L342-240H235Z" />
    </SvgIcon>
  );
}

export function IconLink(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
    </SvgIcon>
  );
}

export function IconFormatClear(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m528-546-93-93-121-121h486v120H568l-40 94ZM792-56 460-388l-80 188H249l119-280L56-792l56-56 736 736-56 56Z" />
    </SvgIcon>
  );
}

export function IconAlignLeft(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z" />
    </SvgIcon>
  );
}

export function IconAlignCenter(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z" />
    </SvgIcon>
  );
}

export function IconAlignRight(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z" />
    </SvgIcon>
  );
}

export function IconAlignJustify(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z" />
    </SvgIcon>
  );
}

export function IconLineSpacing(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M240-160 80-320l56-56 64 62v-332l-64 62-56-56 160-160 160 160-56 56-64-62v332l64-62 56 56-160 160Zm240-40v-80h400v80H480Zm0-240v-80h400v80H480Zm0-240v-80h400v80H480Z" />
    </SvgIcon>
  );
}

export function IconListBulleted(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm-56.5-263.5Q120-687 120-720t23.5-56.5Q167-800 200-800t56.5 23.5Q280-753 280-720t-23.5 56.5Q233-640 200-640t-56.5-23.5Z" />
    </SvgIcon>
  );
}

export function IconListNumbered(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" />
    </SvgIcon>
  );
}

export function IconIndentIncrease(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h720v80H120Zm320-160v-80h400v80H440Zm0-160v-80h400v80H440Zm0-160v-80h400v80H440ZM120-760v-80h720v80H120Zm0 440v-320l160 160-160 160Z" />
    </SvgIcon>
  );
}

export function IconIndentDecrease(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h720v80H120Zm320-160v-80h400v80H440Zm0-160v-80h400v80H440Zm0-160v-80h400v80H440ZM120-760v-80h720v80H120Zm160 440L120-480l160-160v320Z" />
    </SvgIcon>
  );
}

export function IconTextColor(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M80 0v-160h800V0H80Zm140-280 210-560h100l210 560h-96l-50-144H368l-52 144h-96Zm176-224h168l-82-232h-4l-82 232Z" />
    </SvgIcon>
  );
}

export function IconHighlight(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M544-400 440-504 240-304l104 104 200-200Zm-47-161 104 104 199-199-104-104-199 199Zm-84-28 216 216-229 229q-24 24-56 24t-56-24l-2-2-26 26H60l126-126-2-2q-24-24-24-56t24-56l229-229Zm0 0 227-227q24-24 56-24t56 24l104 104q24 24 24 56t-24 56L629-373 413-589Z" />
    </SvgIcon>
  );
}

export function IconColorReset(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M800-436q0 36-8 69t-22 63l-62-60q6-17 9-34.5t3-37.5q0-47-17.5-89T650-600L480-768l-88 86-56-56 144-142 226 222q44 42 69 99.5T800-436Zm-8 380L668-180q-41 29-88 44.5T480-120q-133 0-226.5-92.5T160-436q0-51 16-98t48-90L56-792l56-56 736 736-56 56ZM480-200q36 0 68.5-10t61.5-28L280-566q-21 32-30.5 64t-9.5 66q0 98 70 167t170 69Zm-37-204Zm110-116Z" />
    </SvgIcon>
  );
}

export function IconDropdown(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M480-360 280-560h400L480-360Z" />
    </SvgIcon>
  );
}

// ============================================================================
// TABLE ICONS
// ============================================================================

export function IconTable(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm240-240H200v160h240v-160Zm80 0v160h240v-160H520Zm-80-80v-160H200v160h240Zm80 0h240v-160H520v160ZM200-680h560v-80H200v80Z" />
    </SvgIcon>
  );
}

export function IconTableChart(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120ZM200-640h560v-120H200v120Zm100 80H200v360h100v-360Zm360 0v360h100v-360H660Zm-80 0H380v360h200v-360Z" />
    </SvgIcon>
  );
}

export function IconGridOn(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133ZM200-413h133v-134H200v134Zm213 0h134v-134H413v134Zm214 0h133v-134H627v134ZM200-627h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133Z" />
    </SvgIcon>
  );
}

export function IconTableRows(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M760-200v-120H200v120h560Zm0-200v-160H200v160h560Zm0-240v-120H200v120h560ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
    </SvgIcon>
  );
}

export function IconViewColumn(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M121-280v-400q0-33 23.5-56.5T201-760h559q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H201q-33 0-56.5-23.5T121-280Zm79 0h133v-400H200v400Zm213 0h133v-400H413v400Zm213 0h133v-400H626v400Z" />
    </SvgIcon>
  );
}

export function IconBorderAll(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-720h720v720H120Zm640-80v-240H520v240h240Zm0-560H520v240h240v-240Zm-560 0v240h240v-240H200Zm0 560h240v-240H200v240Z" />
    </SvgIcon>
  );
}

export function IconBorderOuter(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M200-200h560v-560H200v560Zm-80 80v-720h720v720H120Zm160-320v-80h80v80h-80Zm160 160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 160v-80h80v80h-80Z" />
    </SvgIcon>
  );
}

export function IconBorderInner(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-320v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-640v-80h80v80h-80Zm320 640v-80h80v80h-80Zm160 0v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-320v-80h80v80h-80Zm0-160v-80h80v80h-80Zm-160 0v-80h80v80h-80ZM440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
    </SvgIcon>
  );
}

export function IconBorderClear(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M120-120v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-320v-80h80v80h-80Zm0-320v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-320v-80h80v80h-80Zm0-320v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Z" />
    </SvgIcon>
  );
}

export function IconAdd(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </SvgIcon>
  );
}

export function IconRemove(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M200-440v-80h560v80H200Z" />
    </SvgIcon>
  );
}

export function IconDelete(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </SvgIcon>
  );
}

export function IconDeleteSweep(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M600-240v-80h160v80H600Zm0-320v-80h280v80H600Zm0 160v-80h240v80H600ZM120-640H80v-80h160v-60h160v60h160v80h-40v360q0 33-23.5 56.5T440-200H200q-33 0-56.5-23.5T120-280v-360Zm80 0v360h240v-360H200Zm0 0v360-360Z" />
    </SvgIcon>
  );
}

export function IconMerge(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m296-160-56-56 200-200v-269L337-582l-57-57 200-200 201 201-57 57-104-104v301L296-160Zm368 1L536-286l57-57 127 128-56 56Z" />
    </SvgIcon>
  );
}

export function IconSplit(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M440-160v-304L240-664v104h-80v-240h240v80H296l224 224v336h-80Zm154-376-58-58 128-126H560v-80h240v240h-80v-104L594-536Z" />
    </SvgIcon>
  );
}

export function IconDragIndicator(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
    </SvgIcon>
  );
}

// ============================================================================
// ICON MAP - for MaterialSymbol compatibility
// ============================================================================

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  undo: IconUndo,
  redo: IconRedo,
  print: IconPrint,
  format_bold: IconBold,
  format_italic: IconItalic,
  format_underlined: IconUnderline,
  strikethrough_s: IconStrikethrough,
  superscript: IconSuperscript,
  subscript: IconSubscript,
  link: IconLink,
  format_clear: IconFormatClear,
  format_align_left: IconAlignLeft,
  format_align_center: IconAlignCenter,
  format_align_right: IconAlignRight,
  format_align_justify: IconAlignJustify,
  format_line_spacing: IconLineSpacing,
  format_list_bulleted: IconListBulleted,
  format_list_numbered: IconListNumbered,
  format_indent_increase: IconIndentIncrease,
  format_indent_decrease: IconIndentDecrease,
  format_color_text: IconTextColor,
  ink_highlighter: IconHighlight,
  format_color_reset: IconColorReset,
  arrow_drop_down: IconDropdown,
  table: IconTable,
  table_chart: IconTableChart,
  grid_on: IconGridOn,
  table_rows: IconTableRows,
  view_column: IconViewColumn,
  border_all: IconBorderAll,
  border_outer: IconBorderOuter,
  border_inner: IconBorderInner,
  border_clear: IconBorderClear,
  add: IconAdd,
  remove: IconRemove,
  delete: IconDelete,
  delete_sweep: IconDeleteSweep,
  call_merge: IconMerge,
  call_split: IconSplit,
  drag_indicator: IconDragIndicator,
};

/**
 * MaterialSymbol-compatible component using inline SVGs
 */
export function MaterialSymbol({
  name,
  size = 20,
  className = '',
  style,
}: {
  name: string;
  size?: number;
  filled?: boolean;
  weight?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback: render the name as text (for debugging)
    console.warn(`Icon not found: ${name}`);
    return (
      <span className={className} style={{ fontSize: size, width: size, height: size, ...style }}>
        {name}
      </span>
    );
  }

  return <IconComponent size={size} className={className} style={style} />;
}

export default MaterialSymbol;
