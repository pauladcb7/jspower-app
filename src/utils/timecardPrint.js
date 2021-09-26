import moment from 'moment';
import { logo } from './logo'
import {getPDfInstance} from './pdf'

export function timecardPrint ({
  todayDate,
  employeeName,
  jobName,
  jobLocations,
  employeeSignature
}) {
  var days = Array.apply(null, Array(7)).map(function (_, i) {
              
    var day = moment(i, 'e').startOf('week').isoWeekday(i + 1)
    //.format('ddd');
    return [
      [
        {
          text: day.format('ddd'),
          style:'cell'
        }, {
          text: '',
          style: ''
        }
      ],
      [
          {
            text: 'Date',
            style:'cell'
          }, {
            text: day.format("MM-DD-YYYY"),
            style: ''
          }
      ],
      [
          {
            text: 'Clock in/Clock out',
            style:'cell'
          }, {
            text: '6:00 AM - 2:30 PM',
            style: 'cellResponse'
          }
      ],
      [
          {
            text: 'Lunch in/Lunch out',
            style:'cell'
          }, {
            text: '6:00 AM - 2:30 PM',
            style: 'cellResponse'
          }
      ],
      [
          {
            text: 'Type of work in progress',
            style:'cell'
          }, {
            text: 'shop',
            style: 'cellResponse'
          }
      ],
    ]
  });
  var merged = [].concat.apply([], days);
  var dd =  {
    content: [
      {
        layout: 'noBorders',

        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          //headerRows: 1,
          widths: ['auto', '*'],

          body: [
            [
              {
                stack: [
                  { text: moment(todayDate).format('dddd, MMMM DD, YYYY') , fontSize: 11, bold: true, alignment: 'right' ,color:'#060B33' },
                  {
                    columns: [
                        {
                            image: 'logo',
                            fit: [200, 100],
                            alignment: 'center',
                            marginBottom: 16
                        },
                        {
                            text:'Weekly Time Card',
                            fontSize: 18,
                            marginTop:25,
                            marginLeft: 15,
                            color: '#060B33'
                        }
                    ]
                  },
                ],
                colSpan: 2,
                fillColor:'#eaecf9'
              }, ''
            ],
            [
                {
                  text: 'Employee Name',
                  style:'cell'
                }, {
                  text: employeeName,
                  style: 'cellResponse'
                }
            ],
            [
                {
                  text: 'Job Name',
                  style:'cell'
                }, {
                  text: jobName,
                  style: 'cellResponse'
                }
            ],
            [
                {
                  text: 'Job Location',
                  style:'cell'
                }, {
                  text: jobLocations,
                  style: 'cellResponse'
                }
            ],
            ...merged,
            [
                {
                  text: 'Employee Signature',
                  style:'cell'
                }, {
                  image: 'employeeSignature',
                  fit: [200, 100],
                }
            ],

          ]
        }
      },

    ],
    pageMargins: [ 0, 0, 0, 0 ],
    images: {
      logo: logo,
      //customerSignature:customerSignature,
      employeeSignature: employeeSignature
    },
    styles: {
        cell: {
            color: '#060B33',
            margin: [15, 5, 15, 5]
        },
        cellResponse: {
            color: '#606575',
            margin: [15, 5, 15, 5]
        },
    },
  }
  getPDfInstance().then((pdfMake) => {
    pdfMake.createPdf(dd).download();
  })

}
