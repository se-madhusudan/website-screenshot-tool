const puppeteer = require("puppeteer");
const ora = require("ora");
const mkdirp = require("mkdirp");
const {
  rmDir,
} = require("./helper");
const spinner = new ora();
const FOLDER_OUTPUT = "./screenshots/output/";
const FOLDER_NAME = "desktop";
const SCREEN_PATH = `./screenshots/output/${FOLDER_NAME}/`;
const SERVER_PATH = "https://www.haymarketmedia.com/";
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 768;
const VIEWPORT_OPTS = {
  width: VIEWPORT_WIDTH,
  height: VIEWPORT_HEIGHT,
  deviceScaleFactor: 2,
  hasTouch: true,
};
let viewportOpts = VIEWPORT_OPTS;

rmDir(FOLDER_OUTPUT + FOLDER_NAME); // clean folder with screens

mkdirp(FOLDER_OUTPUT);
mkdirp(FOLDER_OUTPUT + FOLDER_NAME);

(async () => {
  // const browser = await puppeteer.launch({ devtools: false });
  const browser = await puppeteer.launch({
    devtools: false,
    headless: true,
    args: ['--no-sandbox'],
    ignoreHTPPSErrors: true,
  });
  const page = await browser.newPage();

  /** Run spinner and execute recived Function */
  async function makeScreen(msg, func) {
    spinner.start(`Start - ${msg}`);
    await func();
    spinner.succeed(`Finish - ${msg}`);
  }

  async function screenshot(name, clip) {
    let opts = {
      path: SCREEN_PATH + name + ".png"
    };

    if (clip) {
      opts.clip = clip;
    }

    await page.screenshot(opts);
  }

  /**
   * Reset viewport height
   */
  async function resetVH() {
    viewportOpts.height = VIEWPORT_HEIGHT;
    await page.setViewport(viewportOpts);
  }

  /** Set base viewport */
  await page.setViewport(viewportOpts);
  await page.goto(`${SERVER_PATH}?screentest=true`, {
    waitUntil: "networkidle2",
    timeout: 0
  });
  await page.waitFor(3000 * 4);
  await makeScreen("Home Page", screenHome);
  await makeScreen("Home Hero Slider", heroSlider);

  /**
   * Screen Home
   */
  async function screenHome() {
    await page.waitFor(1500);
    const containerHeight_1 = await page.evaluate(() => {
      return 1024;
    });
    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(1500);
    await screenshot("00_00_homePage");
    await resetVH();
  }

  async function heroSlider() {
    await page.waitFor(1500);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelector(".main-slider").style.display = "block";
      document.querySelector("#intro-section").style.display = "none";
      document.querySelector("#section-3").style.display = "none";
      document.querySelectorAll('.horizontal-divider')[0].style.display = 'none';
      document.querySelectorAll('section')[2].style.display = 'none'; //quote class
      document.querySelectorAll('.horizontal-divider')[1].style.display = 'none';
      document.querySelectorAll('.wp-block-heading')[1].style.display = 'none';
      document.querySelector('.slider-wrapper').style.display = 'none';
      document.querySelectorAll('.wp-block-buttons')[0].style.display = 'none';
      document.querySelectorAll('.horizontal-divider')[2].style.display = 'none';
      document.querySelectorAll('.wp-block-heading')[2].style.display = 'none';
      document.querySelectorAll('.wp-block-columns')[0].style.display = 'none';
      document.querySelectorAll('.wp-block-columns')[1].style.display = 'none';
      document.querySelectorAll('.wp-block-heading')[3].style.display = 'none';
      document.querySelectorAll('.wp-block-buttons')[1].style.display = 'none';
      document.querySelectorAll('.horizontal-divider')[3].style.display = 'none';
      document.querySelector('#address').style.display = 'none';
      document.getElementsByTagName("footer")[0].style.display = "none";
      return document.getElementById("page").scrollHeight - 20;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(2500);
    await screenshot("01_00_hero_slider_01");
    for(i = 2;i <= 6; i++){
      const containerHeight_2 = await page.evaluate(() => {
        document.querySelector(".main-slider").getElementsByClassName("slick-next")[0].click();
        return document.getElementById("page").scrollHeight - 20;
      });
      viewportOpts.height = containerHeight_2;
      await page.setViewport(viewportOpts);
      await page.waitFor(3000);
      await screenshot("01_00_hero_slider_0"+i);
    }
  }

  await browser.close();
})();