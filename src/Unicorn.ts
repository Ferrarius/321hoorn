module MyGame {

	export class Unicorn extends Phaser.Sprite {

        level: MyGame.Level;

		constructor(game: Phaser.Game, level: MyGame.Level, x: number, y: number) {

			super(game, x, y, 'unicorn', 0);

			this.game.physics.arcade.enableBody(this);
            this.level = level;
            this.body.collideWorldBounds = true;
			
            this.anchor.setTo(0.5, 0);

			// this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);

			game.add.existing(this);

		}

		update() {

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

				this.body.velocity.x = -300;
				// this.animations.play('walk');

				if (this.scale.x == 1) {
					this.scale.x = -1;
				}
			}
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

				this.body.velocity.x = 300;
				// this.animations.play('walk');

				if (this.scale.x == -1) {
					this.scale.x = 1;
				}
			}
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

				this.body.velocity.y = -300;
				// this.animations.play('walk');
			}
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

				this.body.velocity.y = 300;
				// this.animations.play('walk');
			}
			else {
				this.animations.frame = 0;
            }
            
			this.game.physics.arcade.collide(this, this.level.parts);
			this.game.physics.arcade.overlap(this, this.level.numbers, this.grabNumber);
		}

		public grabNumber() {
			alert('hi');
		}

	}

}