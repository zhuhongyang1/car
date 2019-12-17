export function debounce(func,wait,immediate = true){
    let timeout 
    return function(){
        let context = this;
        let args = arguments
        if(timeout) clearTimeout(timeout)
        if(immediate){
            var callNow = !timeout;
            timeout = setTimeout(()=>{
                timeout = null;

            },wait)
            if(callNow) func.apply(context,args)
        }else{
            timeout = setTimeout(function(){
                func.apply(context,args)
            },wait)
        }
    }
}