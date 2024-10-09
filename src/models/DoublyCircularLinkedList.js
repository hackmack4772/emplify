class Node {
    constructor(data) {
      this.data = data; // song data (e.g., { title, artist, songUrl })
      this.next = null;
      this.prev = null;
    }
  }
  
  export class DoublyCircularLinkedList {
    constructor() {
      this.head = null;
      this.current = null;
      this.isShuffling = false;
      this.loadFromLocalStorage();
    }
  
    // Add a new song to the end of the playlist
    append(data) {
      const newNode = new Node(data);
  
      if (!this.head) {
        // If the list is empty, create the first node
        this.head = newNode;
        this.head.next = this.head;
        this.head.prev = this.head;
      } else {
        // Add the new node to the end of the list
        const lastNode = this.head.prev;
        lastNode.next = newNode;
        newNode.prev = lastNode;
        newNode.next = this.head; // Point to the head to make it circular
        this.head.prev = newNode; // Update the head's prev to the new node
      }
  
      // If it's the first node, set it as the current song
      if (!this.current) {
        this.current = this.head;
      }
  
      this.saveToLocalStorage(); // Save to local storage
    }
  
    // Move to the next song
    playNext() {
      if (this.isShuffling) {
        const randomIndex = this.getRandomSongIndex();
        this.current = this.getSongAt(randomIndex);
      } else {
        this.current = this.current.next;
      }
      return this.current;
    }
  
    // Move to the previous song
    playPrevious() {
      this.current = this.current.prev;
      return this.current;
    }
  
    // Remove a song from the playlist (by title)
    remove(title) {
      if (!this.head) return; // If the list is empty, do nothing
  
      let currentNode = this.head;
  
      do {
        if (currentNode.data.title === title) {
          // Found the node to remove
          const prevNode = currentNode.prev;
          const nextNode = currentNode.next;
  
          if (currentNode === this.head) {
            if (this.head === this.head.next) {
              // There's only one node, and it's being removed
              this.head = null;
              this.current = null;
              return;
            } else {
              // Set the new head to be the next node
              this.head = nextNode;
            }
          }
  
          // Update the previous and next nodes to skip the removed node
          prevNode.next = nextNode;
          nextNode.prev = prevNode;
  
          // If this is the current node, move the current pointer to the next song
          if (this.current === currentNode) {
            this.current = nextNode;
          }
          this.saveToLocalStorage(); // Save to local storage
          return;
        }
  
        currentNode = currentNode.next;
      } while (currentNode !== this.head);
    }
  
    // Shuffle the playlist
    shuffle() {
      this.isShuffling = !this.isShuffling;
    }
  
    // Get a random index from the playlist
    getRandomSongIndex() {
      const length = this.getPlaylistLength();
      return Math.floor(Math.random() * length);
    }
  
    // Get the song at a specific index
    getSongAt(index) {
      if (!this.head) return null;
  
      let currentNode = this.head;
      let count = 0;
  
      do {
        if (count === index) return currentNode;
        currentNode = currentNode.next;
        count++;
      } while (currentNode !== this.head);
  
      return null; // If the index is out of range
    }
  
    // Get the length of the playlist
    getPlaylistLength() {
      if (!this.head) return 0;
  
      let currentNode = this.head;
      let count = 0;
  
      do {
        count++;
        currentNode = currentNode.next;
      } while (currentNode !== this.head);
  
      return count;
    }
  
    // Save playlist to local storage
    saveToLocalStorage() {
        console.log("saveToLocalStorage");
        
      const playlist = this.getPlaylistData();
      localStorage.setItem('playlist', JSON.stringify(playlist));
      localStorage.setItem('currentSong', JSON.stringify(this.current?.data));
    }
  
    // Load playlist from local storage
  // Load playlist from local storage
loadFromLocalStorage() {
    console.log("loadFromLocalStorage");

    try {
      const playlistData = JSON.parse(localStorage.getItem('playlist'));
      const currentSongData = JSON.parse(localStorage.getItem('currentSong'));

      if (playlistData) {
        playlistData.forEach(song => this.append(song));
      }

      if (currentSongData) {
        this.current = this.findCurrentSong(currentSongData.title);
      }
    } catch (error) {
      console.error("Error loading from local storage", error);
    }
}

    // Find the current song by title
    findCurrentSong(title) {
      if (!this.head) return null;
  
      let currentNode = this.head;
  
      do {
        if (currentNode.data.title === title) {
          return currentNode;
        }
        currentNode = currentNode.next;
      } while (currentNode !== this.head);
  
      return null;
    }
  
    // Get playlist data for saving
    getPlaylistData() {
      const playlist = [];
      if (!this.head) return playlist;
  
      let currentNode = this.head;
  
      do {
        playlist.push(currentNode.data);
        currentNode = currentNode.next;
      } while (currentNode !== this.head);
  
      return playlist;
    }
  
    // Display the playlist (for debugging)
    printPlaylist() {
      if (!this.head) {
        console.log("Playlist is empty");
        return;
      }
  
      let currentNode = this.head;
      let result = "";
  
      do {
        result += `${currentNode.data.title} -> `;
        currentNode = currentNode.next;
      } while (currentNode !== this.head);
  
      console.log(result + "HEAD");
    }
  }
  
  
  export default DoublyCircularLinkedList