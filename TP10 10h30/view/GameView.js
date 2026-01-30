export default class GameView {
    constructor(game) {
        this.game = game;
        console.log("GameView créée", this); // débug
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

        console.log("CANVAS SIZE", this.canvas.width, this.canvas.height); // Ajouté pour test


        Object.keys(this.game.players).forEach(id => {
            const player = this.game.players[id];
            this.drawPlayer(player);
        });
    }


    loadSprite(path) {
    // Sécurité : corriger le chemin
    if (!path.startsWith("assets/")) {
        path = "assets/" + path.replace(/^\/?ssets\//, "").replace(/^\/?assets\//, "");
    }

    if (!this.sprites[path]) {
        const img = new Image();

        img.onload = () => {
            console.log("Sprite chargé OK :", path);
        };

        img.onerror = () => {
            console.error("❌ Sprite introuvable :", path);
        };

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
        // player.animate();

        let spriteSize = 64;
        const spriteImg = this.loadSprite(player.skin);
        console.log("sprite:", spriteImg, "loaded:", spriteImg?.complete);

        if (!spriteImg || !spriteImg.complete) {
            console.log("SPRITE PAS PRÊT");
            return;
            }


        let sx = 0;
        let sy = 0;

        const lookDirection = {
            0: 0,
            1: 3,
            2: 2,
            3: 1,
        };

        const spriteDirection = lookDirection[player.direction] ?? player.direction;

        if (player.isDying) {
            sx = player.walkSpriteIndex * spriteSize;
            sy = (8 + spriteDirection) * spriteSize;
        }

        else if (player.isAttacking  || player.currentAttackSpriteStep > 0|| player.attackSpriteIndex > 0) {
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


            console.log({
                imgW: spriteImg.naturalWidth,
                imgH: spriteImg.naturalHeight,
                sx, sy, spriteSize
            });

            if (!spriteImg || spriteImg.naturalWidth === 0) {
                console.log("SPRITE PAS PRÊT / CASSÉ :", spriteImg?.src);
                return;
            }

            this.ctx.drawImage(spriteImg, sx, sy, spriteSize, spriteSize, canvasX - offsetX, canvasY - offsetY, spriteSize, spriteSize);
        }

        // console.log(player.renderX, player.renderY);

        
        const hpRatio = player.hp / player.maxHp;
        const barWidth = 40;
        const barHeight = 6;
        const barX = canvasX - barWidth / 2;
        const barY = canvasY - 40;

        let hpBarColor = "green";
        if (hpRatio > 0.5) {
            hpBarColor = "green";
        }
        else if (hpRatio <= 0.5 && hpRatio > 0.25) {
            hpBarColor = "yellow";
        }
        else if (hpRatio <= 0.25 && hpRatio > 0.1) {
            hpBarColor = "orange";
        }
        else {
            hpBarColor = "red";
        }
        

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(barX, barY, barWidth, barHeight);

        this.ctx.fillStyle = hpBarColor;
        this.ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);

        const cdRatio = 1 - (player.cooldown / player.maxCooldown);

        const cdY = barY + barHeight + 4;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(barX, cdY, barWidth, 4);

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(barX, cdY, barWidth * cdRatio, 4);

        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";

        this.ctx.fillText(
            `${player.name} (lvl ${player.lvl})`,
            canvasX,
            canvasY - 50
        );

        
    }
}

