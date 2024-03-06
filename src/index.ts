import { Application, Sprite, Assets, Container, Point } from 'pixi.js'

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280, //640
	height: 720 //480
});

window.addEventListener("resize", () => {
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX, scaleY);

	const gameWidth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);

	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal + "px";
	app.view.style.marginRight = marginHorizontal + "px";

	app.view.style.marginTop = marginVertical +"px";
	app.view.style.marginBottom = marginVertical + "px";

});
window.dispatchEvent(new Event("resize"));

async function loadTextureAndCreateSprite() {
	const texture = await Assets.load('./athalia.png');
	const athalia = Sprite.from(texture);

	const texture1 = await Assets.load('./sparkles2.png');
	const sparkles = Sprite.from(texture1);

	console.log("Hola mundo", athalia.width, athalia.height);

	sparkles.position.set(100, 50);
	const athaliaWithSparkle : Container = new Container();

	

	athaliaWithSparkle.addChild(sparkles);
	athaliaWithSparkle.addChild(athalia);

	athaliaWithSparkle.scale.set(0.5);
	athaliaWithSparkle.x = 200;
	athaliaWithSparkle.y = 300;

	console.log(sparkles.toGlobal(new Point()));
	console.log(sparkles.parent.toGlobal(sparkles.position));

	const aux = sparkles.parent.toLocal(new Point(0,0));
	sparkles.position.x = aux.x;
	sparkles.position.y = aux.y;
	
	app.stage.addChild(athaliaWithSparkle);
}
loadTextureAndCreateSprite();