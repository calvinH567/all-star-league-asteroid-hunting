var spaceShip;
var scattershotDown = 0;
class rock {
    constructor(x,y,health,id){
        this.health = health;
        this.y = y;
        this.x = x;
        this.id = id;
        this.attackCooldown

    }

    draw(){
        
        rectMode(CENTER);
        console.log(scattershotDown);
        console.log( "id " + this.id);
        rect (this.x,this.y,50,50);
        this.y = this.y + Math.round(random(1,1));
        if(this.id ==1){
            if(this.isTouching(spaceShip.x,spaceShip.y,25,25)){
                this.attackCooldown = this.attackCooldown +1;
            }
        }
        if(this.id ==2){
            if(this.isTouching(spaceShip.x,spaceShip.y,25,25)){
                this.attackCooldown = this.attackCooldown +1;
            }
        }
        if(this.id ==3){
            if(this.isTouching(spaceShip.x,spaceShip.y,25,25)){
                this.attackCooldown = this.attackCooldown +1;
            }
        }
        if(this.attackCooldown >15){
            this.attackCooldown=0;
            this.health = this.health - damage;
        }
        if(this.health<1){
            scattershotDown = scattershotDown + 1;
            this.health = 9999;
        }
        if(this.health == 9999){
            this.y = -10000;
            console.log("dsadasd");
        }
    }
    isTouching(x1,y1,w,h){
        if(this.x<x1 - w/2&&this.x> x1 +w
            &&this.y<y1 - h/2&&this.y>y1+h){

        }
    }
}