const puppeteer = require('puppeteer');
const { writeFileSync } = require('fs');
const { join } = require('path');

let browser;
let page;

const extractProverbs = text =>
	text
		.split('.')
		.map(proverb => proverb.trimStart())
		.filter(proverb => proverb);

const processProverbs = async suffix => {
	browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
	page = await browser.newPage();
	page.setViewport({ width: 1280, height: 926 });
	const themeSuffix = `${process.env.PROVERBS_SITE}/${suffix}`;
	const proverbSite = themeSuffix;
	await page.goto(proverbSite);
	await page.waitFor(1 * 1000);
	const proverbs = await page
		.evaluate(
			(sel, currentMethod) => document.querySelector(sel) && document.querySelector(sel)[currentMethod],
			'#caja-f1 > p',
			'textContent',
		)
		.then(extractProverbs);

	await browser.close();
	return proverbs;
};

const run = async () => {
	const proverbPageByTheme = {
		amor: 'amor/amor1.html',
		vino: 'uvas/vino.html',
		pan: 'trigo/pan.html',
		niños: 'ninos/ninos.html',
		gente: 'gente/gente.html',
		mar: 'gente/marinero.html',
		trabajo: 'trabajo/trabajo.htm',
		locura: 'gente/locos.html',
	};

	const themes = Object.keys(proverbPageByTheme);

	const spanishProverbsPath = join(__dirname, '..', 'lambda', 'proverbs', 'data', 'es-ES');

	for (let i = 0; i < themes.length; i++) {
		const theme = themes[i];
		const proverbs = await processProverbs(proverbPageByTheme[theme]);
		console.log(`Writing ${proverbs.length} for theme ${theme}`);
		writeFileSync(join(spanishProverbsPath, `${theme}.json`), JSON.stringify(proverbs), 'utf8');
	}
	process.exit(0);
};

run();
