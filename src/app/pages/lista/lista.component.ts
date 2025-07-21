import { Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
    list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    listfunc: string[] = [];

    listinput: string = "";
    funcinput: string = "";
    delayinput :boolean = true;
    userfunctions = [ "<",">","d","D","x"];
    examples = [ 
        {
        name: "Pasar a la izquierda <",
        id: "<",
        func: "c{s}B"
        },
        {
        name: "Pasar a la derecha >",
        id: ">",
        func: "C{S}b"
        },
        {
        name: "Duplicar a la izquierda",
        id: "d",
        func: "C{S}c{s}B"
        },
        {
        name: "Duplicar a la derecha",
        id: "D",
        func: "c{s}C{S}b"
        },
        {
        name: "Intercambiar extremos",
        id: "x",
        func: "C{S}bcc{s}Bc{sC{S}bC{S}bsc{s}Bc{s}B}BbC{S}b" 
        },
    ]


    loadCustFunc(func : string){
        this.listfunc = func.split('');
    }

    loadFunc(){
        this.listfunc = this.funcinput.split('');
    }

    loadList(){
        this.list = this.listinput.split(',').map( (x) => Number(x) );
    }

    //aplica funciones simples, sin uso del operador {};
    applyBasicFunc(lfunc: string[]){
        for(const f of lfunc){
            switch(f){
                case 'c': 
                    //console.log('apply c')
                    this.list.unshift(0);
                    break;
                case 'C': 
                    //console.log('apply C')
                    this.list.push(0);
                    break;
                case 'b':
                    //console.log('apply b')
                    this.list.shift();
                    break;
                case 'B':
                    //console.log('apply B')
                    this.list.pop();
                    break;
                case 's':
                    //console.log('apply s')
                    this.list[0] += 1;
                    break;
                case 'S':
                    //console.log('apply S')
                    this.list[this.list.length -1 ] += 1;
                    break;
                default:
                    break
            } 
        }
    }

    applyFunc(lfunc: string[]){
        if(lfunc.includes('{')){
            let bracecounter = 0;
            const innerfunc: string[] = []
            let i = 0;
            while(lfunc[i]!= '{'){
                i++;
            }
            this.applyFunc(lfunc.slice(0,i));
            if(lfunc[i] === '{'){
                bracecounter = 1;
                while(bracecounter > 0){
                    i++;
                    if(lfunc[i] === '{'){
                        bracecounter++;
                    }else if (lfunc[i] === '}'){
                        bracecounter--;
                    }
                    if(bracecounter!= 0){
                        innerfunc.push(lfunc[i]);
                    }
                    
                }
                while( this.list[0] !== this.list[this.list.length -1] ){
                    console.log("applying innerfunc", innerfunc);
                    this.applyFunc(innerfunc);
                }
                this.applyFunc(lfunc.slice(i));
            }

        }else{
            this.applyBasicFunc(lfunc);
        
        }
    }
}
