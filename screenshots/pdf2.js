let fs = require("fs");
let PDFDocument = require("pdfkit");
let sizeOf = require("image-size");
let ora = require("ora");

let devices = [
  {
    type: "desktop",
    name: "desktop",
    dpi: 1
  },
  {
    type: "mobile",
    name: "mobile",
    dpi: 1
  }
];
let createdPdf = false;
let doc;
const spinner = ora("Desktop: calculating letiables").start();
spinner.color = "red";
spinner.text = "Making PDF...";

devices.forEach(function(device) {
  let images = getFiles("./screenshots/output/" + device.name);
  images.forEach(function(item, i) {
    const imageWidth = sizeOf(item).width * 0.554; // Set the desired width of the image in the PDF
    const imageHeight = sizeOf(item).height * 0.554; // Set the desired height of the image in the PDF
    // Adding a border around the image
    const borderWidth = 5; // Set the border width
    const borderColor = "black"; // Set the border color
    // Calculate the coordinates for the image and border
    const imageX = 322; // Set the X coordinate of the image in the PDF
    const imageY = 322; // Set the Y coordinate of the image in the PDF
    const borderX = imageX - 2.5; // Adjust the X coordinate to include the left border
    const borderY = imageY - 2.5; // Adjust the Y coordinate to include the top border
    const totalImageWidth = imageWidth + borderWidth; // Adjust the width to include both left and right borders
    const totalImageHeight = imageHeight + borderWidth; 
    let imgSize = [imageWidth+650 , imageHeight+650];
    let imgSize1 = [imageWidth - 295 - borderWidth , imageHeight * 0.554 - 295 - borderWidth];
    let imgObj = {
      pdfConfig: {
        size: imgSize,
        margin: [325, 325, 325, 325], // Top, Right, Bottom, Left (all values set to 50)
        layout: "portrait",
        autoFirstPage: true,
        bufferPages: true,
      },
      imgConfig: {
        fit: imgSize1
      }
    };
    if (!createdPdf) {
      doc = new PDFDocument(imgObj.pdfConfig).strokeColor(borderColor).lineWidth(borderWidth).rect(borderX, borderY, totalImageWidth, totalImageHeight).stroke().image(item, imageX, imageY, { width: imageWidth, height: imageHeight });
      createdPdf = true;
    } else {
      doc.addPage(imgObj.pdfConfig).strokeColor(borderColor).lineWidth(borderWidth).rect(borderX, borderY, totalImageWidth, totalImageHeight).stroke().image(item, imageX, imageY, { width: imageWidth, height: imageHeight });
    }
  });
});

doc.pipe(
  fs.createWriteStream(
    "./screenshots/output/haymarket-ss-practice.pdf"
  )
);
doc.end();
spinner.info('See "./screenshots/output" folder for sources');
// Function
function getFiles(dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    if (!files[i].includes(".DS_Store")) {
      let name = dir + "/" + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
  }
  return files_;
}
