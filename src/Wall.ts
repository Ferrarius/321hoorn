module MyGame {

	export class Wall extends Phaser.Sprite {

		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'block', 0);

            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.body.immovable = true;
            this.scale.setTo(1, 1);
			
			// this.anchor.setTo(0.5, 0);

			// this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);

			game.add.existing(this);

		}

	}

}