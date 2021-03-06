module MyGame {

	export class Level extends Phaser.State {

		background: Phaser.Sprite;
		music: Phaser.Sound;
		unicorn: MyGame.Unicorn;
		parts: Phaser.Group;
		numbers: Phaser.Group;
		sum: MyGame.Sum;
		level: this;

		create() {

			this.background = this.add.sprite(0, 0, 'background');
			this.background.scale.setTo(1.5,1.5);
			this.parts = this.game.add.group();
			this.numbers = this.game.add.group();
			this.sum = new Sum(this.game, 1100, 10, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));

			let parts = [
				'xxxxxxxxxxxxxxxxxxxxxxxxxx',
				'x  y       x        x    x',
				'x                   x    x',
				'x    x      x       x    x',
				'x    x              x    x',
				'x    x              x    x',
				'x    x   y          x    x',
				'x    x        xxxxxxx    x',
				'x    x              x    x',
				'x                   x    x',
				'x              y         x',
				'x       x                x',
				'x       x                x',
				'xxxxxxxxxxxxxxxxxxxxxxxxxx',
			];

			for (var i = 0; i < parts.length; i++) {
				for (var j = 0; j < parts[i].length; j++) {

                    if(parts[i][j] == 'x') {
                        this.parts.add(new Wall(this.game, 50*j, 50*i));
                    } else if(parts[i][j] == 'y') {
                        this.numbers.add(new Number(this.game, 50*j, 50*i, Math.floor(Math.random() * 100)));
                    }

                    // if(parts[i][j] == 'z') {
                    //     this.numbers.add(new Number(this.game, 50*j, 50*i, this.sum.answer));
                    // }
				
				}
			}

			let x = 50*Math.floor(Math.random() * parts[0].length);
			let y = 50*Math.floor(Math.random() * parts.length);

			this.numbers.add(new Number(this.game, x, y, this.sum.answer));

			this.unicorn = new Unicorn(this.game, this, 130, 284);

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			// this.game.physics.arcade.enable([wall, this.unicorn]);

			// block.body.collideWorldBounds = true;

			// block.body.onCollide = new Phaser.Signal();
			// block.body.onCollide.add(hitSprite, this);
		}

		numberOverlap(unicorn: MyGame.Unicorn, number: MyGame.Number) {

			if(number.number == this.level.sum.answer) {
                this.level.sum.showAnswer();
			} else {

			}

			number.kill();
			// alert(number.number);
		}

		nextLevel() {
			// this.game.state.restart(true, false);
            this.game.state.start('Level', true, false);
        }

	}

} 