import React from 'react';

import { withRef } from '@udecode/cn';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { type PlateEditor, ParagraphPlugin } from '@udecode/plate-common/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';
import { PlateElement } from './plate-element';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;

  onSelect: (editor: PlateEditor, value: string) => void;

  value: string;
  className?: string;
  focusEditor?: boolean;
  keywords?: string[];
  label?: string;
}

const groups: Group[] = [
  {
    group: 'بلاک های ساده',
    items: [
      {
        icon: <PilcrowIcon />,
        keywords: ['paragraph'],
        label: 'پاراگراف',
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        keywords: ['title', 'h1'],
        label: 'تیتر سطح 1',
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        keywords: ['subtitle', 'h2'],
        label: 'تیتر سطح 2',
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        keywords: ['subtitle', 'h3'],
        label: 'تیتر سطح 3',
        value: HEADING_KEYS.h3,
      },
      {
        icon: <ListIcon />,
        keywords: ['unordered', 'ul', '-'],
        label: 'لیست نامرتب',
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrdered />,
        keywords: ['ordered', 'ol', '1'],
        label: 'لیست مرتب',
        value: ListStyleType.Decimal,
      },
      {
        icon: <Square />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
        label: 'فهرست وظایف',
        value: INDENT_LIST_KEYS.todo,
      },
      {
        icon: <ChevronLeftIcon />,
        keywords: ['collapsible', 'expandable'],
        label: 'لیست تاشو',
        value: TogglePlugin.key,
      },
      {
        icon: <Code2 />,
        keywords: ['```'],
        label: 'بلاک کد',
        value: CodeBlockPlugin.key,
      },
      {
        icon: <Table />,
        label: 'جدول]',
        value: TablePlugin.key,
      },
      {
        icon: <Quote />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
        label: 'نقل قول',
        value: BlockquotePlugin.key,
      },
    ].map(item => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'بلاک های پیشرفته',
    items: [
      {
        icon: <TableOfContentsIcon />,
        keywords: ['toc'],
        label: 'فهرست محتوا',
        value: TocPlugin.key,
      },
      {
        icon: <Columns3Icon />,
        label: '3 ستون',
        value: 'action_three_columns',
      },
    ].map(item => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'درون خطی',
    items: [
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ['time'],
        label: 'تاریخ',
        value: DatePlugin.key,
      },
    ].map(item => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export const SlashInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        as="span"
        data-slate-value={element.value}
        {...props}
        className={className}
      >
        <InlineCombobox element={element} trigger="/">
          <InlineComboboxInput />

          <InlineComboboxContent>
            <InlineComboboxEmpty>نتیجه ای پیدا نشد.</InlineComboboxEmpty>

            {groups.map(({ group, items }) => (
              <InlineComboboxGroup key={group}>
                <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

                {items.map(
                  ({ focusEditor, icon, keywords, label, value, onSelect }) => (
                    <InlineComboboxItem
                      key={value}
                      value={value}
                      onClick={() => onSelect(editor, value)}
                      label={label}
                      focusEditor={focusEditor}
                      group={group}
                      keywords={keywords}
                    >
                      <div className="me-2 text-muted-foreground">{icon}</div>
                      {label ?? value}
                    </InlineComboboxItem>
                  ),
                )}
              </InlineComboboxGroup>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    );
  },
);
