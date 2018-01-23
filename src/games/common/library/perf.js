/**
 * Measure code performance by the execution time in between.
 * 
 * @author heinz97 <heinz.lxy@gmail.com>
 *
 * 
 * @example
 * perf();
 *
 * setTimeout(function(){
 * 	perf()
 * })
 *
 * => 2005
 */


var perf = (function(){
    var start;
    return function(){
      	if(!start){
          	start = new Date().getTime();
        }else{
            var elapsed = new Date().getTime()-start;
            start = undefined;
        	console.log(elapsed);
            return elapsed;
        }
    }
})();

export default perf;


// perf();
// setTimeout(()=>{
// 	perf()
// 	perf();
// 	setTimeout(()=>{
// 		perf()
// 	},2000)
// },1000)




