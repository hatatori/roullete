Object.prototype.ret = function(ar){
    let o = {}
    for(a of ar){
        b = Object.keys(user).indexOf(a)
        c = Object.entries(user)[b]
        o[c[0]] = c[1]
    }
    return o
}

// user.ret(['id','name'])
// {id: 2, name: 'ana'}