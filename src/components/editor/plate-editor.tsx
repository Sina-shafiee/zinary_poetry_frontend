import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

function PlateEditor({ value, onChange }: Props) {
  const editor = useCreateEditor({ defaultValue: value });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={({ value }) => {
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type,
          );
          if (!isAstChange) {
            return;
          }
          if (onChange && typeof onChange === 'function') {
            onChange(JSON.stringify(value));
            return;
          }
          const content = JSON.stringify(value);
          localStorage.setItem('editor_content', content);
        }}
      >
        <EditorContainer>
          <Editor variant="fullWidth" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}

export default PlateEditor;
