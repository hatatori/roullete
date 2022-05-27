class User extends Connection{
    constructor(name, id = 1){
        super()
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
user.setBalance(1000)
user.setBetMax(50)
// user.send()


/*

id                  id do usuário
name                Nome do usuário
balance             Quantidade de dinheiro em caixa
bet                 Valor da aposta na mesa
choice              Escolha do usuário
betsChoices         Valores escolhidos pelo jogador
betsValues          Valores das apostas
numbersRoullete     Números que deu na roleta
earns               Quantidade de ganhos
quantity            Quantidade de dados armazenados nos históricos
maxBet              Valor máximo que se pode apostar no dia
last_entry          Última vez que entrou no jogo (timestamp)
next_entry          Próximo tempo que vai poder apostar de novo (timestamp)

getNumbersRoullete()    Retorna histórico dos números que deram na roleta
getBetsChoices()        Retorna histórico escolhas do usuário
getBetsValues()         Retorna histórico dos valores apostados    
getBetMax()             Retorna o valor máximo que o usuário pode apostar
getBalance()            Retorna valor da quantidade de dinheiro em caixa
getEarns()              Retorna histórico dos ganhos
getBet()                Retorna o valor da aposta

setBetMax(n)        Seta o valor máximo da aposta
setBet()            Seta o valor da aposta da mesa
setBalance()        Seta o valor que o usuário tem
setChoice()         Seta a escolha
betLimit()          Retorna o valor máximo que o usuário pode apostar
won()               Retorna se o usuário ganhou ou não
toDollar(n)         Transforma o valor passado em dolar
get group()         Retorna o grupo referente da aposta do número dado

reset()             Atualiza os dados do usuário conectado
refresh()           Atualiza os dados da tela

*/
