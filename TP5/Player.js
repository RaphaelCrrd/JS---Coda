const direction {

}

class Player {
    constructor(name, userskin, positionX, positionY) {
        this.name = name;
        this.skin = userskin;
        this.level = 1;
        this.speed = 1;
        this.positionX = positionX;
        this.positionY = positionY;
        this.hp = 100;
        this.maxHp = 100;
        this.cooldown = 10;
        this.maxCooldown = 10;
        this.regeneration = 2; // HP/s
        this.maxRegeneration = 2;
        this.damage = 1;
        this.direction = 3; // Dans le serveur, 3 correspond à vers le sud pour voir la tete du personnage au spawn
        this.isWalking = true;
        this.isAttacking = false;
        this.isDying = false;
        this.walkSpriteDuration = 2;
        this.walkSpriteIndex = 0;
        this.walkSpriteNumber = 9;
        this.attackSpriteDuration = 2;
        this.attackSpriteIndex = 0;
        this.attackSpriteNumber = 9; // Mettre le bon nombre de sprite en tout dans l'annimation
        this.dyingSpriteDuration = 2;
        this.dyingSpriteIndex = 0;
        this.dyingSpriteNumber = 9; // Pareil, mettre le bon nombre
        this.currentWalkSpriteStep = 0;
        this.currentAttackSpriteStep = 0;
        this.currentDyingSpriteStep = 0;
        this.currentIdleSpriteStep = 0;

        }

    update(updateData) {
        if (hp >= 0) {
            this.isDead = true;
        }
        this.speed = updateData.speed;
        this.level = updateData.level;
        this.hp = updateData.hp;
        this.maxHp = updateData.maxHp;
        this.positionX = updateData.positionX;
        this.positionY = updateData.positionY;
        this.cooldown = updateData.level;
        this.maxCooldown = updateData.maxCooldown;
        this.damage = updateData.damage;
        this.regeneration = updateData.regeneration;
        this.maxRegeneration = updateData.maxRegeneration;
        this.direction = updateData.direction;
        this.isWalking = updateData.isWalking;
        this.isAttacking = updateData.isAttacking;
        this.isDying = updateData.isDying;
    }

    animate() {
        if (this.isWalking && this.isAttacking == false && this.isDying == false) {

            this.currentWalkSpriteStep++;
            if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
                this.currentWalkSpriteStep = 0;
                this.walkSpriteIndex++;
                }
            if (this.walkSpriteIndex >= this.walkSpriteNumber) {
                this.walkSpriteIndex = 0;
            }
        }

        else if (this.isAttacking || this.currentAttackSpriteStep > 0) {

            this.currentAttackSpriteStep++;
            if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
                this.currentAttackSpriteStep = 0;
                this.attackSpriteIndex++;
                }
            if (this.attackSpriteIndex >= this.attackSpriteNumber) {
                this.attackSpriteIndex = 0;
            }
        }

        else if (this.isDying || this.currentDyingSpriteStep > 0) {

            this.currentDyingSpriteStep++;
            if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
                this.currentDyingSpriteStep = 0;
                this.dyingSpriteIndex++;
                }
            if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
                this.dyingSpriteIndex = 0;
            }
        }

        else { // idle
            
        }
        console.log("Walk animation :\n");
        console.log("isWalking = ", this.isWalking);
        console.log("walkSpriteIndex = ", this.walkSpriteIndex);
        console.log("walkSpriteNmber = ", this.walkSpriteNumber);
        console.log("curentWalkSpriteStep = ", this.currentWalkSpriteStep);
        console.log("Attack animation :\n");
        console.log("isAttacking = ", this.isAttacking);
        console.log("attackSpriteIndex = ", this.attackSpriteIndex);
        console.log("attackSpriteNumber = ", this.attackSpriteNumber);

    }
    
}

toto = new Player("toto", 1, 0, 0);
for (let i = 0; i < 13; i++) {
    toto.animate();
}
