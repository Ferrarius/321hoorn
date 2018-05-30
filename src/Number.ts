module MyGame {

	export class Number extends Phaser.Text {

		number: number;

		constructor(game: Phaser.Game, x: number, y: number, number: number) {

			super(game, x, y, number);
            this.number = number;

			// let numb = 0.6
			// console.log(numb)
			
			// if(numb < 0.5){
			// super(game, x, y, '', 0);
			// } else{
			// super(game, x, y, '', 0);
			// }
			

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