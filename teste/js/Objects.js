let Ball = {
    velocity: 10,
    el: img_ball,
    r: 1.35,
    aceleration: 1,
    degree: 0,
    factor: 0.005,

    pos(x,y){
        this.el.style.left = x+"px"
        this.el.style.top = y+"px"
    },

    deg(n){

        let dx = Math.cos(n) * Roullete.roulette_img.width/this.r
        let dy = Math.sin(n) * Roullete.roulette_img.width/this.r

        this.pos( dx , dy )
    },

    spin(){

        if(this.r < 1.6){
            this.r += 0.001
        }else{
            this.r += 0.01
            this.factor = 0.001

            // this.el.classList.add('wave')
            // setTimeout(()=>this.el.classList.remove('wave'),500)

        }

        if(this.r >= 2)
            this.r = 2

        // this.aceleration -= 0.1
        // this.velocity += this.aceleration

        // if(this.velocity > 0){
            // this.aceleration -= this.factor
            // this.velocity *= this.aceleration
        // }

        this.aceleration -= this.factor
        
        

        if(this.aceleration < 0)
            this.aceleration = 0
        
        this.velocity *= this.aceleration

        if(this.velocity < 0)
            this.velocity = 0


        this.degree -= this.velocity

        this.deg(this.degree/this.dec)
        
        // Audio.roll()
        
        if(this.velocity.toFixed(1) == 0.9 && !this.el.classList.contains('wave')){
            this.el.classList.add('wave')
            setTimeout(()=>this.el.classList.remove('wave'),1000)
        }

    },
    
    start(){ 
        this.r = 1.35,
        this.velocity = 5
    },

    go(){

        this.r = 1.35

        // this.velocity = 5

        this.deg(0)
        this.degree = 0
        this.factor = 0.00001
        this.dec = 10
        this.aceleration = 1
        this.velocity = 1.3045

        Audios.roll()

    },

    float(n){
        return parseFloat(n.toFixed(2))
    }
}
// Ball.go()
// Ball.go()

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
        if(this.aceleration <= 0)
            this.aceleration = 0

        if(this.velocity > 0){
            this.velocity = this.velocity * this.aceleration
            this.grau += this.velocity
        }

    },

    choice(n){
        
        this.num = this.order.indexOf(n) //2
        this.grau = this.num * 9.73
        
        // this.grau = this.num
        // this.velocity = 3.29
        // this.aceleration = 1

        // Roullete.choice(0)
        this.grau -= 180
        this.velocity = 3.29
        this.aceleration = 1





        // Roullete.grau = 0
        // Roullete.velocity = 6.58 * 2 + this.factor * this.num
        // Roullete.aceleration = 1

        // this.grau = 0
        // this.velocity = 6.58
        // this.aceleration = 1

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

// Ball.go()
// render.play(5)