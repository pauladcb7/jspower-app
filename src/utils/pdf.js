/* import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs; */

let pdfInstance;
export async function getPDfInstance() {
  let pdfMake = (await import("pdfmake/build/pdfmake")).default
  let pdfFonts = (await import("pdfmake/build/vfs_fonts")).default
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  return pdfMake;
}