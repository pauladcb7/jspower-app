import React, { Component, useEffect, useRef, useState } from 'react';
// import { Editor as ReactEditor } from 'react-draft-wysiwyg';
import htmlToPdfmake from 'html-to-pdfmake';
import { getPDfInstance } from '../utils/pdf';
import { Editor as ReactEditor } from '@tinymce/tinymce-react';
import CRegular from 'src/assets/fonts/Calibri Regular.ttf';
import Book from 'src/assets/fonts/BOOKOS.TTF';
import BookBold from 'src/assets/fonts/BOOKOSB.TTF';
import CBold from 'src/assets/fonts/Calibri Bold.TTF';
import { getBase64ImageFromURL } from 'src/utils';

//const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};


  
export function Editor() {
  const editorRef = useRef(null);
  const [b64, setB64] = useState("")
  const [json, setContentJson] = useState("")
  const log = async () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      var html = editorRef.current.getContent();
      var document2 = htmlToPdfmake(html, {
        imagesByReference: true,
        defaultStyles: {
          'p': {
            marginTop: 0,
            marginBottom: 0,
            margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
          },
        }
      });

      setContentJson(JSON.stringify({...document2,customHtml: html }));
      document2.pageMargins = [15, 22, 15, 5]
      document2.styles = {
        'html-p': {
          marginTop: 0,
          marginBottom: 0,
          margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
        },
        'html-strong': {
          margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
        },
        'html-span': {
          margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
        },
        'html-ul': {
          margin: [0, 0, 0, 0]
        }
      }
      const logo = (await import('../assets/logoBg.png')).default;
      const logo2 = (await import('../assets/logopdf.png')).default;
      document2.images.logo = await getBase64ImageFromURL(logo);
      document2.images.logo2 = await getBase64ImageFromURL(logo2);
      document2.content.unshift(
        {
          image: 'logo',
          fit: [80, 80],
          absolutePosition: { x: 15, y: 65 }
        },
        {
          //layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: ['*'],

            body: [
              [
                {
                  text: 'Company Name:_________________        Job Location: _____________________       Date: ___________',
                  font: "Calibri"
                }
              ],
              [
                {
                  text: 'Time Started: __:__ Time Finished: __:__ Foreman/Supervisor:_______',
                  font: "Calibri"
                }]
            ]
          },

          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 0;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 0;
            },
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            hLineStyle: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return { dash: { length: 10, space: 4 } };
            },
            vLineStyle: function (i, node) {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return { dash: { length: 4 } };
            },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (i, node) { return null; }
          }
        })
      document2.content.push(
        {
          text: 'Work-Site Hazards and Safety Suggestions: ______________________________________________________.',
          font: "Calibri"
        },
        {
          text: 'Personnel Safety Violations: __________________________________________________________________.',
          font: "Calibri"
        },
        {
          text: 'Employee Signatures:                  (My signature attests and verifies my understanding of and agreement to comply with company safety regulations).',
          font: "Calibri"
        },
        {
          columns: [{
            // auto-sized columns have their widths based on their content
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // fixed width
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          ],
          width: '100%'
        },
        {
          columns: [{
            // auto-sized columns have their widths based on their content
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // fixed width
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          ],
          width: '100%'
        },
        {
          columns: [{
            // auto-sized columns have their widths based on their content
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // fixed width
            width: '*',
            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          ],
          width: '100%'
        },
        {
          columns: [{
            // auto-sized columns have their widths based on their content
            width: '*',

            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',

            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          {
            // fixed width
            width: '*',

            columns: [
              {
                width: 12,
                text: '1. ',
                font: "Calibri"
              },
              {

                image: 'logo',
                fit: [150, 40],
              }
            ]
          },
          ],
          width: '100%'
        },
        {
          
          columns: [
            {
              width: '*',
              alignment: 'right',
              text: 'Foreman/Supervisor’s Signature:',
              font: "Calibri"
            },
            {
              width: 150,
              image: 'logo',
              fit: [150, 150],
            }
          ]
        })
      document2.background = [
        {
          image: 'logo2',
          width: 420,
          fit: [420, 420],
          marginTop: 120,
          alignment: 'center',
        }
      ]
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
                var blobCache = editorRef.current.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
          fontsize_formats: "10pt 12pt 16pt 14pt 18pt 24pt 36pt",
          font_formats: "Calibri=Calibri; Book Style=BookOS",
          plugins: [
            'advlist autolink lists  link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help imagetools  wordcount'
          ],
          toolbar: 'undo redo | formatselect | fontsizeselect  | fontselect | ' +
            'bold italic underline backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | image | ' +
            'removeformat | help',
          indent_use_margin: true,
          indentation: '20pt',
          formats: {
            // Changes the default format for h1 to have a class of heading
            h1: {
              block: 'h1', classes: 'heading', styles: {
                fontSize: '16pt',
                fontFamily: 'BookOS'
              }
            },
            h2: {
              block: 'h2', classes: 'heading2', styles: {
                fontSize: '10pt',
                fontFamily: 'Calibri',
                textDecoration: 'underline'
              }
            },
            p: {
              block: 'p',
              styles: {
                fontSize: '10pt',
                fontFamily: 'Calibri',
              }
            },
          },
          /*
          style_formats: [
            // Adds the h1 format defined above to style_formats
            { title: 'My heading', format: 'h1' }
          ], */
          //CBold
          content_style: `body { font-family:Calibri; font-size:10px } p {
            margin: 0;
          } ul {
            margin: 0;
          }
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
      <button onClick={log}>Test</button>
      <object className="pdf-viewer" data={"data:application/pdf;base64," + b64} type="application/pdf">
        <embed src={"data:image/png;base64," + b64} type="application/pdf" />
      </object>
      <textarea  style={{
        width: '100%',
        minHeight: '520px'
       }}
      value={json}></textarea>

    </>
  );
}