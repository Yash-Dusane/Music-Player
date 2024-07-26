console.log('Lets Write');

// Array of songs (you can replace with your actual songs)

let currsong = new Audio();
let currfolder;
let foldarr;

const playmusic = (sng, pus = false) => {

    currsong.src = "songs/" + sng;
    if(!pus){
        currsong.play();
        masterplay.src = "svgs/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = sng.split("/").slice(-1)[0].split(".mp3")[0];
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

function formatTime(seconds) {
    // Calculate whole minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);

    // Ensure seconds and minutes are formatted to always have two digits
    var formattedMinutes = String(minutes).padStart(2, '0');
    var formattedSeconds = String(seconds).padStart(2, '0');

    // Return as string in "mm:ss" format
    return formattedMinutes + ":" + formattedSeconds;
}


function getFilesInFolder(paths, folderName) {
    return paths
        .filter(path => {
            // Split the path by '/'
            const parts = path.split('/');
            // Check if the first part (folder name) matches folderName
            return parts[0] === folderName;
        })
        .map(path => {
            // Split the path by '/' again to get the file name
            const parts = path.split('/');
            // Return the file name (last part)
            return parts[1];
        });
}

function getUniqueFolders(paths) {
    const uniqueFolders = new Set();
    
    paths.forEach(path => {
        const folderName = path.split('/')[0]; // Get the folder name
        uniqueFolders.add(folderName); // Add to set (automatically handles uniqueness)
    });
    
    return Array.from(uniqueFolders); // Convert set to array and return
}


async function main() {

    playmusic(songs[0], true);

    album = getUniqueFolders(songs);

    let albumUL = document.getElementById("cardclick");
    console.log(album);
    albumUL.innerHTML = "";
    for(const a of album){
        albumUL.innerHTML = albumUL.innerHTML + `<div class="card">
        <div class="play">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45"
                color="#000000" fill="none">
                <circle cx="12" cy="12" r="10" fill="#2ccd2c" />
                <path
                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                    fill="currentColor" />
            </svg>
        </div>
        <img src="songs/${a}/cover.jpeg" alt="">

        <h2>${a}</h2>
        <p></p>
    </div>`;
    }

    Array.from(document.getElementsByClassName("card")).forEach(e =>{

        e.addEventListener("click", element =>{
        currfolder = e.getElementsByTagName("h2")[0].outerHTML.replaceAll("<h2>","").replaceAll("</h2>","");
        
        //const tempDiv = document.createElement('div');


        foldarr = getFilesInFolder(songs, currfolder);
        //console.log(foldarr)

        let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
        songUL.innerHTML = "";
        for (const s of foldarr) {
        songUL.innerHTML = songUL.innerHTML + `<li>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M6.99805 4.94629H15.498C16.3264 4.94629 16.998 5.61786 16.998 6.44629V7.94629" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.998 19.4928C17.998 20.8771 16.8787 21.9994 15.498 21.9994C14.1173 21.9994 12.998 20.8771 12.998 19.4928C12.998 18.1084 14.1173 16.9862 15.498 16.9862C16.8787 16.9862 17.998 18.1084 17.998 19.4928ZM17.998 19.4928V12.9756C18.3313 13.4769 18.598 15.5825 20.998 15.9835" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.0069 2.00098L5.80952 2.001C5.31223 2.001 4.8036 2.07359 4.40163 2.36713C3.12706 3.29785 2.14483 5.3736 4.12838 7.24764C4.68532 7.77384 5.4638 7.96459 6.22905 7.96459H17.7932C18.5873 7.96459 20.0112 8.07764 20.0112 10.4895M3.0061 5.15298L3.03962 17.9993C3.1663 20.3598 4.77003 21.9101 6.97508 21.9101H10.5065" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            <div class="info">
                                ${s.replaceAll("%20", " ")} 
                            </div>
                            <div class="rstplay invert" id="rst">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                            color="#000000" fill="none">
                            <path
                                d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                        " "</div> 
    </li>`;
    }

    playmusic(currfolder + "/" + foldarr[0]);

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(f => {
        f.addEventListener("click", element => {
            playmusic(currfolder + "/" + f.querySelector(".info").innerHTML.trim());
            document.querySelector(".left").style.left = "-100%";
            
        });
    });
        });
    });


    masterplay.addEventListener('click', () => {
        if (currsong.paused || currsong.currentTime <= 0) { currsong.play(); masterplay.src = "svgs/pause.svg"; }
        else { currsong.pause(); masterplay.src = "svgs/play.svg"; }
    })

    currsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currsong.currentTime)} / ${formatTime(currsong.duration)}`;
        document.querySelector(".curpoint").style.left = (currsong.currentTime/currsong.duration)*100 +"%";
    })

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let p = (e.offsetX / e.target.getBoundingClientRect().width);
        document.querySelector(".curpoint").style.left = p*100 + "%";
        currsong.currentTime = currsong.duration * p;
    })

    masterprev.addEventListener("click", ()=>{
        let index = foldarr.indexOf(currsong.src.split("/").slice(-1)[0].replaceAll("%20", " "));
        if(index-1<0) {playmusic(currfolder + "/" + foldarr[foldarr.length-1]);}
        else {playmusic(currfolder + "/" + foldarr[index-1]); 
        } 
    })

    masternext.addEventListener("click", ()=>{
        let index = foldarr.indexOf(currsong.src.split("/").slice(-1)[0].replaceAll("%20", " "));
        if(index+1>=foldarr.length){ playmusic(currfolder + "/" + foldarr[0]); }
        else {playmusic(currfolder + "/" + foldarr[index+1]); }
    })

    document.querySelector(".volrange").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        currsong.volume = parseInt(e.target.value)/100;
    })

    document.addEventListener('keydown', function(event){

        if (event.code === 'Space' || event.code === 'MediaPlayPause') {
            if (currsong.paused || currsong.currentTime <= 0) { currsong.play(); masterplay.src = "svgs/pause.svg"; }
            else { currsong.pause(); masterplay.src = "svgs/play.svg"; }
        }

        if (event.code === 'ArrowDown') {
            let index = foldarr.indexOf(currsong.src.split("/").slice(-1)[0].replaceAll("%20", " "));
            if(index-1<0) {playmusic(currfolder + "/" + foldarr[foldarr.length-1]);}
            else {playmusic(currfolder + "/" + foldarr[index-1]); 
            }
        }

        if (event.code === 'ArrowUp') {
            let index = foldarr.indexOf(currsong.src.split("/").slice(-1)[0].replaceAll("%20", " "));
            if(index+1>=foldarr.length){ playmusic(currfolder + "/" + foldarr[0]); }
            else {playmusic(currfolder + "/" + foldarr[index+1]); }
        }

        if (event.code === 'ArrowLeft') {
            currsong.currentTime = Math.max(0,currsong.currentTime - 5);
        }

        if (event.code === 'ArrowRight') {
            currsong.currentTime = Math.min(currsong.currentTime + 5, currsong.duration);
        }

    })

    currsong.addEventListener('ended', currsong.play );

    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0";
    })

    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%";
    })

    document.addEventListener('DOMContentLoaded', function() {
        const searchIcon = document.getElementById('searchIcon');
        
        // Add click event listener to the search icon
        searchIcon.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default link behavior
          
          // Navigate to search.html
          window.location.href = 'search.html';
        });
    });


}

main()