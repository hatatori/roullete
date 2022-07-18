class Render{
    
    constructor(){
        this.coinsToRemove = []
        this.coinsAdded = []

        this.btnplayactive = true

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
            <div class="alert-in zoom-in bg-fireworks" style="background: url(imgs/gif/fireworks.gif); background-size: cover;">
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

        let audio = new Audio('mp3/jewel.mp3')
        audio.play()
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

    error(){
        document.body.innerHTML = `
        <div class='screen'>
        <div class="absolute t-white top10 left10">Não pode jogar, sem o devido acesso</div>
        </div>
        <div id='button_play'></div>
        `
        return false
    }

    toMoney(num){

        function reverse(str){
            return str.split('').reverse().join('')
        }
        
        let n = num
        n = n.toString()


        let n1 = n.split(".")[0]
        let n2 = n.split(".")[1]
        
        n1 = reverse(n1)
        n1 = n1.match(/...|..|./g).reverse().join('.')
        n1 = n1.split('.').map(e=>reverse(e)).join('.')
        
        let n3 = (n2 == undefined) ? n1+",00" : n1+","+n2
        
        return n3
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

    historicplayerAdd(color, choice, value, valuerol, profit){
        
        let simbol = (color == 'GREEN') ? '✔️' : '❌'
        let div = document.createElement('div')
        div.className = 'item'
        div.innerHTML = `
            <div class="flex i-center gap-1em">
                <span class="p-win">${simbol}</span>
                <div>
                    <div class="p-choice">${choice}</div>
                    <div class="p-val">Valor: R$ ${this.toMoney(value)}</div>
                    <div class="p-rol">Resultado: ${valuerol}</div>
                </div>
            </div>
            <p class="p-val ${color}">R$ ${this.toMoney(profit)}</p>
        `
        multiple.appendChild(div)
    }

    roll(n){

        this.btnplayactive = true

        this.showRoullete()
        this.rotateRandomPosition()

        Ball.go()
        Roullete.choice(n)
        Roullete.value = n

        setTimeout(()=>{ 
            this.historicAdd(n) 
        },5000)

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

            user.profit = (user.bet * -1)

            if(user.won()){
                // user.add = user.bet * game.porcentage[user.group]
                // user.earn = user.balance + user.bet + user.add
                user.setBalance(user.balance + user.bet + user.last.profit)
                // render.message_win("Parabéns", "Você ganhou R$ "+this.toDollar(user.bet * game.porcentage[user.group]))
                render.message_win("Parabéns", "Você ganhou R$ "+this.toMoney(user.last.profit + user.bet))
                // user.profit = user.bet * game.porcentage[user.group]
            }

            // user.profit = user.profit.toFixed(2).replace('.',',')
            // render.historicplayerAdd(user.last.cor, user.last.group, user.last.valor, user.last.rou, user.profit)
            
            // user.setBetMaxTemp(user.maxBet)
            user.setBet(0)
            
            button_play.style.pointerEvents = 'auto'

        },8*1000)
    }

    play(n){
        if(this.checkRoll())
            this.roll(n)
        
        
    }

    checkButtonPlay(){
        if(this.coinsAdded.length > 0 && this.btnplayactive){
            button_play.style.pointerEvents = 'auto'
            button_play.style.opacity = 1
        }else{
            button_play.style.pointerEvents = 'none'
            button_play.style.opacity = 0.1
        }
    }

    checkRoll(){
        
        if(user.getBet() > user.getBetMax()){
            this.message_information("Excedeu o valor, valor máximo "+user.getBetMax())
            return false
        }

        if(this.coinsAdded.length == 0){
            this.message_information("Aposta vazia, lance algum valor")
            return false
        }

        return true
    }

    showRoullete(){
        roullete_group.classList.remove('none')
        
        roullete_group.classList.add('zoom-out-fade-in')
        roullete_group.classList.remove('zoom-in-fade-out')

        render.btnplayactive = true
    }

    hideRoullete(){
        // roullete_group.classList.remove('none')
        roullete_group.classList.remove('zoom-out-fade-in')
        roullete_group.classList.add('zoom-in-fade-out')

        render.btnplayactive = true
    }

    coinAdd(value){

        if( user.balance - value < 0 ){
            this.message_information("Saldo insuficiente")
            return false
        }

        // if(coins_left.children.length == 15){
        //     render.message_information("Number max limit")
        //     return false
        // }

        // user.setBet(user.bet + value)
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

        user.setMaxBet(user.maxBetTemp - user.bet)

        render.btnplayactive = true

    }

    coinRemoveLast(){

        
        // user.setMaxBet(user.maxBet+user.bet)
        

        render.btnplayactive = true

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

        user.setMaxBet(user.maxBetTemp-user.bet)
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

    menuhistoric(){

        menu_historic_player.onclick=function(e){
            e.stopPropagation()
        }

        if(!menu_historic.state)
            menu_historic.state = false
        
        menu_historic.state = !menu_historic.state


        if(menu_historic.state){
            menu_historic.style.opacity = 1
            menu_historic_player.style.transform = 'translateX(0%)'
            menu_historic.style.pointerEvents = 'auto'
        }
        
        if(!menu_historic.state){
            menu_historic.style.opacity = 0
            menu_historic_player.style.transform = 'translateX(-100%)'
            menu_historic.style.pointerEvents = 'none'
        }

        

    }

    choiceBet(n){
        n = parseInt(n)
        let color_class = ""

        color_class = "chosen chosen-"+game.getColorNum(n)

        div_chosen.classList.value = color_class
        div_chosen.innerHTML = n
    }

    toDollar(value){
        return `R$ ${value.toFixed(2).replace(/\./g,",")}`
    }

}