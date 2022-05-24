let render = new Render()
let user = new User()
user.balance = 500

setInterval(()=>{
    Roullete.animation()
    Ball.spin()
},1000/60)

// Audios.roll()
// Ball.go(5)
Roullete.choice(0)