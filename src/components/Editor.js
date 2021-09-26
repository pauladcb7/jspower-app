import React, { Component, useEffect, useRef, useState } from 'react';
// import { Editor as ReactEditor } from 'react-draft-wysiwyg';
import htmlToPdfmake from 'html-to-pdfmake';
import {getPDfInstance} from '../utils/pdf';
import { Editor as ReactEditor } from '@tinymce/tinymce-react';

//const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
export function Editor () {
  const editorRef = useRef(null);
  const [b64, setB64] = useState("")
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      var html = editorRef.current.getContent();
      var document2 = htmlToPdfmake(html, {
        imagesByReference:true
      });
      
      getPDfInstance().then((pdfMake) => {
        pdfMake.createPdf(document2).getBase64((res) => {
          setB64(res)
        })
      })
    }
  };
  return (
    <>
      <ReactEditor
        apiKey="04sk0dy11ji2i19mnnw44qiugeik3ozm6c4k763hzuofvfrg"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
        
            input.onchange = function () {
              var file = this.files[0];
        
              var reader = new FileReader();
              reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime();
                debugger
                var blobCache =  editorRef.current.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
        
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
        
            input.click();
          }, 
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help imagetools  wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic underline backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | image | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    <object className="pdf-viewer" data={"data:application/pdf;base64,"+ b64} type="application/pdf">
        <embed src={"data:image/png;base64,"+ b64} type="application/pdf" />
    </object>
    </>
  );
}