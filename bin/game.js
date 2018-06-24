var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyGame;
(function (MyGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(960, 420, 2048, 1536);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    MyGame.Boot = Boot;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 1280, 700, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', MyGame.Boot, false);
            _this.state.add('Preloader', MyGame.Preloader, false);
            _this.state.add('MainMenu', MyGame.MainMenu, false);
            _this.state.add('Level', MyGame.Level, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MyGame.Game = Game;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'background');
            this.background.scale.setTo(1.5, 1.5);
            this.parts = this.game.add.group();
            this.numbers = this.game.add.group();
            this.sum = new MyGame.Sum(this.game, 1100, 10, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
            var parts = [
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
                    if (parts[i][j] == 'x') {
                        this.parts.add(new MyGame.Wall(this.game, 50 * j, 50 * i));
                    }
                    else if (parts[i][j] == 'y') {
                        this.numbers.add(new MyGame.Number(this.game, 50 * j, 50 * i, Math.floor(Math.random() * 100)));
                    }
                }
            }
            var x = 50 * Math.floor(Math.random() * parts[0].length);
            var y = 50 * Math.floor(Math.random() * parts.length);
            this.numbers.add(new MyGame.Number(this.game, x, y, this.sum.answer));
            this.unicorn = new MyGame.Unicorn(this.game, this, 130, 284);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        Level.prototype.numberOverlap = function (unicorn, number) {
            if (number.number == this.level.sum.answer) {
                this.level.sum.showAnswer();
            }
            else {
            }
            number.kill();
        };
        Level.prototype.nextLevel = function () {
            this.game.state.start('Level', true, false);
        };
        return Level;
    }(Phaser.State));
    MyGame.Level = Level;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'level1');
            this.player = new MyGame.Player(this.game, 130, 284);
        };
        return Level1;
    }(Phaser.State));
    MyGame.Level1 = Level1;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    MyGame.MainMenu = MainMenu;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Number = (function (_super) {
        __extends(Number, _super);
        function Number(game, x, y, number) {
            var _this = this;
            game.add.sprite(x, y, 'number');
            _this = _super.call(this, game, x, y, number.toString()) || this;
            _this.number = number;
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = true;
            _this.body.immovable = true;
            _this.scale.setTo(1, 1);
            game.add.existing(_this);
            return _this;
        }
        return Number;
    }(Phaser.Text));
    MyGame.Number = Number;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'simon', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    }(Phaser.Sprite));
    MyGame.Player = Player;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(300, 400, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.image('background', 'assets/background.jpg');
            this.load.spritesheet('block', 'assets/block.png', 50, 50);
            this.load.spritesheet('number', 'assets/number.png', 50, 50);
            this.load.spritesheet('unicorn', 'assets/unicorn.png', 100, 100);
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Sum = (function (_super) {
        __extends(Sum, _super);
        function Sum(game, x, y, firstNumber, secondNumber) {
            var _this = this;
            var sum = firstNumber + ' x ' + secondNumber + ' = ';
            _this = _super.call(this, game, x, y, sum, { fill: 'white' }) || this;
            _this.sum = sum;
            _this.answer = firstNumber * secondNumber;
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = true;
            _this.body.immovable = true;
            _this.scale.setTo(1, 1);
            game.add.existing(_this);
            return _this;
        }
        Sum.prototype.showAnswer = function () {
            this.setText(this.sum + this.answer);
        };
        return Sum;
    }(Phaser.Text));
    MyGame.Sum = Sum;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Unicorn = (function (_super) {
        __extends(Unicorn, _super);
        function Unicorn(game, level, x, y) {
            var _this = _super.call(this, game, x, y, 'unicorn', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.level = level;
            _this.body.collideWorldBounds = true;
            _this.anchor.setTo(0.5, 0);
            game.add.existing(_this);
            return _this;
        }
        Unicorn.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -300;
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 300;
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -300;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 300;
            }
            else {
                this.animations.frame = 0;
            }
            this.game.physics.arcade.collide(this, this.level.parts);
            this.game.physics.arcade.overlap(this, this.level.numbers, this.level.numberOverlap, null, this);
        };
        return Unicorn;
    }(Phaser.Sprite));
    MyGame.Unicorn = Unicorn;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall(game, x, y) {
            var _this = _super.call(this, game, x, y, 'block', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = true;
            _this.body.immovable = true;
            _this.scale.setTo(1, 1);
            game.add.existing(_this);
            return _this;
        }
        return Wall;
    }(Phaser.Sprite));
    MyGame.Wall = Wall;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=game.js.map