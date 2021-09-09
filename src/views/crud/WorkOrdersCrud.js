import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CLink,
  CWidgetIcon,
  CDataTable,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const WorkOrdersCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  useEffect(() => {
    console.log("checked items: ", checkedJobLocations);
  }, [checkedJobLocations]);

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedJobLocations({
      ...checkedJobLocations,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };
  const onSubmit = function (e) {
    circuitPrint({
      date: e.date,
      voltage: e.voltage,
      rows,
    });
  };
  const validate = function () {};


  const rows = [
    {
      id: 1,
      date: '12-12-2002',
      workType: 'SERVICECALL',
      employeeName: 'Eric Vargas',
      startTime: '12:00',
      endTime: '13:33',
      jobLocation: 'Anywhere',
      jobDetails: 'All the job details',
      totalCost: '12',
      fullName: 'Paula',
      phoneNumber: '+51951101101',
      customerSignature: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 664 373" width="664" height="373"><path d="M 149.000,241.000 C 146.180,236.193 147.000,236.000 145.000,231.000" stroke-width="5.167" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 145.000,231.000 C 144.207,225.012 143.680,225.193 144.000,219.000" stroke-width="3.695" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 144.000,219.000 C 143.323,210.459 143.707,210.512 144.000,202.000" stroke-width="2.960" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 144.000,202.000 C 143.098,184.524 145.323,185.459 148.000,169.000" stroke-width="2.132" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 148.000,169.000 C 153.610,155.953 152.098,156.024 162.000,145.000" stroke-width="2.134" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 162.000,145.000 C 171.614,131.766 171.610,132.453 184.000,122.000" stroke-width="1.951" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 184.000,122.000 C 198.630,112.315 197.614,111.266 214.000,104.000" stroke-width="1.872" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 214.000,104.000 C 228.933,94.760 229.130,95.815 245.000,89.000" stroke-width="1.863" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 245.000,89.000 C 255.987,86.927 255.433,85.260 267.000,85.000" stroke-width="2.226" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 267.000,85.000 C 275.966,83.084 275.987,83.427 285.000,82.000" stroke-width="2.493" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 285.000,82.000 C 290.301,79.593 288.466,81.584 292.000,82.000" stroke-width="3.378" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 292.000,82.000 C 295.458,90.362 296.301,88.093 297.000,99.000" stroke-width="3.596" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 297.000,99.000 C 297.137,104.502 297.958,104.362 297.000,110.000" stroke-width="3.408" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 297.000,110.000 C 299.243,125.101 296.637,124.502 296.000,139.000" stroke-width="2.282" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 296.000,139.000 C 290.767,155.152 292.243,155.101 283.000,170.000" stroke-width="1.992" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 283.000,170.000 C 273.863,188.078 273.767,187.652 262.000,204.000" stroke-width="1.762" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 262.000,204.000 C 254.149,213.259 254.863,213.578 245.000,221.000" stroke-width="2.124" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 245.000,221.000 C 234.508,229.808 234.649,229.759 223.000,237.000" stroke-width="2.095" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 223.000,237.000 C 209.962,243.930 210.508,244.808 197.000,251.000" stroke-width="2.067" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 197.000,251.000 C 182.489,258.979 182.462,258.930 168.000,267.000" stroke-width="1.897" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 168.000,267.000 C 154.186,273.985 154.489,274.479 141.000,282.000" stroke-width="1.966" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 141.000,282.000 C 128.690,289.573 128.686,289.485 117.000,298.000" stroke-width="2.048" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 117.000,298.000 C 107.483,305.479 107.190,305.073 98.000,313.000" stroke-width="2.232" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 98.000,313.000 C 92.942,316.930 92.983,316.979 88.000,321.000" stroke-width="2.790" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 91.000,260.000 C 102.500,260.000 102.500,260.000 114.000,260.000" stroke-width="4.403" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 114.000,260.000 C 133.000,260.000 133.000,260.000 152.000,260.000" stroke-width="2.124" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 152.000,260.000 C 183.000,260.000 183.000,260.000 214.000,260.000" stroke-width="1.337" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 214.000,260.000 C 247.000,260.000 247.000,260.000 280.000,260.000" stroke-width="1.202" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 280.000,260.000 C 313.057,261.328 313.000,260.000 346.000,260.000" stroke-width="1.167" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 346.000,260.000 C 375.244,259.208 375.057,258.828 404.000,255.000" stroke-width="1.198" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 404.000,255.000 C 437.113,250.351 436.744,250.208 469.000,242.000" stroke-width="1.163" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 469.000,242.000 C 479.098,238.405 479.113,239.351 488.000,233.000" stroke-width="1.864" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 488.000,233.000 C 492.430,228.917 493.098,229.905 497.000,225.000" stroke-width="2.638" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 213.000,261.000 C 215.342,258.326 215.500,258.500 218.000,256.000" stroke-width="4.961" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 218.000,256.000 C 223.345,251.298 223.342,251.326 229.000,247.000" stroke-width="3.385" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 229.000,247.000 C 236.075,242.103 235.845,241.798 243.000,237.000" stroke-width="2.950" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 243.000,237.000 C 255.144,228.179 255.075,228.103 267.000,219.000" stroke-width="2.176" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 267.000,219.000 C 270.749,216.251 270.644,216.179 274.000,213.000" stroke-width="3.032" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 274.000,213.000 C 280.185,205.000 277.749,209.251 281.000,205.000" stroke-width="3.320" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 281.000,205.000 C 279.160,209.085 281.685,205.000 277.000,213.000" stroke-width="4.432" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 277.000,213.000 C 270.517,223.257 271.160,223.585 265.000,234.000" stroke-width="2.709" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 265.000,234.000 C 260.967,241.842 261.017,241.757 258.000,250.000" stroke-width="2.809" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 258.000,250.000 C 254.918,256.496 256.967,252.842 257.000,256.000" stroke-width="3.659" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 257.000,256.000 C 268.335,251.094 265.418,253.996 279.000,245.000" stroke-width="3.623" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 279.000,245.000 C 292.237,236.050 292.835,237.094 306.000,228.000" stroke-width="2.196" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 306.000,228.000 C 319.573,221.848 318.737,220.550 332.000,214.000" stroke-width="2.095" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 332.000,214.000 C 340.032,204.661 338.573,209.848 344.000,204.000" stroke-width="2.618" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 344.000,204.000 C 344.816,208.193 346.032,203.661 344.000,212.000" stroke-width="4.031" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 344.000,212.000 C 339.485,216.864 343.316,215.193 341.000,218.000" stroke-width="3.983" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 341.000,218.000 C 346.806,219.154 343.485,219.864 352.000,218.000" stroke-width="4.582" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 352.000,218.000 C 355.652,216.232 355.806,217.154 359.000,214.000" stroke-width="4.017" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 385.000,261.000 C 384.103,257.468 384.000,257.500 383.000,254.000" stroke-width="5.344" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 383.000,254.000 C 379.965,246.642 380.603,246.468 378.000,239.000" stroke-width="3.450" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 378.000,239.000 C 375.610,229.065 375.465,229.142 374.000,219.000" stroke-width="2.772" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 374.000,219.000 C 371.310,204.064 371.610,204.065 370.000,189.000" stroke-width="2.202" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 370.000,189.000 C 368.650,169.509 368.310,169.564 368.000,150.000" stroke-width="1.830" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 368.000,150.000 C 365.840,138.990 367.650,139.509 368.000,129.000" stroke-width="2.262" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 368.000,129.000 C 370.710,120.114 369.840,120.490 376.000,113.000" stroke-width="2.577" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 376.000,113.000 C 385.829,100.312 385.210,100.614 397.000,90.000" stroke-width="2.133" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 397.000,90.000 C 400.302,87.563 398.829,88.312 402.000,89.000" stroke-width="3.307" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 402.000,89.000 C 407.655,94.301 406.802,93.063 410.000,101.000" stroke-width="3.983" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 410.000,101.000 C 413.440,114.920 414.655,114.301 416.000,129.000" stroke-width="2.367" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 416.000,129.000 C 419.164,142.414 418.440,142.420 420.000,156.000" stroke-width="2.217" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 420.000,156.000 C 423.156,175.640 421.164,174.914 420.000,194.000" stroke-width="1.859" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 420.000,194.000 C 416.054,207.876 417.656,207.640 409.000,220.000" stroke-width="1.979" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 409.000,220.000 C 398.870,234.785 400.054,235.376 388.000,249.000" stroke-width="1.858" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 388.000,249.000 C 379.287,260.247 379.370,260.285 370.000,271.000" stroke-width="2.024" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 370.000,271.000 C 360.757,282.824 360.287,282.247 350.000,293.000" stroke-width="2.040" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 350.000,293.000 C 341.331,299.289 342.257,300.324 333.000,306.000" stroke-width="2.283" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 333.000,306.000 C 323.622,314.150 323.331,313.789 314.000,322.000" stroke-width="2.285" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 314.000,322.000 C 304.479,329.473 304.622,329.650 295.000,337.000" stroke-width="2.310" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 295.000,337.000 C 287.339,342.820 287.479,342.973 280.000,349.000" stroke-width="2.477" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path></svg>',
      employeeSignature: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 664 373" width="664" height="373"><path d="M 149.000,241.000 C 146.180,236.193 147.000,236.000 145.000,231.000" stroke-width="5.167" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 145.000,231.000 C 144.207,225.012 143.680,225.193 144.000,219.000" stroke-width="3.695" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 144.000,219.000 C 143.323,210.459 143.707,210.512 144.000,202.000" stroke-width="2.960" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 144.000,202.000 C 143.098,184.524 145.323,185.459 148.000,169.000" stroke-width="2.132" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 148.000,169.000 C 153.610,155.953 152.098,156.024 162.000,145.000" stroke-width="2.134" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 162.000,145.000 C 171.614,131.766 171.610,132.453 184.000,122.000" stroke-width="1.951" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 184.000,122.000 C 198.630,112.315 197.614,111.266 214.000,104.000" stroke-width="1.872" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 214.000,104.000 C 228.933,94.760 229.130,95.815 245.000,89.000" stroke-width="1.863" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 245.000,89.000 C 255.987,86.927 255.433,85.260 267.000,85.000" stroke-width="2.226" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 267.000,85.000 C 275.966,83.084 275.987,83.427 285.000,82.000" stroke-width="2.493" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 285.000,82.000 C 290.301,79.593 288.466,81.584 292.000,82.000" stroke-width="3.378" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 292.000,82.000 C 295.458,90.362 296.301,88.093 297.000,99.000" stroke-width="3.596" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 297.000,99.000 C 297.137,104.502 297.958,104.362 297.000,110.000" stroke-width="3.408" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 297.000,110.000 C 299.243,125.101 296.637,124.502 296.000,139.000" stroke-width="2.282" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 296.000,139.000 C 290.767,155.152 292.243,155.101 283.000,170.000" stroke-width="1.992" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 283.000,170.000 C 273.863,188.078 273.767,187.652 262.000,204.000" stroke-width="1.762" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 262.000,204.000 C 254.149,213.259 254.863,213.578 245.000,221.000" stroke-width="2.124" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 245.000,221.000 C 234.508,229.808 234.649,229.759 223.000,237.000" stroke-width="2.095" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 223.000,237.000 C 209.962,243.930 210.508,244.808 197.000,251.000" stroke-width="2.067" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 197.000,251.000 C 182.489,258.979 182.462,258.930 168.000,267.000" stroke-width="1.897" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 168.000,267.000 C 154.186,273.985 154.489,274.479 141.000,282.000" stroke-width="1.966" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 141.000,282.000 C 128.690,289.573 128.686,289.485 117.000,298.000" stroke-width="2.048" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 117.000,298.000 C 107.483,305.479 107.190,305.073 98.000,313.000" stroke-width="2.232" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 98.000,313.000 C 92.942,316.930 92.983,316.979 88.000,321.000" stroke-width="2.790" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 91.000,260.000 C 102.500,260.000 102.500,260.000 114.000,260.000" stroke-width="4.403" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 114.000,260.000 C 133.000,260.000 133.000,260.000 152.000,260.000" stroke-width="2.124" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 152.000,260.000 C 183.000,260.000 183.000,260.000 214.000,260.000" stroke-width="1.337" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 214.000,260.000 C 247.000,260.000 247.000,260.000 280.000,260.000" stroke-width="1.202" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 280.000,260.000 C 313.057,261.328 313.000,260.000 346.000,260.000" stroke-width="1.167" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 346.000,260.000 C 375.244,259.208 375.057,258.828 404.000,255.000" stroke-width="1.198" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 404.000,255.000 C 437.113,250.351 436.744,250.208 469.000,242.000" stroke-width="1.163" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 469.000,242.000 C 479.098,238.405 479.113,239.351 488.000,233.000" stroke-width="1.864" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 488.000,233.000 C 492.430,228.917 493.098,229.905 497.000,225.000" stroke-width="2.638" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 213.000,261.000 C 215.342,258.326 215.500,258.500 218.000,256.000" stroke-width="4.961" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 218.000,256.000 C 223.345,251.298 223.342,251.326 229.000,247.000" stroke-width="3.385" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 229.000,247.000 C 236.075,242.103 235.845,241.798 243.000,237.000" stroke-width="2.950" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 243.000,237.000 C 255.144,228.179 255.075,228.103 267.000,219.000" stroke-width="2.176" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 267.000,219.000 C 270.749,216.251 270.644,216.179 274.000,213.000" stroke-width="3.032" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 274.000,213.000 C 280.185,205.000 277.749,209.251 281.000,205.000" stroke-width="3.320" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 281.000,205.000 C 279.160,209.085 281.685,205.000 277.000,213.000" stroke-width="4.432" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 277.000,213.000 C 270.517,223.257 271.160,223.585 265.000,234.000" stroke-width="2.709" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 265.000,234.000 C 260.967,241.842 261.017,241.757 258.000,250.000" stroke-width="2.809" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 258.000,250.000 C 254.918,256.496 256.967,252.842 257.000,256.000" stroke-width="3.659" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 257.000,256.000 C 268.335,251.094 265.418,253.996 279.000,245.000" stroke-width="3.623" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 279.000,245.000 C 292.237,236.050 292.835,237.094 306.000,228.000" stroke-width="2.196" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 306.000,228.000 C 319.573,221.848 318.737,220.550 332.000,214.000" stroke-width="2.095" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 332.000,214.000 C 340.032,204.661 338.573,209.848 344.000,204.000" stroke-width="2.618" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 344.000,204.000 C 344.816,208.193 346.032,203.661 344.000,212.000" stroke-width="4.031" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 344.000,212.000 C 339.485,216.864 343.316,215.193 341.000,218.000" stroke-width="3.983" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 341.000,218.000 C 346.806,219.154 343.485,219.864 352.000,218.000" stroke-width="4.582" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 352.000,218.000 C 355.652,216.232 355.806,217.154 359.000,214.000" stroke-width="4.017" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 385.000,261.000 C 384.103,257.468 384.000,257.500 383.000,254.000" stroke-width="5.344" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 383.000,254.000 C 379.965,246.642 380.603,246.468 378.000,239.000" stroke-width="3.450" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 378.000,239.000 C 375.610,229.065 375.465,229.142 374.000,219.000" stroke-width="2.772" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 374.000,219.000 C 371.310,204.064 371.610,204.065 370.000,189.000" stroke-width="2.202" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 370.000,189.000 C 368.650,169.509 368.310,169.564 368.000,150.000" stroke-width="1.830" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 368.000,150.000 C 365.840,138.990 367.650,139.509 368.000,129.000" stroke-width="2.262" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 368.000,129.000 C 370.710,120.114 369.840,120.490 376.000,113.000" stroke-width="2.577" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 376.000,113.000 C 385.829,100.312 385.210,100.614 397.000,90.000" stroke-width="2.133" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 397.000,90.000 C 400.302,87.563 398.829,88.312 402.000,89.000" stroke-width="3.307" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 402.000,89.000 C 407.655,94.301 406.802,93.063 410.000,101.000" stroke-width="3.983" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 410.000,101.000 C 413.440,114.920 414.655,114.301 416.000,129.000" stroke-width="2.367" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 416.000,129.000 C 419.164,142.414 418.440,142.420 420.000,156.000" stroke-width="2.217" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 420.000,156.000 C 423.156,175.640 421.164,174.914 420.000,194.000" stroke-width="1.859" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 420.000,194.000 C 416.054,207.876 417.656,207.640 409.000,220.000" stroke-width="1.979" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 409.000,220.000 C 398.870,234.785 400.054,235.376 388.000,249.000" stroke-width="1.858" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 388.000,249.000 C 379.287,260.247 379.370,260.285 370.000,271.000" stroke-width="2.024" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 370.000,271.000 C 360.757,282.824 360.287,282.247 350.000,293.000" stroke-width="2.040" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 350.000,293.000 C 341.331,299.289 342.257,300.324 333.000,306.000" stroke-width="2.283" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 333.000,306.000 C 323.622,314.150 323.331,313.789 314.000,322.000" stroke-width="2.285" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 314.000,322.000 C 304.479,329.473 304.622,329.650 295.000,337.000" stroke-width="2.310" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path><path d="M 295.000,337.000 C 287.339,342.820 287.479,342.973 280.000,349.000" stroke-width="2.477" stroke="rgb(122,143,23)" fill="none" stroke-linecap="round"></path></svg>',
    },
  ];
  //const [rows, setRow] = useState(rowsInitial);

  const metadata = [
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      sorter: false,
      filter: false,
      _style: { minWidth: '120px'},
      
    },
    {
      key: 'workType',
      label: 'Type of work',
      type: 'radius',
      sorter: false,
      filter: false,
      _style: { minWidth: '120px'},
      
    },
    {
      key: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '190px'},
      
    },
    {
      key: 'startTime',
      label: 'Start Time',
      type: 'time',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
      
    },
    {
      key: 'endTime',
      label: 'End Time',
      type: 'time',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
      
    },
    {
      key: 'jobLocation',
      label: 'Job Location',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '160px'},
      
    },
    {
      key: 'jobDetails',
      label: 'Job Details',
      type: 'textarea',
      sorter: false,
      filter: false,
      _style: { minWidth: '160px'},
      
    },
    {
      key: 'totalCost',
      label: 'Total Cost',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
      
    },
    {
      key: 'fullName',
      label: 'Full Name',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '150px'},
      
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '150px'},
      
    },
    {
      key: 'customerSignature',
      label: 'Customer Signature',
      type: 'signature',
      sorter: false,
      filter: false,
      _style: { minWidth: '150px'},
      hide:true
    },
    {
      key: 'employeeSignature',
      label: 'Employee Signature',
      type: 'signature',
      sorter: false,
      filter: false,
      _style: { minWidth: '150px'},
      hide:true
    },
  ]
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CrudTable
              rows={rows}
              metadata={metadata}
            ></CrudTable>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default WorkOrdersCrud;
