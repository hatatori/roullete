let render = new Render()
// let user = new User()

// user.setBalance(10000)
// user.setBetMax()

// let gameTime = new GameTime(10, 60 * 60 * 2 )



setInterval(()=>{
//     Roullete.animation()
//     Ball.spin()
    render.checkButtonPlay()
},1000/60)

// window.requestAnimationFrame(Roullete.animation())
// window.requestAnimationFrame(Ball.spin())
// window.requestAnimationFrame(Roullete.animation())

// Roullete.choice(0)

// setInterval( () => { gameTime.check() } , 1000)


// Ball.r = 1.35
// Ball.deg(0)
// Ball.degree = 0
// Ball.factor = 0.00001
// Ball.dec = 10
// Ball.aceleration = 1
// Ball.velocity = 0.8074


function loop(){
    Roullete.animation()
    Ball.spin()
    window.requestAnimationFrame(loop)
}

loop()


