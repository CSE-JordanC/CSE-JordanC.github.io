// Basic Song class
class Song {
    constructor(title, artist, album, year, genre, pic, youtubeCode) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;
        this.genre = genre;
        this.pic = pic; // filename inside images/ folder
        this.youtubeCode = youtubeCode; // YouTube ID
    }

    // returns a list item element that represents the song card
    get item() {
        const li = document.createElement("li");
        li.classList.add("song-card");

        // anchor used for click accessibility
        const a = document.createElement("a");
        a.href = "#";
        a.classList.add("card-head");
        const h3 = document.createElement("h3");
        h3.innerHTML = this.title;
        const p = document.createElement("p");
        p.innerHTML = "By " + this.artist;
        a.append(h3);
        a.append(p);

        // cover image
        const img = document.createElement("img");
        img.classList.add("card-cover");
        img.src = `images/${this.pic}`;
        img.alt = this.title + " cover art";

        // append components
        li.appendChild(a);
        li.appendChild(img);

        // click opens the modal
        a.onclick = (evt) => {
            evt.preventDefault();
            openModalForSong(this);
        };

        // keyboard support: Enter or Space opens
        li.onkeypress = (evt) => {
            if (evt.key === "Enter" || evt.key === " ") {
                evt.preventDefault();
                openModalForSong(this);
            }
        };
        // make li focusable
        li.tabIndex = 0;

        return li;
    }

    // helper that returns a simple text summary (not used in card, but available)
    summary() {
        return `${this.title} — ${this.artist} (${this.year})`;
    }
}

/* Create songs array and push 4 songs (update image filenames as you like).
   Put matching images in the images/ folder with these filenames. */
const songs = [];
songs.push(new Song("Two-Headed Boy", "Neutral Milk Hotel", "In the Aeroplane Over the Sea", 1998, "Folk / Indie", "two-headed-boy.jpg", "Fg32tzKmTv4"));
songs.push(new Song("Jailhouse Rock", "Elvis Presley", "Jailhouse Rock (Soundtrack)", 1957, "Rock & Roll", "jailhouse-rock.jpg", "gj0Rz-uP4Mk"));
songs.push(new Song("So What", "Miles Davis", "Kind of Blue", 1959, "Jazz", "so-what.jpg", "zqNTltOGh5c"));
songs.push(new Song("Jolene", "Dolly Parton", "Jolene", 1974, "Country", "jolene.jpg", "Ixrje2rXLMA"));

// render them into the DOM
const list = document.getElementById("song-list");
songs.forEach(function(song) {
    list.append(song.item);
});

/* Modal elements */
const modal = document.getElementById("songModal");
const modalVideoWrap = document.getElementById("modalVideoWrap");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalAlbum = document.getElementById("modalAlbum");
const modalYear = document.getElementById("modalYear");
const modalGenre = document.getElementById("modalGenre");
const modalCloseBtn = document.getElementById("modalCloseBtn");

// open modal and populate data
function openModalForSong(song) {
    // set text
    modalTitle.textContent = song.title;
    modalArtist.textContent = "by " + song.artist;
    modalAlbum.textContent = song.album;
    modalYear.textContent = song.year;
    modalGenre.textContent = song.genre;

    // add iframe (clear previous first)
    modalVideoWrap.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    iframe.src = "https://www.youtube.com/embed/" + encodeURIComponent(song.youtubeCode) + "?rel=0&showinfo=0";
    modalVideoWrap.appendChild(iframe);

    // show modal using W3.CSS display style
    modal.style.display = "block";

    // set focus to close button for accessibility
    modalCloseBtn.focus();
}

// close modal and stop video
function closeModal() {
    modal.style.display = "none";
    modalVideoWrap.innerHTML = ""; // remove iframe to stop playback
}

// event listeners for closing
modalCloseBtn.addEventListener("click", function() {
    closeModal();
});

// close when clicking outside the modal content
modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// close on Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});