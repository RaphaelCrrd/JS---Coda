class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
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

        return this.sprites[path];
        }
    }


    drawPlayer(player) {
        // Resolution de base : 800*600 (petit sur macbook, 3024*1964)
        // Le backend envoie 0.43012 comme position X par exemple, ça veut dire 43,012% de la largeur totale du canvas
        const canvasX = player.renderX * this.width;
        const canvasY = player.renderY * this.width;
        player.animate();

        const spriteSize = player.isAttacking ? 192 : 64;
        const spriteImg = this.loadSprite(player.skin);

        if (player.isAttacking) {
            sx = player.attackSpriteIndex * spriteSize;
        } 

        else if (player.isWalking) {
            sx = player.walkSpriteIndex * spriteSize;
        } 

        else {
            sx = (player.idleSpriteIndex || 0) * spriteSize; 
        }

        sy = player.direction * spriteSize;

        if (spriteImg.complete) {
            const offsetX = spriteSize / 2;
            const offsetY = spriteSize / 2;

            this.ctx.draxImage(spriteImg, sx, sy, spriteSize, spriteSize, canvasX - offsetX, canvasY - offsetY, spriteSize, spriteSize);
        }

    }
}