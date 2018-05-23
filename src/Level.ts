module MyGame {

	export class Level extends Phaser.State {

		background: Phaser.Sprite;
		music: Phaser.Sound;
		unicorn: MyGame.Unicorn;
		parts: Phaser.Group;

		create() {

			this.background = this.add.sprite(0, 0, 'background');
			this.background.scale.setTo(1.5,1.5);
			this.parts = this.game.add.group()

			let parts = [
				'xxxxxxxxxxxxxxxx',
				'x  2       x   x',
				'x              x',
				'x    x      x  x',
				'x    x         x',
				'x    x         x',
				'x    x   5     x',
				'x    x         x',
				'x    x         x',
				'x       x      x',
				'x       x      x',
				'xxxxxxxxxxxxxxxx',
			];

			for (var i = 0; i < parts.length; i++) {
				for (var j = 0; j < parts[i].length; j++) {

					if(parts[i][j] == 'x') {
						this.parts.add(new Wall(this.game, 50*j, 50*i));
					}
				
				}
			}

			this.unicorn = new Unicorn(this.game, this, 130, 284);

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			// this.game.physics.arcade.enable([wall, this.unicorn]);

			// block.body.collideWorldBounds = true;

			// block.body.onCollide = new Phaser.Signal();
			// block.body.onCollide.add(hitSprite, this);
		}

	}

} 