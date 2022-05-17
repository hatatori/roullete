let Ball = {
    init_velocity: 50,
    velocity: 20,
    aceleration:20,
    x:0,
    y:0,
    el: img_ball,

    pos(x,y){
        this.el.style.left = x+"px"
        this.el.style.top = y+"px"
    },

    spin(){
             
        

        let dx = Math.sin(this.velocity)*Roullete.roulette_img.width/2
        let dy = Math.cos(this.velocity)*Roullete.roulette_img.width/2*-1
        
        this.pos(dx,dy)

        this.velocity = this.velocity - this.velocity/100 - 0.04

        if(this.velocity < 0) this.velocity = 0;
        
        if(this.velocity.toFixed(1) == 0.3 && !this.el.classList.contains('wave')){
            this.el.classList.add('wave')
            setTimeout(()=>this.el.classList.remove('wave'),1000)
        }
    },
    
    start(){ this.velocity = this.init_velocity }
}

let Roullete = {
    grau:0,
    factor: 1,
    init_velocity: 1,
    velocity: 0,
    torque:0.1,
    factor:0.17785,
    aceleration:1,
    roulette_img: img_roleta_numbers,
    // order: [0,2,14,35,23,4,16,33,21,6,18,31,19,8,12,29,25,10,27,0,1,13,36,24,3,15,34,22,5,17,32,20,7,11,30,26,9,28],
    order: [0,26,3,35,12,28,7,29,18,22,9,31,14,20,1,33,16,24,5,10,23,8,30,11,36,13,27,6,34,17,25,2,21,4,19,15,32],
    value:0,
    
    roll(){
        this.choice(this.value)
    },

    zero(){
        this.grau = 0
    },
    
    animation(){

        this.roulette_img.style.transform = `rotate(${this.grau}deg)`
        
        this.aceleration -= 0.0005
        // console.log(this.velocity)
        if(this.aceleration <= 0)
            this.aceleration = 0

        if(this.velocity > 0){
            this.velocity = this.velocity * this.aceleration
            this.grau += this.velocity
        }

    },

    choice(n){
        this.num = this.order.indexOf(n) //2
        // this.num = n
        // this.grau = 0
        // this.velocity = 2 * 38 * this.factor + this.num * this.factor
        // this.velocity = this.factor + this.num
        // this.aceleration = 1

        this.grau = 0
        this.velocity = 6.58 * 2 + this.factor * this.num
        this.aceleration = 1


    },

    start(){
        this.grau = 0
        this.velocity = this.init_velocity
        render.rotateRandom()
    }
}

let Audios = {
    roll(){
        let audio = new Audio('mp3/roll.mp3')
        audio.play()
    },
    select1(){
        let audio = new Audio('mp3/select1.mp3')
        audio.play()
    },
    select2(){
        let audio = new Audio('mp3/select2.mp3')
        audio.play()
    }
}