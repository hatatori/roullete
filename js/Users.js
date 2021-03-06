class User extends Connection{
    constructor(name, id = 1){
        super()
        this.id = id
        this.name = name
        this.balance = 0
        this.bet = 0
        this.choice = 1
        this.betsChoices = []
        this.historic_values = []
        this.historic_earns = []
        this.numbersRoullete = []
        this.quantity = 5
        this.maxBet = 0
        this.maxBetTemp = 0
        this.last_entry = 0
        this.next_entry = 0
    }

    setName(name){
        this.name = name
        div_historic_name.innerHTML = name
    }

    setUserName(username){
        this.username = username
        div_historic_user.innerHTML = username
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
        return this.historic_values.slice(-this.quantity)
    }

    getBalance(){
        return this.balance
    }

    getEarns(){
        return this.historic_earns.slice(-this.quantity)
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
        return `R$ ${Number(v).toFixed(2).replace(/\./g,",")}`
    }

    getBetMax(){
        return this.maxBet
    }

    setBetMax(maxBet){
        this.maxBet = maxBet
        this.refresh()
    }

    setBetMaxTemp(maxBetTemp){
        this.maxBetTemp = maxBetTemp
        this.refresh()
    }

    setMaxBet(maxBet){
        this.maxBet = maxBet
        this.refresh()
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

    refresh(){
        div_balance.innerHTML = "R$ "+this.toMoney(this.balance)
        div_bet.innerHTML    = "R$ "+this.toMoney(this.bet)
        div_max_day.innerHTML = "R$ "+user.toMoney(user.getBetMax())

        div_chosen.innerHTML = this.choice
        if(this.choice == 'to18') div_chosen.innerHTML = '1to18';
        if(this.choice == 'to36') div_chosen.innerHTML = '1to36';
    }

    info(){

        this.historic_choices   = this.historic_choices.slice(-this.quantity)
        this.historic_earns     = this.historic_earns.slice(-this.quantity)
        this.historic_roullete  = this.historic_roullete.slice(-this.quantity)
        this.historic_values    = this.historic_values.slice(-this.quantity)
        this.historic_victories = this.historic_victories.slice(-this.quantity)

        return this.ret(
            [
                'id', 
                'balance', 
                'historic_choices', 
                'historic_earns', 
                'historic_roullete', 
                'historic_values', 
                'historic_victories', 
                'maxBet', 
                'name'
            ]
            )
    }
}

let user = new User()
// user.connect(2)

// user.setBalance(10000)
// user.setBetMax(500)
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
