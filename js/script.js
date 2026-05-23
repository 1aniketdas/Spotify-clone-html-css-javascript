// console.log("Script loaded successfully.");
let currentAudio = new Audio();
let currentIndex = -1;
let songs = [];
// const playmusic=(track)=>{
//     currentAudio.src=`songs/${track}.mp3`;
//     currentAudio.play();
//     playBtn.src="pause-svgrepo-com.svg";
//     document.querySelector(".songinfo").innerHTML=track;
//     document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";

// }











function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secs = secs < 10 ? "0" + secs : secs;

    return minutes + ":" + secs;
}






async function getSongs(folder) {

    let response =await fetch(`${folder}/songs.json`);

    let songNames = await response.json();

    let songs = [];

    for(let song of songNames)
    {
        songs.push(`${folder}/${song}`);
    }

    return songs;
}







async function displayAlbums() {

    let response = await fetch("albums.json");

    let albums = await response.json();

    let card_container =document.querySelector(".card-container");

    for(let album of albums)
    {
        let metadata =await fetch(`songs/${album.folder}/info.json`);

        let metaresponse = await metadata.json();

        card_container.innerHTML += `

            <div data-folder="${album.folder}"
            class="card">

                <img class="play"
                src="img/green-play-button.svg">

                <img class="cardimg"
                src="songs/${album.folder}/cover.jfif">

                <h3>${metaresponse.title}</h3>

            </div>
        `;
    }
}

function updatePlaybarSong(songName)
{
    let playbarText =
    document.querySelector(".playbar-scroll span");

    playbarText.innerText = songName;

    playbarText.classList.remove("scroll-active");

    if(playbarText.scrollWidth >
    playbarText.parentElement.clientWidth)
    {
        playbarText.classList.add("scroll-active");
    }
}

async function main() {

    // let songs= await getSongs("songs/ncs");
    // let songs= await getSongs("songs/cs");
    // let songs= await getSongs("songs");
    // await getSongs("songs/ncs");
    // console.log(songs);
    await displayAlbums();
    // ----------------------------------------------------------------------------------------------------------------
            let playBtn = document.getElementById("play");
            let nextBtn = document.getElementById("next");
            let prevBtn = document.getElementById("previous");

            // watch from yt from that same playlist, how codewithharry have implemented the next and previous functionality
            playBtn.addEventListener("click", () => {
                if (currentAudio.paused) {
                    currentAudio.play();
                    playBtn.src = "img/pause-svgrepo-com.svg";
                }
                else {
                    currentAudio.pause();
                    playBtn.src = "img/play-svgrepo-com.svg";
                }
            });
            nextBtn.addEventListener("click", () => {
                if (currentIndex < songs.length - 1) {
                    currentAudio.src = songs[currentIndex + 1];
                    currentAudio.play();
                    currentIndex++;
                    document.querySelectorAll(".songlist ul li img:last-child").forEach(icon => {
                        icon.src = "img/play-svgrepo-com.svg";
                    });
                    document.querySelectorAll(".songlist ul li img:last-child")[currentIndex].src = "img/pause-svgrepo-com.svg";
                    playBtn.src = "img/pause-svgrepo-com.svg";
                    // document.querySelector(".songinfo").innerText = songs[currentIndex].replaceAll("%20", " ").replaceAll(".mp3", "").replaceAll("%5C", "").replace("songs", "");
                    // document.querySelector(".songinfo").innerText = decodeURIComponent(songs[currentIndex]).split("\\").slice(-1)[0].replace(".mp3", "");
                    // document.querySelector(".songinfo").innerText = songs[currentIndex].split("/").pop().replace(".mp3", "");

                    let songName = songs[currentIndex].split("/").pop().replace(".mp3", "");
                    updatePlaybarSong(songName);
                    //there is built-in URL decoder in JS which can be used as below instead of multiple replaceAll
                    // document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";
                }
            });

            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentAudio.src = songs[currentIndex - 1];
                    currentAudio.play();
                    currentIndex--;
                    document.querySelectorAll(".songlist ul li img:last-child").forEach(icon => {
                        icon.src = "img/play-svgrepo-com.svg";
                    });
                    document.querySelectorAll(".songlist ul li img:last-child")[currentIndex].src = "img/pause-svgrepo-com.svg";
                    playBtn.src = "img/pause-svgrepo-com.svg";
                    // document.querySelector(".songinfo").innerText = songs[currentIndex].replaceAll("%20", " ").replaceAll(".mp3", "").replaceAll("%5C", "").replace("songs", "");
                    // document.querySelector(".songinfo").innerText = decodeURIComponent(songs[currentIndex]).split("\\").slice(-1)[0].replace(".mp3", "");
                    // document.querySelector(".songinfo").innerText = songs[currentIndex].split("/").pop().replace(".mp3", "");

                    let songName = songs[currentIndex].split("/").pop().replace(".mp3", "");
                    updatePlaybarSong(songName);

                    // document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";
                }
            });


            
            document.querySelector(".menu").addEventListener("click", () => {
                document.querySelector(".left").style.left = "0%";

            });
            document.querySelector(".close_menu").addEventListener("click", () => {
                document.querySelector(".left").style.left = "-100%";
            });

            // watch from yt from that same playlist, how codewithharry have implemented the volume mute functionality
            // document.querySelector(".volume>img").addEventListener("click", () => {
            document.querySelector(".volume img").addEventListener("click", () => {
                if (currentAudio.muted) {
                    currentAudio.muted = false;
                    document.querySelector(".volume img").src = "img/volume-loud-svgrepo-com.svg";
                    document.querySelector(".volume input").value = 10;
                }
                else {
                    currentAudio.muted = true;
                    document.querySelector(".volume img").src = "img/volume-cross-svgrepo-com.svg";
                    document.querySelector(".volume input").value = 0;
                }
            });


    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async e => {
            // songs = await getSongs("songs/" + card.getAttribute("data-folder"));
            // songs = await getSongs("songs/" + e.currentTarget.dataset.folder);

            // console.log(e);
            // console.log(e.currentTarget);
            // console.log(e.currentTarget.dataset);
            // console.log(e.currentTarget.dataset.folder);

            songs= await getSongs(`songs/${e.currentTarget.dataset.folder}`);
            // let songs=await getSongs(`songs/${e.currentTarget.dataset.folder}`);
            // console.log(songs);
            // console.log("Card clicked with folder:", card.getAttribute("data-folder"));            
            // You can then use this folder name to fetch songs or perform any other action

            
            currentIndex = -1;
            currentAudio.pause();
            document.getElementById("play").src = "img/play-svgrepo-com.svg";



            let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
            songul.innerHTML = "";
            for (let song of songs) {
                // let li=document.createElement("li");
                // li.innerText=song.replaceAll("%20"," ").replaceAll(".mp3","").replaceAll("%5C","").replace("songs","");
                // songul.appendChild(li);
                // ${song.replaceAll("%20", " ").replaceAll(".mp3", "").replaceAll("%5C", "").replace("songs", "")}
                let li = document.createElement("li");
                li.innerHTML = `<img class="invert" src="img/musiclogo.svg">
                            <div class="info">
                                <!--<div>${decodeURIComponent(song).split("\\").slice(-1)[0].replace(".mp3", "")}</div>-->

                                <div class="songname-scroll">
                                <span>${song.split("/").pop().replace(".mp3","")}</span>
                                </div>
                                <!--<div>artist name</div>-->
                                <!-- <h4>song name</h4>
                                <p>artist name</p> -->
                            </div>
                            <img class="invert" src="img/play-svgrepo-com.svg" alt="">`;
                songul.appendChild(li);

                let songText = li.querySelector(".songname-scroll span");
                songText.classList.remove("scroll-active");
                if(songText.scrollWidth > songText.parentElement.clientWidth)
                {
                    songText.classList.add("scroll-active");
                }

                // songul.innerHTML=songul.innerHTML+song;
                // or
                // songul.innerHTML=songul.innerHTML+"<li>"+song+"</li>";
                // or
                // songul.innerHTML=songul.innerHTML+`<li>${song}</li>`;

                // console.log("Updated songul.innerHTML:", songul.innerHTML, typeof songul.innerHTML);
            }
            // ----------------------------------------------------------------------------------------------------------------


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

                        playBtn.src = "img/pause-svgrepo-com.svg";

                        // document.querySelector(".songinfo").innerText = songs[index].replaceAll("%20", " ").replaceAll(".mp3", "").replaceAll("%5C", "").replace("songs", "");
                        // document.querySelector(".songinfo").innerText = decodeURIComponent(songs[index]).split("\\").slice(-1)[0].replace(".mp3", "");
                        // document.querySelector(".songinfo").innerText = songs[index].split("/").pop().replace(".mp3","");
                        let songName = songs[index].split("/").pop().replace(".mp3", "");
                        updatePlaybarSong(songName);
                        // document.querySelector(".songtime").innerHTML=" 0:00 / 00:00";

                    }
                    else
                    // If clicking same song
                    {
                        if (currentAudio.paused) {
                            currentAudio.play();
                            playIcon.src = "img/pause-svgrepo-com.svg";
                        }
                        else {
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



            currentAudio.addEventListener("timeupdate", () => {

                if (!isNaN(currentAudio.duration)) {

                    let current = formatTime(currentAudio.currentTime);
                    let total = formatTime(currentAudio.duration);

                    document.querySelector(".songtime").innerText =
                        current + " / " + total;
                }
                document.querySelector(".circle_progress").style.width = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
                // document.querySelector(".circle_progress").style.left = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
            });

            document.querySelector(".seekbar").addEventListener("click", (e) => {
                let rect = e.currentTarget.getBoundingClientRect();
                let offsetX = e.clientX - rect.left;
                let percentage = offsetX / rect.width;
                // document.querySelector(".circle_progress").style.width = percentage * 100 + "%";
                currentAudio.currentTime = percentage * currentAudio.duration;
                // console.log( e.offsetX, rect, offsetX, percentage, currentAudio.duration, currentAudio.currentTime);
                // console.log(e, e.offsetX, e.offsetY, e.target, e.currentTarget.getBoundingClientRect());
            });





            // watch from yt from that same playlist, how codewithharry have implemented the next and previous functionality
            

            currentAudio.addEventListener("ended", () => {
                if (currentIndex < songs.length - 1) {
                    playSong(currentIndex + 1);
                }
            });

            // document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {

            // });
            document.querySelector(".volume input").addEventListener("change", (e) => {
                // console.log(e.target.value, typeof e.target.value, parseInt(e.target.value), typeof parseInt(e.target.value));
                currentAudio.volume = parseInt(e.target.value) / 100;
                // Assuming the range input gives a value between 0 and 100
            });




        });
    });


            


}
main();