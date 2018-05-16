module MyGame {

	export class Level extends Phaser.State {

		background: Phaser.Sprite;
		music: Phaser.Sound;
		unicorn: MyGame.Unicorn;

		create() {

			this.background = this.add.sprite(0, 0, 'background');
			this.background.scale.setTo(1.5,1.5);

			this.unicorn = new Unicorn(this.game, 130, 284);

		}

	}

} 