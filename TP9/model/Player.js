
export default class Player {
    constructor(id, name, userskin, position) {
        this.name = name;
        this.skin = userskin;
        this.lvl = 1;
        this.speed = 1;
        this.renderX = position[0];
        this.renderY = position[1];
        this.prevX = this.renderX;
        this.prevY = this.renderY;
        this.targetX = this.renderX;
        this.targetY = this.renderY;
        this.hp = 100;
        this.maxHp = 100
        this.cooldown = 10;
        this.maxCooldown = 10;
        this.regeneration = 2; // HP/s
        this.maxRegeneration = 2;
        this.damage = 1;
        this.direction = 3; // Dans le serveur, 3 correspond à vers le sud pour voir la tete du personnage au spawn
        this.isWalking = false;
        this.isAttacking = false;
        this.isDying = false;
        this.walkSpriteDuration = 2;
        this.walkSpriteIndex = 0;
        this.walkSpriteNumber = 9;
        this.attackSpriteDuration = 3;
        this.attackSpriteIndex = 0;
        this.attackSpriteNumber = 6;
        this.dyingSpriteDuration = 2;
        this.dyingSpriteIndex = 0;
        this.dyingSpriteNumber = 6;
        this.currentWalkSpriteStep = 0;
        this.currentAttackSpriteStep = 0;
        this.currentDyingSpriteStep = 0;
        this.currentIdleSpriteStep = 0;
        this.idleSpriteDuration = 2;
        this.idleSpriteIndex = 0;
        this.idleSpriteNumber = 6;
        this.currentIdleSpriteStep = 0;
        }

    update(updateData) {
        this.speed = updateData.speed;
        this.lvl = updateData.lvl;
        this.hp = updateData.hp;
        this.maxHp = updateData.maxHp;
        this.prevX = this.renderX;
        this.prevY = this.renderY;
        this.targetX = updateData.position[0];
        this.targetY = updateData.position[1];
        this.cooldown = updateData.currentAttackCooldown;
        this.maxCooldown = updateData.attackCooldown;
        this.damage = updateData.damage;
        this.regeneration = updateData.regeneration;
        this.maxRegeneration = updateData.maxRegeneration;
        this.direction = updateData.direction;
        this.isWalking = updateData.isWalking;
        this.isAttacking = updateData.isAttacking;
        this.isDying = updateData.isDying;
    }

    animate() {
        if (this.isDying || this.currentDyingSpriteStep > 0) {

            this.currentDyingSpriteStep++;
            if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
                this.currentDyingSpriteStep = 0;
                this.dyingSpriteIndex++;
                }
            if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
                this.dyingSpriteIndex = 0;
            }
        }

        else if (this.isAttacking || this.currentAttackSpriteStep > 0 || this.attackSpriteIndex > 0) {

            this.currentAttackSpriteStep++;
            if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
                this.currentAttackSpriteStep = 0;
                this.attackSpriteIndex++;
                }
            if (this.attackSpriteIndex >= this.attackSpriteNumber) {
                this.attackSpriteIndex = 0;
            }
        }

        else if (this.isWalking && this.isAttacking == false && this.isDying == false) {

            this.currentWalkSpriteStep++;
            if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
                this.currentWalkSpriteStep = 0;
                this.walkSpriteIndex++;
                }
            if (this.walkSpriteIndex >= this.walkSpriteNumber) {
                this.walkSpriteIndex = 0;
            }
        }

        else { // idle
            this.currentIdleSpriteStep++;
            if (this.currentIdleSpriteStep >= this.idleSpriteDuration) {
                this.currentIdleSpriteStep = 0;
                this.dyingIdleIndex++;
                }
            if (this.dyingIdleIndex >= this.dyingIdleNumber) {
                this.idleSpriteIndex = 0;
            }
        }
        if (this.isAttacking) {
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

    interpolate(alpha) {
        this.renderX = this.prevX + (this.targetX - this.prevX) * alpha;
        this.renderY = this.prevY + (this.targetY - this.prevY) * alpha;
    }
}



// toto = new Player("1", "toto", "skin.png", [0, 0]);
// for (let i = 0; i < 13; i++) {
//     toto.animate();
//     console.log("Position : ", toto.renderX, toto.renderY)
// }
