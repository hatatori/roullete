class User {

    constructor(name, balance = 0){
        this.id = null
        this.name = name
        this.balance = balance
        this.bet = 0
        this.choice = 0
        this.betsChoices = []
        this.betsValues = []
        this.numbersRoullete = []
        this.earns = []
        this.quantity = 5
        this.maxBet = 0
    }
   
    getNumbersRoullete(){
        return this.numbersRoullete.slice(-this.quantity)
    }

    getBetsChoices(){
        return this.betsChoices.slice(-this.quantity)
    }
   
    getBetsValues(){
        return this.betsValues.slice(-this.quantity)
    }

    getBalance(){
        return this.balance
    }

    getEarns(){
        return this.earns.slice(-this.quantity)
    }

    betLimit(){
        return user.getBalance()*5/100
    }

    getBet(){
        return this.bet
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

    won(){
        return Roullete.value == this.choice || game.choice[this.group].includes(Roullete.value)
    }

    toDollar(v){
        return `U$ ${Number(v).toFixed(2).replace(/\./g,",")}`
    }

    setBetMax(){
        this.maxBet = this.balance*5/100
    }

    getBetMax(){
        return this.maxBet
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