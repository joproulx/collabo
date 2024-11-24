// components/custom-editor.js
'use client' // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autoformat,
	Bold,
	Italic,
	Underline,
	BlockQuote,
	Base64UploadAdapter,
	CloudServices,
	CKBox,
	Essentials,
    FindAndReplace,
	Heading,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
	Indent,
	IndentBlock,
	Link,
	List,
	MediaEmbed,
	Mention,
	Paragraph,
	PasteFromOffice,
	Table,
	TableColumnResize,
	TableToolbar,
	TextTransformation,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { useRef, useEffect } from 'react';

function CustomEditor(props) {


const child1 = useRef(null);
    return (
        <CKEditor
       ref={child1}
       
       onChange={(event, editor) => console.log(event)}
            editor={ ClassicEditor }
            onReady={(editor) => {

                // editor.model.document.on( 'change', () => {
                //     console.log( 'The Document has changed!' );
                // } );

                editor.model.document.selection.on( 'change', ( ...args ) => { 
                    console.log( args[ 0 ].name, Array.from( editor.model.document.selection.getAttributeKeys() ), args )
                    
                   // In start and end elements, you will have an array ex: [1,2] that says line #1, column #2.  
                   // args[0].path[0]._ranges[0].start  ->  args[0].path[0]._ranges[0].end
                } );
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
                editor.editing.view.change((writer) => {
                writer.setStyle(
                    "height",
                    props.height,
                    editor.editing.view.document.getRoot()
                );
                });
            }

            }
            config={ {
                toolbar: {
                    items: [ 'undo',
			'redo',
			'|',
            'findAndReplace',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'link',
			'uploadImage',
			'ckbox',
			'insertTable',
			'blockQuote',
			'mediaEmbed',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent', ],
                },
                plugins: [
                    Autoformat,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    FindAndReplace,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageResize,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    Base64UploadAdapter,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Mention,
                    Paragraph,
                    PasteFromOffice,
                    PictureEditing,
                    Table,
                    TableColumnResize,
                    TableToolbar,
                    TextTransformation,
                    Underline
                ],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph',
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1',
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2',
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3',
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4',
                        },
                    ],
                },
                image: {
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            label: 'Default image width',
                            value: null,
                        },
                        {
                            name: 'resizeImage:50',
                            label: '50% page width',
                            value: '50',
                        },
                        {
                            name: 'resizeImage:75',
                            label: '75% page width',
                            value: '75',
                        },
                    ],
                    toolbar: [
                        'imageTextAlternative',
                        'toggleImageCaption',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage',
                    ],
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                },
                licenseKey: 'FSTEBM522.PDH360XMB415',
                mention: { 
                    // Mention configuration
                },
                initialData: '<p>Hello from CKEditor 5 in React!</p>'
                
            } }
        />
    );
}

export default CustomEditor;
