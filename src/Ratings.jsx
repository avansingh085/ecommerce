import Rating from './Rating.jsx';
function Ratings(props)
{
    //console.log(props);
    return(
        <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        {<Rating flag={parseInt((props.data.rate))>0}/>}
        {<Rating flag={parseInt((props.data.rate))>1}/>}
        {<Rating flag={parseInt((props.data.rate))>2}/>}
        {<Rating flag={parseInt((props.data.rate))>3}/>}
        {<Rating flag={parseInt((props.data.rate))>4}/>}
       <span className="text-emerald-400"> {props.data.count}</span>
       </div>
    )
}
export default Ratings;