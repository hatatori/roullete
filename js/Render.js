class Render{
    
    constructor(){
        this.coinsToRemove = []
        this.coinsAdded = []

        this.squares = [...document.querySelectorAll('[n]')]

        for(let el of this.squares){
            el.onclick=()=>{
                this.choiceBet(el.getAttribute('n')) 
                // user.setChoice(3)
                user.setChoice(el.getAttribute('n'))
                this.menuShow()
            }
        }
    }
    
    message_information(txt){
        let div = document.createElement('div')
        div.className = "message_information"
        div.innerHTML = txt
        document.body.appendChild(div)
        setTimeout(()=>{div.remove()},3*1000)
    }

    message_win(txt1='', txt2=''){
        
        let div = document.createElement('div')
        div.innerHTML = `
        <div class="alert fade-in">
            <div class="alert-in zoom-in">
                <p>${txt1}</p>
                <h1>${txt2}</h1>
            </div>
        </div>
        `
        document.body.appendChild(div)
        
        setTimeout(()=>{
            div.querySelector('.alert').classList.add('fade-out')
            div.querySelector('.alert-in').classList.add('zoom-out')
            div.onanimationend = () => div.remove()
        },3*1000)

    }

    rotateRandomPosition(){
        let r = parseInt(Math.random() * 360)
        div_roullete.style.translate = "0.5s"
        div_roullete.style.transform = `rotate(${r}deg)`
    }

    blink(group_name){
        let all = [...div_table.children]
        all.map(e=>e.style.opacity = 0.2)
        let reds = [...div_table.querySelectorAll('['+group_name+']')]
        reds.map(e=>e.style.removeProperty('opacity'))
    }

    blinkOut(){
        // let all = [...div_table.querySelectorAll("[n]")]
        let all = [...div_table.children]
        all.map(e=>e.style.removeProperty('opacity'))
    }

    historicAdd(n){
        let div = document.createElement('div')
        let class_color_num = 'ball-'+game.getColorNum(n)
        div.innerHTML = `<div class="ball ${class_color_num}">${n}</div>`
        historic.style.height = '70px'
        historic.style.transition = '0.5s'
        historic.style.padding = "10px"
        historic.insertBefore(div, historic.firstChild);
    }

    roll(n){
        this.showRoullete()
        this.rotateRandomPosition()

        Ball.go()
        Roullete.choice(n)
        Roullete.value = n

        setTimeout(()=>{ this.historicAdd(n) },5000)

        setTimeout(()=>{
            // this.hideRoullete()
            // this.menuHide()
        },5000)

        setTimeout(()=>{
            this.hideRoullete()
            this.coinClean()
            this.menuHide()

            user.add = 0
            user.earn = 0

            if(user.won()){
                user.add = user.bet * game.porcentage[user.group]
                user.earn = user.balance + user.bet + user.add
                user.setBalance(user.earn)
                render.message_win("Ganhou", this.toDollar(user.bet * game.porcentage[user.group]))
            }

            user.historic_choices.push(user.choice)
            user.historic_values.push(user.bet)
            user.historic_roullete.push(n)
            user.historic_earns.push(user.add)
            user.historic_victories.push(user.won())

            user.setBet(0)

        },8*1000)
    }

    play(n){
        
        if(gameTime.dif1 <= 0){
            this.message_information("Time limit over, go to next table")
            return false
        }

        if(user.getBet() > user.getBetMax()){
            this.message_information("Above the value exceeded, value max "+user.getBetMax())
            return false
        }

        if(this.coinsAdded.length == 0)
            this.message_information("Empty table, bet some value")
        else
            this.roll(n)
    }

    showRoullete(){
        roullete_group.classList.remove('none')
        
        roullete_group.classList.add('zoom-out-fade-in')
        roullete_group.classList.remove('zoom-in-fade-out')
    }

    hideRoullete(){
        // roullete_group.classList.remove('none')
        roullete_group.classList.remove('zoom-out-fade-in')
        roullete_group.classList.add('zoom-in-fade-out')
    }

    coinAdd(value){

        if( user.balance - value < 0 ){
            this.message_information("Insufficient Balance")
            return false
        }

        // if(coins_left.children.length == 15){
        //     render.message_information("Number max limit")
        //     return false
        // }

        user.setBet(user.bet + value)
        user.setBalance(user.balance - value)

        let coinA = document.querySelector("#coin"+value)
        let n = coins_left.children.length+1

        let img = new Image()
        img.src = coinA.src

        img.style.position = 'absolute'
        img.style.top    = coinA.offsetTop+'px'
        img.style.left   = coinA.offsetLeft+'px'
        // img.style.top    = coinA.y+'px'
        // img.style.left   = coinA.x+'px'
        img.style.transition = "0.3s"
        img.style.pointerEvents = 'none';

        coins_left.appendChild(img)

        img.style.top    = coin0.offsetTop+'px'
        img.style.left   = n*coin0.offsetLeft+'px'
        img.style.width  = coin0.offsetWidth+'px'
        img.style.height = coin0.offsetHeight+'px'
        img.style.pointerEvents = 'none'
        img.value = value
        
        // img.onclick = () => {
            // render.coinRemoveLast()
        // }

        

        img.addEventListener('click', ()=>{
            render.coinRemoveLast()
        })

        setTimeout(()=>{
            img.removeAttribute('style')
            img.style.marginLeft = -34+"px"
            img.style.width  = coin0.offsetWidth+'px'
            this.coinFinal()
        },1000)

        this.coinsAdded.push(coins_left.lastChild)
    }

    coinRemoveLast(){

        if(this.coinsAdded.length == 0)
            return false

        let last = this.coinsAdded.at(-1)

        user.setBalance(user.balance+last.value)
        user.setBet(user.bet-last.value)

        if(this.coinsAdded.length > 0){
            last.classList.add('zoom-in-fade-out')
            last.onanimationend = () => last.remove()
            Audios.select1()
            this.coinsAdded.pop()
        }
    }

    coinRemoveAll(){
        do{
            this.coinRemoveLast()
        }while(this.coinsAdded.length > 0)
    }

    coinClean(){
        do{
            if(this.coinsAdded.length == 0)
                return false

            let last = this.coinsAdded.at(-1)

            if(this.coinsAdded.length > 0){
                last.classList.add('zoom-in-fade-out')
                last.onanimationend = () => last.remove()
                this.coinsAdded.pop()
            }
        }while(this.coinsAdded.length > 0)
    }

    coinFinal(){
        coins_left.scrollTo(coins_left.scrollWidth,0)
    }

    showHide(div){
        div.classList.toggle('ty100')
        div.classList.toggle('ty0')
    }

    menu(){
        this.showHide(footer)
        div_table.classList.toggle('-ty20')
    }

    menuShow(){
        footer.classList.remove('ty100')
        footer.classList.add('ty0')
        div_table.style.transition='0.5s'

        div_table.classList.add('-ty10')
    }

    menuHide(){
        footer.classList.remove('ty0')
        footer.classList.add('ty100')
        div_table.classList.remove('-ty10')
    }

    choiceBet(n){
        n = parseInt(n)
        let color_class = ""

        color_class = "chosen chosen-"+game.getColorNum(n)

        div_chosen.classList.value = color_class
        div_chosen.innerHTML = n
    }

    toDollar(value){
        return `U$ ${value.toFixed(2).replace(/\./g,",")}`
    }

}