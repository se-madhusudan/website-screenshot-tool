const puppeteer = require("puppeteer");
const ora = require("ora");
const mkdirp = require("mkdirp");
const {
  rmDir,
} = require("./helper");
const spinner = new ora();
const FOLDER_OUTPUT = "./screenshots/output/";
const FOLDER_NAME = "mobile";
const SCREEN_PATH = `./screenshots/output/${FOLDER_NAME}/`;
const SERVER_PATH = "https://www.haymarketmedia.com/";
const VIEWPORT_WIDTH = 400;
const VIEWPORT_HEIGHT = 720;
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
  await makeScreen("Home Intro Section", introSection);
  await makeScreen("Home What we do for our client section", whatWeDoClient);
  await makeScreen("Home How we engage healthcare professionals", howWeEngage);
  await makeScreen("Home What we're commited to at Haymarket", whatWeCommited);
  await makeScreen("Home What we do for our people section", whatWeDoPeople);
  await makeScreen("Home Location section", location);
  await makeScreen("Home Footer", footer);

  /**
   * Screen Home Page
   */
  async function screenHome() {
    await page.waitFor(1500);
    const containerHeight_1 = await page.evaluate(() => {
      return 768;
    });
    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(1500);
    await screenshot("00_00_homePage");
    const containerHeight_2 = await page.evaluate(() => {
      document.getElementById("menu-toggle").click();
      return 768
    });
    viewportOpts.height = containerHeight_2;
    await page.setViewport(viewportOpts);
    await page.waitFor(1500);
    await screenshot("00_01_homePage");

    await page.evaluate(() => {
      document.getElementById("menu-toggle").click();
    });

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
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(2500);
    await screenshot("01_00_hero_slider_01");
    for(i = 2;i <= 6; i++){
      const containerHeight_2 = await page.evaluate(() => {
        document.querySelector(".main-slider").getElementsByClassName("slick-next")[0].click();
        return document.getElementById("page").scrollHeight;
      });
      viewportOpts.height = containerHeight_2;
      await page.setViewport(viewportOpts);
      await page.waitFor(1000);
      await screenshot("01_00_hero_slider_0"+i);
    }
  }

  async function introSection() {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] }); //page reload
    await page.waitFor(1500);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelector("#intro-section").style.display = "flex";
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
      return document.getElementById("page").scrollHeight - 30;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await screenshot("01_00_intro_section");
  }

  async function whatWeDoClient() {
    await page.waitFor(1500);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelector("#section-3").style.display = "block";
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
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await screenshot("02_00_what_we_do_client");
  }

  async function howWeEngage() {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] }); //page reload
    await page.waitFor(1500);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelectorAll('.horizontal-divider')[0].style.display = 'flex';
      document.querySelectorAll('section')[2].style.display = 'block'; //quote class
      document.querySelectorAll('.horizontal-divider')[1].style.display = 'flex';
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
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(2000);
    await screenshot("03_00_how_we_engage_slider_00");

    for(i = 1;i <= 6; i++){
      const containerHeight_2 = await page.evaluate((i) => {
        document.querySelector(".main-slider").style.display = "none";
        document.querySelector("#intro-section").style.display = "none";
        document.querySelector("#section-3").style.display = "none";
        if(i != 1) document.querySelector(".quote-slider .slick-dots").getElementsByTagName("li")[i-1].click();
        return document.getElementById("page").scrollHeight;
      }, i);
      viewportOpts.height = containerHeight_2;
      await page.setViewport(viewportOpts);
      await page.waitFor(2000);
      await screenshot("03_00_how_we_engage_slider_0"+i);
    }
  }

  async function whatWeCommited() {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] }); //page reload
    await page.waitFor(3000);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelector(".main-slider").style.display = "block";
      document.querySelector("#intro-section").style.display = "block";
      document.querySelector("#section-3").style.display = "block";
      document.querySelectorAll('.horizontal-divider')[0].style.display = 'flex';
      document.querySelectorAll('.wp-block-heading')[1].style.display = 'block';
      document.querySelectorAll('section')[2].style.display = 'block'; //quote class
      document.querySelectorAll('.horizontal-divider')[1].style.display = 'flex';
      document.querySelector('.slider-wrapper').style.display = 'block';
      document.querySelectorAll('.wp-block-heading')[2].style.display = 'block';
      document.querySelectorAll('.wp-block-buttons')[0].style.display = 'flex';
      document.querySelectorAll('.horizontal-divider')[2].style.display = 'flex';
      document.querySelectorAll('.wp-block-columns')[0].style.display = 'none';
      document.querySelectorAll('.wp-block-columns')[1].style.display = 'none';
      document.querySelectorAll('.wp-block-heading')[3].style.display = 'none';
      document.querySelectorAll('.wp-block-buttons')[1].style.display = 'none';
      document.querySelectorAll('.horizontal-divider')[3].style.display = 'none';
      document.querySelector('#address').style.display = 'none';
      document.getElementsByTagName("footer")[0].style.display = "none";
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(3000);
    await screenshot("04_00_what_we_commited_slider_00");

    const containerHeight_2 = await page.evaluate(() => {
      document.querySelector(".main-slider").style.display = "none";
      document.querySelector("#intro-section").style.display = "none";
      document.querySelector("#section-3").style.display = "none";
      document.querySelectorAll('.horizontal-divider')[0].style.display = 'none';
      document.querySelectorAll('.wp-block-heading')[1].style.display = 'none';
      document.querySelectorAll('section')[2].style.display = 'none'; //quote class
      document.querySelectorAll('.horizontal-divider')[1].style.display = 'flex';
      document.querySelectorAll('.wp-block-heading')[2].style.display = 'block';
      document.querySelector('.slider-wrapper').style.display = 'block';
      document.querySelector('#picture-carousel .slick-track').style.transform = 'translate3d(-10px, 0px, 0px)';
      document.querySelectorAll('.wp-block-buttons')[0].style.display = 'flex';
      document.querySelectorAll('.horizontal-divider')[2].style.display = 'flex';
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_2;
    await page.setViewport(viewportOpts);
    await page.waitFor(2000);
    await screenshot("04_00_what_we_commited_slider_01");

    const containerHeight_3 = await page.evaluate(() => {
      document.querySelector('#picture-carousel .slick-track').style.transform = 'translate3d(-280px, 0px, 0px)';
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_3;
    await page.setViewport(viewportOpts);
    await page.waitFor(2000);
    await screenshot("04_00_what_we_commited_slider_02");

    const containerHeight_4 = await page.evaluate(() => {
      document.querySelector('#picture-carousel .slick-track').style.transform = 'translate3d(-550px, 0px, 0px)';
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_4;
    await page.setViewport(viewportOpts);
    await page.waitFor(2000);
    await screenshot("04_00_what_we_commited_slider_03");

    const containerHeight_5 = await page.evaluate(() => {
      document.querySelector('#picture-carousel .slick-track').style.transform = 'translate3d(-820px, 0px, 0px)';
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_5;
    await page.setViewport(viewportOpts);
    await page.waitFor(2000);
    await screenshot("04_00_what_we_commited_slider_04");

    const containerHeight_6 = await page.evaluate(() => {
      document.querySelector('#picture-carousel .slick-track').style.transform = 'translate3d(-1090px, 0px, 0px)';
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_6;
    await page.setViewport(viewportOpts);
    await page.waitFor(2000);
    await screenshot("04_00_what_we_commited_slider_05");
  }

  async function whatWeDoPeople() {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] }); //page reload
    await page.waitFor(3000);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelector(".main-slider").style.display = "block";
      document.querySelector("#intro-section").style.display = "block";
      document.querySelector("#section-3").style.display = "block";
      document.querySelectorAll('.horizontal-divider')[0].style.display = 'flex';
      document.querySelectorAll('.wp-block-heading')[1].style.display = 'block';
      document.querySelectorAll('section')[2].style.display = 'block'; //quote class
      document.querySelectorAll('.horizontal-divider')[1].style.display = 'flex';
      document.querySelector('.slider-wrapper').style.display = 'block';
      document.querySelectorAll('.wp-block-heading')[2].style.display = 'block';
      document.querySelectorAll('.wp-block-buttons')[0].style.display = 'flex';
      document.querySelectorAll('.horizontal-divider')[2].style.display = 'flex';
      document.querySelectorAll('.wp-block-heading')[3].style.display = 'block';
      document.querySelectorAll('.wp-block-columns')[0].style.display = 'flex';
      document.querySelectorAll('.wp-block-columns')[0].querySelectorAll('.wp-block-column')[1].style.marginTop = '32px';
      document.querySelectorAll('.wp-block-columns')[1].style.display = 'flex';
      document.querySelectorAll('.wp-block-columns')[1].querySelectorAll('.wp-block-column')[0].style.marginBottom = '32px';
      document.querySelectorAll('.wp-block-buttons')[1].style.display = 'flex';
      document.querySelectorAll('.horizontal-divider')[3].style.display = 'flex';
      document.querySelector('#address').style.display = 'none';
      document.getElementsByTagName("footer")[0].style.display = "none";
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(3000);
    await screenshot("05_00_what_we_do_people_00");
  }

  async function location() {
    await page.waitFor(3000);
    const containerHeight_1 = await page.evaluate(() => {
      document.querySelector('#address').style.display = 'block';
      document.getElementsByTagName("footer")[0].style.display = "none";
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(3000);
    await screenshot("06_00_location_00");
  }

  async function footer() {
    await page.waitFor(3000);
    const containerHeight_1 = await page.evaluate(() => {
      document.getElementsByTagName("footer")[0].style.display = "block";
      // document.querySelector('.copyright').querySelector('.logo-link').style.marginRight = '76px';
      return document.getElementById("page").scrollHeight;
    });

    viewportOpts.height = containerHeight_1;
    await page.setViewport(viewportOpts);
    await page.waitFor(3000);
    await screenshot("07_00_footer_00");
  }

  await browser.close();
})();
