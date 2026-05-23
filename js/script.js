
let currentAudio = new Audio();
let currentIndex = -1;
let songs = [];





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


    await displayAlbums();
    // ----------------------------------------------------------------------------------------------------------------
            let playBtn = document.getElementById("play");
            let nextBtn = document.getElementById("next");
            let prevBtn = document.getElementById("previous");

            // watch from yt from that same playlist, how he have implemented the next and previous functionality
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


                    let songName = songs[currentIndex].split("/").pop().replace(".mp3", "");
                    updatePlaybarSong(songName);

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


                    let songName = songs[currentIndex].split("/").pop().replace(".mp3", "");
                    updatePlaybarSong(songName);


                }
            });


            
            document.querySelector(".menu").addEventListener("click", () => {
                document.querySelector(".left").style.left = "0%";

            });
            document.querySelector(".close_menu").addEventListener("click", () => {
                document.querySelector(".left").style.left = "-100%";
            });


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


            songs= await getSongs(`songs/${e.currentTarget.dataset.folder}`);


            
            currentIndex = -1;
            currentAudio.pause();
            document.getElementById("play").src = "img/play-svgrepo-com.svg";



            let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
            songul.innerHTML = "";
            for (let song of songs) {

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

            }
            // ----------------------------------------------------------------------------------------------------------------


            

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


                        let songName = songs[index].split("/").pop().replace(".mp3", "");
                        updatePlaybarSong(songName);


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





            currentAudio.addEventListener("timeupdate", () => {

                if (!isNaN(currentAudio.duration)) {

                    let current = formatTime(currentAudio.currentTime);
                    let total = formatTime(currentAudio.duration);

                    document.querySelector(".songtime").innerText =
                        current + " / " + total;
                }
                document.querySelector(".circle_progress").style.width = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";

            });

            document.querySelector(".seekbar").addEventListener("click", (e) => {
                let rect = e.currentTarget.getBoundingClientRect();
                let offsetX = e.clientX - rect.left;
                let percentage = offsetX / rect.width;
                currentAudio.currentTime = percentage * currentAudio.duration;

            });





            // watch from yt from that same playlist, how codewithharry have implemented the next and previous functionality
            

            currentAudio.addEventListener("ended", () => {
                if (currentIndex < songs.length - 1) {
                    playSong(currentIndex + 1);
                }
            });



            document.querySelector(".volume input").addEventListener("change", (e) => {

                currentAudio.volume = parseInt(e.target.value) / 100;
                // Assuming the range input gives a value between 0 and 100
            });




        });
    });

}
main();