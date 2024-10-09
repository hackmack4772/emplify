
class SinglyNode {

    constructor(data) {
        this.data = data
        this.next = null
    }

}

class SinglyLinkedList {

    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    insertFirst(data) {
        const currentNode = new SinglyNode(data);
        if (!this.head) {
            this.head = currentNode
            this.tail = currentNode
        } else {
            currentNode.next = this.head
            this.head = currentNode;
        }
        this.length++
    }
    insertLast(data) {
        const currentNode = new SinglyNode(data)

        if (!this.head) {
            this.head = currentNode
            this.tail = currentNode
        }
        else {
            this.tail.next = currentNode
            this.tail = currentNode
        }
        this.length++
    }
    insertAtPosition (index, value) {
        const newNode = new SinglyNode(value);
        if (index === 0) {
          this.insertFirst(value);
          return;
        }
        let temp = this.head;
        let count = 0;
        while (temp && count < index - 1) {            
          temp = temp.next;
          count++;
        }
        if (!temp) {
          console.log("Index out of range");
          return;
        }        
        newNode.next = temp.next;
        temp.next=newNode
    }
    
    deleteFirst(){
        if(!this.head) return
        this.head=this.head.next
    }
    deleteLast(){
        if(!this.head) return
        if(!this.head.next) {
            this.head=null 
            return
        }       
       this.head=this.head.next
    }




    displayValues() {

        let currentNode = this.head;
        while (currentNode) {
            console.log( currentNode.data, "==>", currentNode.next?.data || null)
            currentNode=currentNode.next
        }

    }


}

const node = new SinglyLinkedList();
node.insertFirst(5)
node.insertFirst(4)
node.insertFirst(7)
node.insertLast(1)
node.insertLast(6)
node.insertAtPosition(2, 16)
node.displayValues();


