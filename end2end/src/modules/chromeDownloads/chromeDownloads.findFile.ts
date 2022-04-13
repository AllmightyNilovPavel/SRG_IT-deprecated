export async function ChromeDownloadsFindFileByName(fileName: string) {
  console.log(`Ищем по имени файла: ${fileName}`);
  browser.url(`chrome://downloads`);

  browser.waitUntil(() => browser.getUrl().match(`downloads`) !== null);
  let test = browser.executeScript(
    `document.querySelector('body > downloads-manager').shadowRoot.querySelectorAll('div#mainContainer > iron-list  downloads-item')`
  );
  // let altRoot = document.querySelector(`body > downloads-manager`)!.shadowRoot!.querySelectorAll(`div#mainContainer > iron-list  downloads-item`)
  const cssRoot = await $(`body > download-manager`);
  // const cssShadow1 = cssRoot.shadow$(`div#mainContainer`)
  // const cssShadow2 = cssShadow1.shadow$$(`downloads-item`)
  // const testRoot = replaceShadowDomsWithHtml(browser.$(`body > downloads-manager`))

  console.log(`--------------------------------- CSS --------------------------------------------`);

  console.log(`CSS root: ${await cssRoot}`);
  console.log(`CSS root2: ${await test}`);
  // console.log(cssShadow1);
  // console.log(cssShadow2);
  // console.log(testRoot);

  console.log(`--------------------------------- CUSTOM -----------------------------------------`);
  // let omg = await browser.custom$('omg',fileName)
  // console.log(omg);

  // altRoot.forEach((e) => console.log(e))
  console.log(`--------------------------------------------------------------------------------`);
  // let altResult = altRoot.
  // let root = browser.$(`body > downloads-manager`);
  // let shadow = root.shadow$(`div#mainContainer`)
  // console.log(shadow);

  // let fileSelector = root.shadow$(`a[href*='${fileName}']`)
  // let result = fileSelector.getValue()
  // console.log(result);
  // return result
  return cssRoot;
}

// Returns HTML of given shadow DOM.
function getShadowDomHtml(shadowRoot) {
  let shadowHTML = "";
  for (let el of shadowRoot.childNodes) {
    shadowHTML += el.nodeValue || el.outerHTML;
  }
  return shadowHTML;
}

// Recursively replaces shadow DOMs with their HTML.
function replaceShadowDomsWithHtml(rootElement) {
  for (let el of rootElement.querySelectorAll("*")) {
    if (el.shadowRoot) {
      replaceShadowDomsWithHtml(el.shadowRoot);
      el.innerHTML += getShadowDomHtml(el.shadowRoot);
    }
  }
}
