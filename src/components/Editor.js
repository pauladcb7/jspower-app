import React, { Component, useEffect, useRef, useState } from 'react';
// import { Editor as ReactEditor } from 'react-draft-wysiwyg';
import htmlToPdfmake from 'html-to-pdfmake';
import {getPDfInstance} from '../utils/pdf';
import { Editor as ReactEditor } from '@tinymce/tinymce-react';
import CRegular from 'src/assets/fonts/Calibri Regular.ttf';
import Book from 'src/assets/fonts/BOOKOS.TTF';
import BookBold from 'src/assets/fonts/BOOKOSB.TTF';
import CBold from 'src/assets/fonts/Calibri Bold.TTF';

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
      document2.pageMargins = [15,22,15,5]

      console.log(document2)
      
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
          fontsize_formats: "8pt 10pt 12pt 16pt 14pt 18pt 24pt 36pt",
          font_formats:"Calibri=Calibri; Book Style=BookOS",
          plugins: [
            'advlist autolink lists  link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help imagetools  wordcount'
          ],
          toolbar: 'undo redo | formatselect | fontsizeselect  | fontselect | ' +
          'bold italic underline backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | image | ' +
          'removeformat | help',
          
          //CBold
          content_style: `body { font-family:Calibri; font-size:14px } 
            @font-face {
              font-family: 'Calibri';
              src: url(${CRegular}) format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
            }
            @font-face {
              font-family: 'BookOS';
              src: url(${Book}) format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
            }
            @font-face {
              font-family: 'BookOS';
              src: url(${BookBold}) format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
              font-weight: bold;
            }
            

          `
        }}
      />
      <button onClick={log}>Log editor content</button>
    <object className="pdf-viewer" data={"data:application/pdf;base64,"+ b64} type="application/pdf">
        <embed src={"data:image/png;base64,"+ b64} type="application/pdf" />
    </object>
    </>
  );
}