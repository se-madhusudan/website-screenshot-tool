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
    let imgSize = [sizeOf(item).width * 0.654, sizeOf(item).height * 0.654];

    let imgObj = {
      pdfConfig: {
        size: imgSize,
        margin: 0
      },
      imgConfig: {
        fit: imgSize
      }
    };

    if (!createdPdf) {
      doc = new PDFDocument(imgObj.pdfConfig).image(item, imgObj.imgConfig);
      createdPdf = true;
    } else {
      doc.addPage(imgObj.pdfConfig).image(item, imgObj.imgConfig);
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
