// Keys = Song titles
// Values = ONLY the YouTube video ID
const happySongs = [];
happySongs["Happy by Pharrell Williams"] = "y6Sxv-sUYtM";
happySongs["Don't Stop Me Now by Queen"] = "HgzGwKwLmgM";
happySongs["Can't Stop the Feeling by Justin Timberlake"] = "ru0K8uYEZWw";
happySongs["Don't Worry Be Happy by Bobby McFerrin"] = "d-diB65scQU";
happySongs["I'm Walking on Sunshine by Katrina & The Waves"] = "iPUmE-tne5U";

const sadSongs = [];
sadSongs["Happier Than Ever by Billie Eilish"] = "5GJWxDKyk3A";
sadSongs["Someone You Loved by Lewis Capaldi"] = "zABLecsR5UE";
sadSongs["Someone Like You by Adele"] = "hLQl3WQQoQ0";
sadSongs["Fix You by Coldplay"] = "k4V3Mo61fJM";
sadSongs["Hurt by Johnny Cash"] = "8AHCfZTRGiI";

// DOM Elements
const selectMood = document.getElementById("select-mood");
const songList = document.getElementById("song-list");
const videoWrapper = document.getElementById("video-wrapper");
const videoContainer = document.getElementById("video-container");

//Clear everything
function clearSongsAndVideo() {
  songList.innerHTML = "";
  videoContainer.innerHTML = "";
  videoWrapper.style.display = "none";
}

//Build full embed URL using ONLY the ID
function showVideoFor(videoID) {
  videoContainer.innerHTML = "";

  const iframe = document.createElement("iframe");

  //build the full URL
  iframe.setAttribute("src", "https://www.youtube.com/embed/" + videoID);
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
  iframe.setAttribute("title", "YouTube video player");

  videoContainer.appendChild(iframe);
  videoWrapper.style.display = "block";
}

//When mood changes
selectMood.onchange = () => {
  clearSongsAndVideo();
  const mood = selectMood.value;
  if (!mood) return;

  let chosen = [];
  if (mood === "happy") chosen = happySongs;
  else if (mood === "sad") chosen = sadSongs;

  for (let song in chosen) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = song;
    a.href = "#";

    a.onclick = (e) => {
      e.preventDefault();
      showVideoFor(chosen[song]);
    };

    li.appendChild(a);
    songList.appendChild(li);
  }
};

//Start hidden
clearSongsAndVideo();