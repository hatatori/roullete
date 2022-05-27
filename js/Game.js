class Game extends Connection{
    constructor() {
        
        super()

        this.choice = {}
        this.choice.empty    = []
        this.choice.zero     = [0]
        this.choice.to18     = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        this.choice.to36     = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36]
        this.choice.dozen1   = [1,2,3,4,5,6,7,8,9,10,11,12]
        this.choice.dozen2   = [13,14,15,16,17,18,19,20,21,22,23,24]
        this.choice.dozen3   = [25,26,27,28,29,30,31,32,33,34,35,36]
        this.choice.col1     = [1,4,7,10,13,16,19,22,25,28,31,34]
        this.choice.col2     = [2,5,8,11,14,17,20,23,26,29,32,35]
        this.choice.col3     = [3,6,9,12,15,18,21,24,27,30,33,36]
        this.choice.red      = [1, 12, 14, 16, 18, 19, 21, 23, 25, 27, 3, 30, 32, 34, 36, 5, 7, 9]
        this.choice.black    = [10, 11, 13, 15, 17, 2, 20, 22, 24, 26, 28, 29, 31, 33, 35, 4, 6, 8]
        this.choice.even     = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36] // par
        this.choice.odd      = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]  // impar

        this.porcentage          = {}
        this.porcentage.zero     = 4
        this.porcentage.to18     = 1.2
        this.porcentage.to36     = 1.2
        this.porcentage.dozen1   = 1.3
        this.porcentage.dozen2   = 1.3
        this.porcentage.dozen3   = 1.3
        this.porcentage.col1     = 1.4
        this.porcentage.col2     = 1.4
        this.porcentage.col3     = 1.4
        this.porcentage.red      = 1.1
        this.porcentage.black    = 1.1
        this.porcentage.even     = 1.2
        this.porcentage.odd      = 1.2
        this.porcentage.number   = 1
    }
    

    getGroupNumber(n){
        let group_number = []
        for(let i of Object.keys(this.choice)){
            if(this.choice[i].includes(n))
                group_number.push(i)
        }
        return group_number
    }

    getColorNum(n){
        if(this.choice.red.includes(n)) return 'red';
        if(this.choice.black.includes(n)) return 'black';
        if(this.choice.zero.includes(n)) return 'green';
        else return 'green'
    }

    groupEarn(){
        let Earn = []
        Earn.push(this.ball)
        for(let i of Object.keys(this.choice)){
            if(this.choice[i].includes(this.ball))
                Earn.push(i)
        }

        return Earn
    }

    bet(n){
        this.bet = n
    }

    betBack(){
        return this.bet.filter(e=>this.groupEarn().includes(e.local))
    }

    betBackCash(){
        let EarnWithReceive = this.betBack().map(e=>{
            if(typeof(e.local) == 'string'){
                e.receive = e.payd * this.porcentage[e.local]
                return e
            }
            if(e.local == 0){
                e.receive = e.payd * this.porcentage.zero
                return e
            }
            e.receive = e.payd * this.porcentage.number
            return e
        })
        
        return EarnWithReceive
    }

    totalGain(){
        let soma = 0
        this.betBackCash().map(e=> soma += e.receive)
        return soma
    }
}

let game = new Game()
game.setPorcentage()
// connection = new Connection()
// connection.connect(1)