module MyGame {

	export class Game extends Phaser.Game {

		constructor() {

			super(1280, 700, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Level', Level, false);

			this.state.start('Boot');
			// this.state.start('Level', true, false);
		}

	}

}