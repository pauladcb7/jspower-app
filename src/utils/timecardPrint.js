import moment from "moment";
import { logo } from "./logo";
import { blank } from "./blank";
import { getPDfInstance } from "./pdf";
import { getBase64ImageFromURL } from "src/utils";
const nullValue = "";
// const blankImg = (
//   import("../assets/blank.png")
// ).default;

// const blank = getBase64ImageFromURL(
//  blankImg
// );
export function timecardPrint({
  todayDate,
  employeeName,
  jobName,
  jobDescription,
  jobLocations,
  employeeSignature,
  timeEntries,
}) {
  var days = Array.apply(null, Array(7)).map(function (_, i) {
    var day = moment(i, "e")
      .startOf("week")
      .isoWeekday(i + 1);
    return [
      [
        {
          text: day.format("ddd"),
          style: "cell",
        },
        {
          text: "",
          style: "",
        },
      ],
      [
        {
          text: "Date",
          style: "cell",
          bold: true,
        },
        {
          text: day.format("MM-DD-YYYY"),
          style: "",
          bold: true,
        },
      ],
      [
        {
          text: "Clock in/Clock out",
          style: "cell",
        },
        {
          text: "6:00 AM - 2:30 PM",
          style: "cellResponse",
        },
      ],
      [
        {
          text: "Lunch in/Lunch out",
          style: "cell",
        },
        {
          text: "6:00 AM - 2:30 PM",
          style: "cellResponse",
        },
      ],
      [
        {
          text: "Type of work in progress",
          style: "cell",
        },
        {
          text: "shop",
          style: "cellResponse",
        },
      ],
    ];
  });
  const mergedTimeEntries = timeEntries.map((timeEntry) => {
    timeEntry.lunchIn = moment(timeEntry.lunchIn, "hh:mm").isValid()
      ? moment(timeEntry.lunchIn, "HH:mm").format("hh:mm A")
      : nullValue;
    timeEntry.lunchOut = moment(timeEntry.lunchOut, "hh:mm").isValid()
      ? moment(timeEntry.lunchOut, "HH:mm").format("hh:mm A")
      : nullValue;
      
      employeeSignature = employeeSignature || null;
    return [
      [
        {
          text: moment(timeEntry.entryDate).format("ddd"),
          style: "cell",
          bold: true,
        },
        {
          text: "",
          style: "",
        },
      ],
      [
        {
          text: "Date",
          style: "cell",
        },
        {
          text: moment(timeEntry.entryDate).format("MM-DD-YYYY"),
          style: "",
          bold: true,
        },
      ],
      [
        {
          text: "Lunch in/Lunch out",
          style: "cell",
        },
        {
          text: `${timeEntry.lunchIn || nullValue}   - ${
            timeEntry.lunchOut || nullValue
          }`,
          style: "cellResponse",
        },
      ],
      ...[].concat.apply(
        [],
        timeEntry.timecard.map((timeCard) => {
          let locations = "";
          timeCard.location.forEach((loc) => {
            locations += loc.location;
          });
          timeCard.clockIn = moment(timeCard.clockIn, "hh:mm").isValid()
            ? moment(timeCard.clockIn, "HH:mm").format("hh:mm A")
            : nullValue;
          timeCard.clockOut = moment(timeCard.clockOut, "hh:mm").isValid()
            ? moment(timeCard.clockOut, "HH:mm").format("hh:mm A")
            : nullValue;
          return [
            [
              {
                text: "Job Name",
                style: "cell",
                decoration: "underline",
              },

              {
                text: timeCard.jobName || nullValue,
                style: "cellResponse",
                italics: true,
              },
            ],
            [
              {
                text: "Job Description",
                style: "cell",
                
              },

              {
                text: timeCard.jobDescription || nullValue,
                style: "cellResponse",
               
              },
            ],
            [
              {
                text: "Job Location",
                style: "cell",
              },
              {
                text: timeCard.otherLocation
                  ? timeCard.otherLocation
                  : locations,
                style: "cellResponse",
              },
            ],
            [
              {
                text: "Clock in/Clock out",
                style: "cell",
              },
              {
                text: `${timeCard.clockIn || nullValue} - ${
                  timeCard.clockOut || nullValue
                }`,
                style: "cellResponse",
              },
            ],
          ];
        })
      ),
    ];
  });
  var merged = [].concat.apply([], mergedTimeEntries);
  var dd = {
    content: [
      {
        layout: "noBorders",

        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          //headerRows: 1,
          widths: ["auto", "*"],

          body: [
            [
              {
                stack: [
                  {
                    text: moment(todayDate).format("dddd, MMMM DD, YYYY"),
                    fontSize: 11,
                    bold: true,
                    alignment: "right",
                    color: "#060B33",
                  },
                  {
                    columns: [
                      {
                        image: "logo",
                        fit: [200, 100],
                        alignment: "center",
                        marginBottom: 16,
                      },
                      {
                        text: "Weekly Time Card",
                        fontSize: 18,
                        marginTop: 25,
                        marginLeft: 15,
                        color: "#060B33",
                      },
                    ],
                  },
                ],
                colSpan: 2,
                fillColor: "#eaecf9",
              },
              "",
            ],
            [
              {
                text: "Employee Name",
                style: "cell",
              },
              {
                text: employeeName,
                style: "cellResponse",
              },
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
          ],
        },
      },
    ],
    pageMargins: [0, 0, 0, 0],
    images: {
      logo: logo,
      //customerSignature:customerSignature,
      employeeSignature: employeeSignature || blank
    },
    styles: {
      cell: {
        color: "#060B33",
        margin: [15, 5, 15, 5],
      },
      cellResponse: {
        color: "#606575",
        margin: [15, 5, 15, 5],
      },
    },
  };
  getPDfInstance().then((pdfMake) => {
    pdfMake.createPdf(dd).download();
  });
}
