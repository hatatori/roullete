class User{
    constructor(name, id = 1){
        this.id = id
        this.name = name
        this.balance = 0
        this.bet = 0
        this.choice = 0
        this.betsChoices = []
        this.betsValues = []
        this.numbersRoullete = []
        this.earns = []
        this.quantity = 5
        this.maxBet = 0
        this.won = false
        this.last_entry = 0
        this.next_entry = 0
    }

    reset(){
        for(let i of Object.keys(this.user)){
            this[i] = this.user[i]
        }
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

    win(){
        return Roullete.value == this.choice || game.choice[this.group].includes(Roullete.value)
    }

    won(){
        return Roullete.value == this.choice || game.choice[this.group].includes(Roullete.value)
    }

    toDollar(v){
        return `U$ ${Number(v).toFixed(2).replace(/\./g,",")}`
    }

    getBetMax(){
        return this.maxBet
    }

    setBetMax(){
        this.maxBet = this.balance*5/100
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

let user = new User()
// user.connect(2)
user.setBalance(10000)
user.setBetMax(50)
// user.send()


/*

id                  id do usu??rio
name                Nome do usu??rio
balance             Quantidade de dinheiro em caixa
bet                 Valor da aposta na mesa
choice              Escolha do usu??rio
betsChoices         Valores escolhidos pelo jogador
betsValues          Valores das apostas
numbersRoullete     N??meros que deu na roleta
earns               Quantidade de ganhos
quantity            Quantidade de dados armazenados nos hist??ricos
maxBet              Valor m??ximo que se pode apostar no dia
last_entry          ??ltima vez que entrou no jogo (timestamp)
next_entry          Pr??ximo tempo que vai poder apostar de novo (timestamp)

getNumbersRoullete()    Retorna hist??rico dos n??meros que deram na roleta
getBetsChoices()        Retorna hist??rico escolhas do usu??rio
getBetsValues()         Retorna hist??rico dos valores apostados    
getBetMax()             Retorna o valor m??ximo que o usu??rio pode apostar
getBalance()            Retorna valor da quantidade de dinheiro em caixa
getEarns()              Retorna hist??rico dos ganhos
getBet()                Retorna o valor da aposta

setBetMax(n)        Seta o valor m??ximo da aposta
setBet()            Seta o valor da aposta da mesa
setBalance()        Seta o valor que o usu??rio tem
setChoice()         Seta a escolha
betLimit()          Retorna o valor m??ximo que o usu??rio pode apostar
won()               Retorna se o usu??rio ganhou ou n??o
toDollar(n)         Transforma o valor passado em dolar
get group()         Retorna o grupo referente da aposta do n??mero dado

reset()             Atualiza os dados do usu??rio conectado
refresh()           Atualiza os dados da tela

*/
