let render = new Render()
// let user = new User()

// user.setBalance(10000)
// user.setBetMax()

// let gameTime = new GameTime(10, 60 * 60 * 2 )

setInterval(()=>{
    Roullete.animation()
    Ball.spin()

    
    if( document.body.offsetWidth > document.body.offsetHeight ){
        rotate_mobile.style.display='none'
        div_screen.removeAttribute('style')
    }else{
        rotate_mobile.removeAttribute('style')
        div_screen.style.display='none'
    }


},1000/60)

// Roullete.choice(0)

setInterval( () => { gameTime.check() } , 1000)