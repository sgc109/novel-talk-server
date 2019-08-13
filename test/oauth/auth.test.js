import server, { disposable } from '../../app';

const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const path = require('path');

const { expect } = chai;
const TEST_CLIENT_PORT = 5000;
const puppeteer = require('puppeteer');


const email = 'noveltalktest@gmail.com';
const password = 'novel1234';


async function googleSignInWithPuppeteer(email, password) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-popup-blocking',
    ],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('localhost:5000/');

  // find google signin button
  await page.waitForSelector('#my-signin2 > div > div > span');
  // click signin button
  await page.click('#my-signin2 > div > div > span');

  // This is googleSignIn modal
  const googleOAuthTarget = await browser.waitForTarget(target => target.url().indexOf('https://accounts.google.com/signin/oauth/identifier') !== -1);

  // This is googleSignIn modalPage
  const googleOAuthPage = await googleOAuthTarget.page();

  // find email field
  await googleOAuthPage.waitForSelector('input[type="email"]');

  // typing email
  await googleOAuthPage.type('input[type="email"]', email);

  // find next button and click
  await googleOAuthPage.click('#identifierNext');

  // find password field
  await googleOAuthPage.waitForSelector('input[type="password"]', { visible: true });
  // typing password
  await googleOAuthPage.type('input[type="password"]', password);

  // find next button and click
  await googleOAuthPage.waitForSelector('#passwordNext', { visible: true });
  await googleOAuthPage.click('#passwordNext');

  // need refactor
  await page.waitFor(8000);

  const token = await page.evaluate(() => token);
  const photoUrl = await page.evaluate(() => photoUrl);

  await browser.close();
  return { token, photoUrl, platform: 'test' };
}


describe('Oauth Process', () => {
  let token;
  let platform;
  let photoUrl;
  let testClientServer;
  let testServerDisposable;
  before(async function () {
    this.timeout(15000);
    testClientServer = express();

    testServerDisposable = testClientServer.listen(
      TEST_CLIENT_PORT, () => console.log('test client server loaded'),
    );

    testClientServer.get('/', (req, res) => {
      res.sendFile(path.join(`${__dirname}/oauth.html`));
    });

    // noveltalktest@gmail.com
    // novel1234
    const data = await googleSignInWithPuppeteer(email, password);

    token = data.token;
    photoUrl = data.photoUrl;
    platform = data.platform;
  });


  it('send valid token to api server', (done) => {
    const oauthData = JSON.stringify({ token, photoUrl, platform });
    chai.request(server)
      .get('/api/auth/login/google')
      .set('oauthData', oauthData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });


  it('send invalid token to api server', (done) => {
    const invalidTokenSuffix = 'this token is modified';
    const oauthData = JSON.stringify({ token: token + invalidTokenSuffix, photoUrl, platform });
    chai.request(server)
      .get('/api/auth/login/google')
      .set('oauthData', oauthData)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });


  after(() => {
    disposable.close();
    testServerDisposable.close();
  });
});
