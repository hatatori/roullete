class User {

    constructor(){
        this.balance = 0
        this.bet = 0
        this.choice = 0
    }

    setBet(value){ 
        this.bet = value
        this.refresh()
    }

    setBalance(value){ 
        this.balance = value
        this.refresh()
    }

    setChoice(value){ 
        this.choice = value 
        this.refresh()
    }

    toDollar(value){
        return `U$ ${value.toFixed(2).replace(/\./g,",")}`
    }

    get group(){

        if(this.choice == 0)
            return 'zero'

        if(Number(this.choice))
            return 'empty'

        if(!isNaN(Number(this.choice)))
            return 'number'
            
        return this.choice

    }

    refresh(){
        div_balance.innerHTML = this.toDollar(this.balance)
        div_bet.innerHTML    = this.toDollar(this.bet)

        div_chosen.innerHTML = this.choice

        if(this.choice == 'to18') div_chosen.innerHTML = '1to18';
        if(this.choice == 'to36') div_chosen.innerHTML = '1to36';

    }
}