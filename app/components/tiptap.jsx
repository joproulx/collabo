'use client'
import Toolbar from './toolbar'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    
  })

 

  return <>
  <Toolbar/>
  <EditorContent className="m-2" editor={editor}/>
  </>
}

export default Tiptap
