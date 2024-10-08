import SongNode from "./SongNode";

class Playlist {
    constructor() {
        this.head = null
        this.tail = null
        this.currentSong = null;
        this.length = null
    }

    addSong(data) {

        const addSongNode = new SongNode(data)
        if (!this.head) {
            this.head = addSongNode
            this.tail = addSongNode
        } else {
            this.tail.next = addSongNode
            this.tail = addSongNode
        }
        this.length++
    }
    deleteSong(title) {
        if (!this.head) {
            return;
        }

        if (this.head.song.title === title) {
            this.head = this.head.next;
            this.length--;
        }
        else {
            let currentNode = this.head
            while (currentNode.next) {
                if (currentNode.next.song.title === title) {
                    currentNode.next = currentNode.next.next
                    this.length--
                    if (!this.tail) this.tail = currentNode
                    return
                }
                currentNode = currentNode.next

            }
        }
    }
    playNext() {

        if (!this.currentSong) {
            this.currentSong = this.head
            return;
        }

        this.currentSong = this.currentSong.next || this.head
        return this.currentSong.song
    }
    playPrevious() {
        let current = this.head;
        let prev;
        while (current) {
            if (current == this.currentSong) {
                this.currentSong = prev || this.tail
                return this.currentSong.song
            }
            prev = current
            current = current.next
        }
    }

    searchSong(title) {
        let current = this.head
        while (current) {
            if (current.song.title == title) {
                return current.song
            }
            current = current.next
        }
        return null
    }
    displayPlaylist() {
        const song = []
        let current = this.head
        while (current) {
            song.push(current.song.title)
            current = current.next
        }
        return song
    }
}


export default Playlist