import MonacoEditor, { loader } from '@monaco-editor/react'
import { forwardRef, useImperativeHandle, useState } from 'react'
import EditorTheme from './editor-theme'

loader.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs',
  },
})

interface EditorProps {
  initialValue?: string
}

export interface EditorRef {
  getValue: () => string
}

const Editor = forwardRef<EditorRef, EditorProps>(({ initialValue }, ref) => {
  const [value, setValue] = useState(initialValue || '')

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('builder-theme', EditorTheme)
  }

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }))

  return (
    <MonacoEditor
      beforeMount={handleEditorWillMount}
      className="editor"
      language="javascript"
      options={{
        tabSize: 2,
        minimap: {
          enabled: false,
        },
        fontFamily: 'JetBrains Mono',
        fontSize: 14,
        lineHeight: 24,
        scrollBeyondLastLine: false,
        overviewRulerBorder: false,
        padding: { top: 8, bottom: 8 },
        lineDecorationsWidth: 0,
        wordWrap: 'off',
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
      }}
      theme="builder-theme"
      value={value}
      onChange={(v) => {
        if (!v) return
        setValue(v)
      }}
    />
  )
})

Editor.displayName = 'Editor'

export default Editor
