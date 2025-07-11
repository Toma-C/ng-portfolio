import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Node } from 'src/shared/models/node';

@Component({
  selector: 'app-automata',
  templateUrl: './automata.component.html',
  styleUrls: ['./automata.component.css']
})
export class AutomataComponent {
  inputId: string = "";
  inputRel0: string = "";
  inputRel1: string = "";
  inputAccept: boolean = false;
  word = "11011";
  nodes: Node[] = [
    new Node('q0',['q0','q1'],['q0','q2'],false),
    new Node('q1',['q3'],[],false),
    new Node('q2',[],['q3'],false),
    new Node('q3',[],[],true)
  ];
  acceptNodes: Node[] = [this.nodes[3]];
  addNode(id: string, rel0: string, rel1: string, accept: boolean){
    let newnode = new Node(id,rel0.split(','),rel1.split(','),accept)
    this.nodes.push(newnode);
    if(accept){
      this.acceptNodes.push(newnode);
    }

  }
  deleteNode(id: string){
    const index = this.nodes.findIndex(n => n.id == id);
    if (index > -1) {
       this.nodes.splice(index, 1);
       this.acceptNodes.splice(index, 1);
    }
  }
  automata(node: Node, word: string){
    if(word==""){
      if(this.acceptNodes.includes(node)){
        console.log("working")
        return 1;
      }else{
        console.log("working")
        return 0;
      }
    }
    if(node.rel0.length > 0 && word[0]== "0"){
    for(let index in node.rel0){
        let next = this.nodes.find( (n) => n.id == node.rel0[index]);
        let nextword = word.slice(1);
        if(next != undefined){
            if (this.automata(next,nextword)){
                return 1;
            }
        }
    }
    }
    if(node.rel1.length > 0 && word[0]== "1"){
    for(let index in node.rel1){
        let next = this.nodes.find( (n) => n.id == node.rel1[index]);
        let nextword = word.slice(1);
        if(next != undefined){
          if (this.automata(next,nextword)){
              return 1;
          }
        }
    }
    }
    return 0;
  }
  isWordAccepted = "";
  runAutomata(){
    let result = this.automata(this.nodes[0],this.word);
    if(result){
      this.isWordAccepted = "ACCEPT";
    }else{
      this.isWordAccepted = "REJECT";
    }
  }
}
