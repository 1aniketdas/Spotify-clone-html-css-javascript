// console.log("Script loaded successfully.");
let currentAudio = new Audio();
let currentIndex = -1;
// const playmusic=(track)=>{
//     currentAudio.src=`songs/${track}.mp3`;
//     currentAudio.play();
//     playBtn.src="pause-svgrepo-com.svg";
//     document.querySelector(".songinfo").innerHTML=track;
//     document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";

// }

function formatTime(seconds)
{
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secs = secs < 10 ? "0" + secs : secs;

    return minutes + ":" + secs;
}

async function getSongs() {
    return [
        "songs/5 Seconds of Summer, Charlie Puth - Easier  Remix (Audio).mp3",
        "songs/24kGoldn, Justin Bieber, J Balvin, iann dior - Mood Remix - Official Lyric Video.mp3",
        "songs/Against the Tide.mp3",
        "songs/Alan Walker vs Coldplay - Hymn For The Weekend Remix.mp3",
        "songs/Ava Max - Kings & Queens Official Music Video.mp3",
        "songs/Ava Max - My Oh My (Official Video).mp3",
        "songs/Backstreet Boys - Everybody (Backstreet's Back) (Official HD Video).mp3",
        "songs/Blazing Heart EN ver. - Chrissy Costanza  HOYO-MiX Official English Lyrics Genshin Impact.mp3",
        "songs/Charlie Puth - Attention (Audio).mp3",
        "songs/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez) (Audio).mp3",
        "songs/Devil Trigger (FULL VERSION)  Metal Cover by RichaadEB (ft. Lollia & LittleVMills).mp3",
        "songs/Final Fantasy XIV - Endsinger Battle Theme With Hearts Aligned (feat. @KristinStarkey).mp3",
        "songs/Golden Official Lyric Video KPop Demon Hunters Sony Animation.mp3",
        "songs/In Stillness, Waiting - HOYO-MiX Official English Lyrics - Skirk Lament of a Ruined World ost.mp3",
        "songs/Jung Kook - Standing Next To You (Lyrics).mp3",
        "songs/Kishore Kumar - Dil Kya Kare.mp3",
        "songs/Lady Gaga - Bloody Mary.mp3",
        "songs/Linkin Park - In the End (Lyrics).mp3",
        "songs/NSYNC - Bye Bye Bye (Lyrics) Deadpool 3 Soundtrack.mp3",
        "songs/Oracle.mp3",
        "songs/Sabrina Carpenter - Espresso.mp3",
        "songs/Selena Gomez - Same Old Love (Official Audio).mp3",
        "songs/The Kid LAROI, Jung Kook, Central Cee - TOO MUCH  (Lyrics).mp3",
        "songs/TruE.mp3",
        "songs/With Glory I Shall Fall.mp3"
    ];
}




async function main()
{
    let songs= await getSongs();
    // console.log(songs);
    
    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (let song of songs)
    {
            // let li=document.createElement("li");
            // li.innerText=song.replaceAll("%20"," ").replaceAll(".mp3","").replaceAll("%5C","").replace("songs","");
            // songul.appendChild(li);

            let li=document.createElement("li");
            li.innerHTML=`<img class="invert" src="img/musiclogo.svg">
                            <div class="info">
                                <div>
                                ${song.replaceAll("%20"," ").replaceAll(".mp3","").replaceAll("%5C","").replace("songs/","")}
                                </div>
                                <div>artist name</div>
                                <!-- <h4>song name</h4>
                                <p>artist name</p> -->
                            </div>
                            <img class="invert" src="img/play-svgrepo-com.svg" alt="">`;
            songul.appendChild(li);

            
            // songul.innerHTML=songul.innerHTML+song;
            // or
            // songul.innerHTML=songul.innerHTML+"<li>"+song+"</li>";
            // or
            // songul.innerHTML=songul.innerHTML+`<li>${song}</li>`;
            
            // console.log("Updated songul.innerHTML:", songul.innerHTML, typeof songul.innerHTML);
    }


    // let audio=new Audio(songs[0]);
    // let audio1=new Audio(songs[1]);
    
    // document.addEventListener("click",()=>{
        // document.body.addEventListener("click",()=>{
            //     new Audio(songs[0]).play();
            // });
            
    // let btn=document.createElement("button");
    // btn.innerText="Play";
    // document.body.appendChild(btn);
    // btn.addEventListener("click",()=>{
    //     if(audio.paused)
    //     {
    //         audio.play();
    //         btn.innerText="Pause";
    //     }
    //     else
    //     {
    //         audio.pause();
    //         btn.innerText="Play";
    //     }
    // });

    // let btn1=document.createElement("button");
    // btn1.innerText="Play";
    // document.body.appendChild(btn1);
    // btn1.addEventListener("click",()=>{
    //     if(audio1.paused)
    //     {
    //         audio1.play();
    //         btn1.innerText="Pause";
    //     }
    //     else
    //     {
    //         audio1.pause();
    //         btn1.innerText="Play";
    //     }
    // });







    
    // console.log("Songs loaded and displayed.", document.querySelector(".songlist ul li .info").firstElementChild.innerHTML, songs[0]);
    // document.querySelector(".songlist ul li .info").firstElementChild.addEventListener("click",e=>{
    //     console.log("Clicked on song name.",e);
    // });

    // for (let index = 0; index < songs.length; index++) {
    //     const element = songs[index];
    //     let audio=new Audio(element);
    //     let playsong=document.querySelector(".songlist").getElementsByTagName("ul")[0].getElementsByTagName("li")[index].getElementsByTagName("img")[1];
    //     playsong.addEventListener("click",()=>{
    //         if(audio.paused)
    //         {
    //             audio.play();
    //             playsong.src="pause-svgrepo-com.svg";
    //         }
    //         else
    //         {
    //             audio.pause();
    //             playsong.src="play-svgrepo-com.svg";
    //         }
    //     });
    // }

    // for (let index = 0; index < songs.length; index++) {
    //     let playsong = document.querySelector(".songlist").getElementsByTagName("ul")[0].getElementsByTagName("li")[index].getElementsByTagName("img")[1];
    //     playsong.addEventListener("click", () => {

    //     // If clicking different song
    //         if (currentIndex !== index)
    //         {
    //             currentAudio.src = songs[index];
    //             currentAudio.play();
    //             currentIndex = index;

    //             // Reset all play icons
    //             let allIcons = document.querySelectorAll(".songlist ul li img:last-child");
    //             // let allIcons = document.querySelectorAll(".songlist ul li img.play-icon");
    //             allIcons.forEach(icon =>{
    //                 icon.src = "play-svgrepo-com.svg";
    //             });

    //             playsong.src = "pause-svgrepo-com.svg";
    //         }
    //         else
    //             // If clicking same song
    //         {
    //             // Same song clicked → toggle
    //             if (currentAudio.paused) 
    //             {
    //                 currentAudio.play();
    //                 playsong.src = "pause-svgrepo-com.svg";
    //             }
    //             else
    //             {
    //                 currentAudio.pause();
    //                 playsong.src = "play-svgrepo-com.svg";
    //             }
    //         }
    //     });
    // }

    
    Array.from(document.querySelectorAll(".songlist ul li img:last-child")).forEach((playIcon, index) => {
        playIcon.addEventListener("click", () => {
            if (currentIndex !== index)
                // If clicking different song
            {
                currentAudio.src = songs[index];
                currentAudio.play();
                currentIndex = index;
                // Reset all play icons
                document.querySelectorAll(".songlist ul li img:last-child").forEach(icon => {
                    icon.src = "img/play-svgrepo-com.svg";
                });

                playIcon.src = "img/pause-svgrepo-com.svg";
                
                playBtn.src="img/pause-svgrepo-com.svg";
                
                document.querySelector(".songinfo").innerText=songs[index].replaceAll("%20"," ").replaceAll(".mp3","").replaceAll("%5C","").replace("songs","");
                // document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";

            }
            else
                // If clicking same song
            {
                if (currentAudio.paused)
                {
                    currentAudio.play();
                    playIcon.src = "img/pause-svgrepo-com.svg";
                }
                else
                {
                    currentAudio.pause();
                    playIcon.src = "img/play-svgrepo-com.svg";
                }
            }
        });
    });

    // Array.from(document.querySelectorAll(".songlist li")).forEach((playIcon) => {
    //     playIcon.addEventListener("click", () => {
    //         console.log("Clicked on play icon for song:", playIcon.querySelector(".info").firstElementChild.innerHTML);
    //         playmusic(playIcon.querySelector(".info").firstElementChild.innerHTML.trim());
    //     });
    // });
    let playBtn=document.getElementById("play");
    let nextBtn=document.getElementById("next");
    let prevBtn=document.getElementById("previous");


    playBtn.addEventListener("click",()=>{
        if(currentAudio.paused)
        {
            currentAudio.play();
            playBtn.src="img/pause-svgrepo-com.svg";
        }
        else
        {
            currentAudio.pause();
            playBtn.src="img/play-svgrepo-com.svg";
        }
    });


    currentAudio.addEventListener("timeupdate",()=>{

        if (!isNaN(currentAudio.duration)) {
    
            let current = formatTime(currentAudio.currentTime);
            let total = formatTime(currentAudio.duration);
    
            document.querySelector(".songtime").innerText =
                current + " / " + total;
        }
        document.querySelector(".circle_progress").style.width = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
        // document.querySelector(".circle_progress").style.left = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let rect = e.currentTarget.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let percentage = offsetX / rect.width;
        // document.querySelector(".circle_progress").style.width = percentage * 100 + "%";
        currentAudio.currentTime = percentage * currentAudio.duration;
        // console.log( e.offsetX, rect, offsetX, percentage, currentAudio.duration, currentAudio.currentTime);
        // console.log(e, e.offsetX, e.offsetY, e.target, e.currentTarget.getBoundingClientRect());
    });


    document.querySelector(".menu").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0%";
        
    });
    document.querySelector(".close_menu").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%";
    });
    // currentAudio.addEventListener("timeupdate",()=>{
    //     let currentTime = currentAudio.currentTime;
    //     let duration = currentAudio.duration;
    //     let currentMinutes = Math.floor(currentTime / 60);
    //     let currentSeconds = Math.floor(currentTime % 60);
    //     let durationMinutes = Math.floor(duration / 60);
    //     let durationSeconds = Math.floor(duration % 60);
    //     if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    //     if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    //     document.querySelector(".songtime").innerHTML=` ${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
    // });


    // watch from yt from that same playlist, how codewithharry have implemented the next and previous functionality
    nextBtn.addEventListener("click",()=>{
        if(currentIndex < songs.length - 1)
        {
            currentAudio.src = songs[currentIndex + 1];
            currentAudio.play();
            currentIndex++;
            document.querySelectorAll(".songlist ul li img:last-child").forEach(icon => {
                icon.src = "img/play-svgrepo-com.svg";
            });
            document.querySelectorAll(".songlist ul li img:last-child")[currentIndex].src = "img/pause-svgrepo-com.svg";
            playBtn.src="img/pause-svgrepo-com.svg";
            document.querySelector(".songinfo").innerText=songs[currentIndex].replaceAll("%20"," ").replaceAll(".mp3","").replaceAll("%5C","").replace("songs","");
            //there is built-in URL decoder in JS which can be used as below instead of multiple replaceAll
            // document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";
        }
    });

    prevBtn.addEventListener("click",()=>{
        if(currentIndex > 0)
        {
            currentAudio.src = songs[currentIndex - 1];
            currentAudio.play();
            currentIndex--;
            document.querySelectorAll(".songlist ul li img:last-child").forEach(icon => {
                icon.src = "img/play-svgrepo-com.svg";
            });
            document.querySelectorAll(".songlist ul li img:last-child")[currentIndex].src = "img/pause-svgrepo-com.svg";
            playBtn.src="img/pause-svgrepo-com.svg";
            document.querySelector(".songinfo").innerText=songs[currentIndex].replaceAll("%20"," ").replaceAll(".mp3","").replaceAll("%5C","").replace("songs","");
            // document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";
        }
    });
    
    currentAudio.addEventListener("ended", () => {
        if(currentIndex < songs.length - 1){
            playSong(currentIndex + 1);
        }
    });
    

}
main();
