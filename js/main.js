let inp = document.querySelectorAll('input')
let pp = ''
pp = inp.forEach(element => {
    console.log((eval(element).id))
    (eval(element).id).addEventListener('focus',function(){
        console.log("mmmmm");
    });
    
});
