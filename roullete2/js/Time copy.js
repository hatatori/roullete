function clock(n){
    let m = parseInt(n/60);
    let s = parseInt(n%60);
        m = ( m < 10 ) ? '0'+ m : m
    s = ( s < 10 ) ? '0'+ s : s
    return m+":"+s
}

let diference = {
    seconds(a,b) { return parseInt((b-a)/1000)                     },
    minutes(a,b) { return parseInt((b-a)/1000/60)        },
    hours(a,b)   { return parseInt((b-a)/1000/60/60)     },
    days(a,b)    { return parseInt((b-a)/1000/60/60/24)  },
}

function addSeconds(a,b) { a = a.setTime(a.getTime()+b*1000)         }
function addMinutes(a,b) { a = a.setTime(a.getTime()+b*1000*60)      }
function addHours(a,b)   { a = a.setTime(a.getTime()+b*1000*60*60)     }
function addDays(a,b)    { a = a.setTime(a.getTime()+b*1000*60*60*24)   }

function renew(){

    let new_date1 = new Date()
    let new_date2 = new Date()

    addMinutes(new_date1, maxT1)
    addMinutes(new_date2, maxT2)

    localStorage.removeItem('limitTimeCount')
    localStorage.removeItem('limitTime')

    localStorage.setItem('limitTimeCount', new_date1)
    localStorage.setItem('limitTime', new_date2)

}

function check(){
    
    let t1 = new Date()
    let t2 = new Date(localStorage.getItem('limitTimeCount'))
    let t3 = new Date(localStorage.getItem('limitTime'))

    if(diference.seconds(t1,t2) < 0)
        game.paused = true

    if(diference.seconds(t1,t3) < 0){
        game.paused = false
        renew()
    }

    
}

class GameTime{

    constructor(maxT1, maxT2){
        this.maxT1 = maxT1
        this.maxT2 = maxT2
    }

    renew(){

        let new_date1 = new Date()
        let new_date2 = new Date()
    
        addMinutes(new_date1, this.maxT1)
        addMinutes(new_date2, this.maxT2)
    
        localStorage.removeItem('limitTimeCount')
        localStorage.removeItem('limitTime')
    
        localStorage.setItem('limitTimeCount', new_date1)
        localStorage.setItem('limitTime', new_date2)
    
    }

    check(){
        
        this.t1 = new Date()
        this.t2 = new Date(localStorage.getItem('limitTimeCount'))
        this.t3 = new Date(localStorage.getItem('limitTime'))

        if(this.dif1() > 0)
            game.paused = false

        if(this.dif1() < 0)
            game.paused = true
    
        if(this.dif2() < 0){
            game.paused = true
            this.renew()
        }
    }

    dif1(){return diference.seconds(this.t1,this.t2)}
    dif2(){return diference.seconds(this.t1,this.t3)}

    time1(){ return (diference.seconds(this.t1,this.t2) < 0)  }
    time2(){ return (diference.seconds(this.t1,this.t3) < 0)  }

    clock(n){
        let m = parseInt(n/60);
        let s = parseInt(n%60);
        let h = parseInt(n/60/60);
        // let d = parseInt(n/60/24);

        s = ( s < 10 ) ? '0'+ s : s
        m = ( m < 10 ) ? '0'+ m : m%60
        h = ( s < 10 ) ? '0'+ h : h

        return h+":"+m+":"+s
    }

}

let gameTime = new GameTime(2, 2*60)
// gameTime.renew()
// gameTime.check()







