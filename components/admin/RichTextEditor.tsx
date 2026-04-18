'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaLink,
  FaImage,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ToolbarButton = ({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type='button'
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg text-sm transition-all ${
      active
        ? 'bg-accent-violet text-white'
        : 'text-text-muted hover:text-text-primary hover:bg-white/10'
    }`}
  >
    {children}
  </button>
);

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-accent-cyan underline' },
      }),
      Placeholder.configure({ placeholder: 'Write your blog post here...' }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl max-w-full' } }),
    ],
    content,
    editorProps: {
      attributes: { class: 'tiptap-content focus:outline-none min-h-[400px]' },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className='border border-border-glass rounded-2xl overflow-hidden'>
      {/* Toolbar */}
      <div className='flex flex-wrap gap-1 p-3 border-b border-border-glass bg-white/[0.02]'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title='Bold'
        >
          <FaBold />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title='Italic'
        >
          <FaItalic />
        </ToolbarButton>

        <div className='w-px h-7 bg-border-glass mx-1 self-center' />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive('heading', { level: 1 })}
          title='Heading 1'
        >
          <span className='text-xs font-black'>H1</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive('heading', { level: 2 })}
          title='Heading 2'
        >
          <span className='text-xs font-black'>H2</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive('heading', { level: 3 })}
          title='Heading 3'
        >
          <span className='text-xs font-black'>H3</span>
        </ToolbarButton>

        <div className='w-px h-7 bg-border-glass mx-1 self-center' />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title='Bullet List'
        >
          <FaListUl />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title='Ordered List'
        >
          <FaListOl />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title='Blockquote'
        >
          <FaQuoteLeft />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title='Code Block'
        >
          <FaCode />
        </ToolbarButton>

        <div className='w-px h-7 bg-border-glass mx-1 self-center' />

        <ToolbarButton
          onClick={addLink}
          active={editor.isActive('link')}
          title='Insert Link'
        >
          <FaLink />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title='Insert Image'>
          <FaImage />
        </ToolbarButton>

        <div className='w-px h-7 bg-border-glass mx-1 self-center' />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title='Undo'
        >
          <FaUndo />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title='Redo'
        >
          <FaRedo />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className='min-h-[400px]' />
    </div>
  );
}
