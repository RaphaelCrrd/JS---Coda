class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.sprites = {};
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawBackground() {
        this.ctx.fillStyle = "#AAA";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    render() {
        this.clear();
        this.drawBackground();

        Object.keys(this.game.players).forEach(id => {
            const player = this.game.players[id];
            this.drawPlayer(player);
        });
    }


    loadSprite(path) {
        if (!this.sprites[path]) {
            const img = new Image();
            img.src = path;
            this.sprites[path] = img;
            }

        return this.sprites[path];
        
    }


    drawPlayer(player) {
        // Resolution de base : 800*600 (petit sur macbook, 3024*1964)
        // Le backend envoie 0.43012 comme position X par exemple, ça veut dire 43,012% de la largeur totale du canvas
        const canvasX = player.renderX * this.width;
        const canvasY = player.renderY * this.height;
        player.animate();

        let spriteSize = 64;
        const spriteImg = this.loadSprite(player.skin);
        // console.log("sprite:", spriteImg, "loaded:", spriteImg?.complete);

        let sx = 0;
        let sy = 0;

        const lookDirection = {
            0: 0,
            1: 3,
            2: 2,
            3: 1,
        };

        const spriteDirection = lookDirection[player.direction] ?? player.direction;

        if (player.isAttacking  || player.currentAttackSpriteStep > 0|| player.attackSpriteIndex > 0) {
            spriteSize = 192
            sx = player.attackSpriteIndex * spriteSize;
            sy = 3456 + (spriteDirection * spriteSize);
        } 

        else if (player.isWalking) {
            sx = player.walkSpriteIndex * spriteSize;
            sy = (8 + spriteDirection) * spriteSize;
        }

        else {
            sx = (player.idleSpriteIndex || 0) * spriteSize;
            sy = spriteDirection * spriteSize;
        }


        if (spriteImg.complete) {
            const offsetX = spriteSize / 2;
            const offsetY = spriteSize / 2;

            this.ctx.drawImage(spriteImg, sx, sy, spriteSize, spriteSize, canvasX - offsetX, canvasY - offsetY, spriteSize, spriteSize);
        }

        // console.log(player.renderX, player.renderY);
        
        


    }
}