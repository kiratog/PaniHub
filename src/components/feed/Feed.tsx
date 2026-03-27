import { useEffect, useRef, useState, useCallback} from "react";
import "./Feed.css"

interface FeedProps {
    category: string;
}

interface YTVideos{
  id: string;
  snippet: {
    publishedAt: string;
    channelTitle: string;
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  }
  contentDetails: {
    duration: string;
  }
}

const Feed = ({category}: FeedProps) => {
    const API_KEY = "AIzaSyAYEM0k8cp2vxvAdVVUeu_LGXy9LjHnX2g"

    const [videos, setVideos] = useState<YTVideos[]>([]);
    const [error, setError] = useState<string|null>(null)
    const [pageToken, setPageToken] = useState<string>("");
    const [totalFetch, setTotalFetch] = useState<number>(0);
    const [isFetching, setIsFetching] = useState(false);
    const isFetchingRef = useRef(false);
    const loaderRef = useRef(null);

    const FetchData = useCallback(async (isFirstLoad : boolean) => {
      if(isFetchingRef.current||(isFetching && totalFetch >= 100)) return;
            try{
              isFetchingRef.current = true;
              setIsFetching(true)
                const currentToken = isFirstLoad ? "" : pageToken;
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&type=video&videoCategoryId=27&maxResults=20&pageToken=${currentToken}&key=${API_KEY}`;
                const response = await fetch(url)
                const data = await response.json()
                const videoIds = data.items.map((item : any) => item.id.videoId).join(',');
                
                const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
                const detailsRes = await fetch(detailsUrl);
                const detailsData = await detailsRes.json();

                const filtered = detailsData.items.filter((video : any) => {
                  const duration = video.contentDetails.duration;
                  return duration.includes('M') || duration.includes('H')
                })

                if(isFirstLoad){
                  setVideos(filtered);
                  setTotalFetch(filtered.length);
                }
                else{
                  setVideos(prev => {
                    const existingIds = new Set(prev.map(v => v.id));
                    const uniqueNew = filtered.filter((v: any) => !existingIds.has(v.id));
                    return[...prev, ...uniqueNew];
                  })
                  setTotalFetch(prev => prev + data.items.length);
                }
                setPageToken(data.nextPageToken);
                
            }catch (error)
            {
              setError("Failed to load videos. Please try again later!. ")
            } finally{
              isFetchingRef.current = false;
              setIsFetching(false);
            }
        }, [category, pageToken, totalFetch])

        useEffect(() =>{
          setVideos([]);
          setPageToken('');
          setTotalFetch(0);
          FetchData(true);
        }, [category]);


        useEffect(() => {
          const observer= new IntersectionObserver((entries) => {
          if(entries[0].isIntersecting && !isFetchingRef.current && totalFetch < 100 && videos.length > 0){
            FetchData(false);
          }
         },{threshold: 0.1});

         if(loaderRef.current) {
          observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
      },[isFetching,totalFetch,videos.length])

    const formatViews = (views: string) => {
      const num = Number(views);
      if(num >= 100000) return (num/100000).toFixed(0) + 'M';
      if(num >= 1000) return (num/1000).toFixed(0) + 'K';

      return num
    }
    const formateDuration = (duration : string) => {
      return duration.replace('PT', '').replace('M',':').replace('S','').split(':').map(part => part.padStart(2, '0')).join(':');
    }

    console.log(videos)

    if (error) return <div className="error-message">{error}</div>

    return(
      <div className="feed">
        {videos.length == 0 && <div className="loader">Loading.....</div>}
        {videos.map((item) => (
          <a key={item.id} href={`https://www.youtube.com/watch?v=${item.id}`} className="video-card">
            <div className="thumbnail-container">
            <img className="thumbnail" src={item.snippet.thumbnails.medium.url} alt="Thumbnail" />
            <span className="duration">{formateDuration(item.contentDetails.duration)}</span>
            </div>
            <p className="description">{item.snippet.title}</p>
            <p className="stats">{formatViews(item.statistics.viewCount)} · {item.snippet.publishedAt.split('T')[0]}</p>
          </a>
        ))}
        <div ref={loaderRef} style={{height: "40px", margin: "20px"}}>
          {isFetching && totalFetch > 20 ? "Loading more videos...." : ""}
        </div>
      </div>
    )
}

export default Feed