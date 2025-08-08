

export const getNowPlayingMovies=async(req,res)=>{
    try{
await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
    headers:{Authorization:`Bearer ${process.env.TMDB_API_KEY}`}
})
const movies=data.results;
res.json({succcess:true,movies:movies})
    }catch(error){
console.log(error);
res.json({succcess:false,message:error.message})

    }
}