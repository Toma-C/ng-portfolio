import { Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
    list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    listfunc: string[] = [];
    isRenderingList: boolean = true;

    trackValueChange = (index: number, value: number) => `${index}-${value}`;

    listinput: string = "";
    funcinput: string = "";
    delayinput :boolean = false;

    userfuncnameinput: string = "";
    userfuncinput: string = "";
    userfunctions: { [key: string]: string } = {
      "<": "c{s}B",
      ">": "C{S}b",
      "d": "C{S}c{s}B",
      "D": "c{s}C{S}b",
      "x": "C{S}bcc{s}Bc{sC{S}bC{S}bsc{s}Bc{s}B}BbC{S}b",
      "m": ">C{S<S>}bB<"
    };



    examples = [ 
        {
        name: "Pasar a la izquierda (<)",
        id: "<",
        func: "c{s}B"
        },
        {
        name: "Pasar a la derecha (>)",
        id: ">",
        func: "C{S}b"
        },
        {
        name: "Duplicar a la izquierda (d)",
        id: "d",
        func: "C{S}c{s}B"
        },
        {
        name: "Duplicar a la derecha (D)",
        id: "D",
        func: "c{s}C{S}b"
        },
        {
        name: "Intercambiar extremos (x)",
        id: "x",
        func: ">c<c{s>>s<<}bB>" 
        },
        {
        name:"Suma a la izquierda (m)",
        id: "m",
        func: ">C{S<S>}bB<"
        },
        {
        name:"Suma a la derecha (M)",
        id: "M",
        func: "<c{s>s<}bB>"
        },
        {
        name:"Suma persistente a la izquierda",
        id: "M",
        func: "d>>dxmx<x<"
        }

    ]

    get userfunctionsEntries() {
        return Object.entries(this.userfunctions);
    }


    expandFunc(lfunc: string[]){
        const result = [...lfunc];
        let i = 0;

        while (i < result.length) {
            const char = result[i];
            if (this.userfunctions[char]) {
                result.splice(i, 1, ...this.userfunctions[char]);
            } else {
                i++;
            }
        }

        return result;
    }


    loadCustFunc(func : string){
        this.listfunc = func.split('');
    }

    loadFunc(){
        this.listfunc = this.funcinput.split('');
    }

    loadList(){
        this.list = this.listinput.split(',').map( (x) => Number(x) );
    }

    loadUserFunc(){
        this.userfunctions[this.userfuncnameinput] = this.userfuncinput;
    }

    delay(ms: number): Promise<void> {
      if (ms <= 0) {
        return new Promise(resolve =>requestAnimationFrame( ()=> resolve() ));
      }

      return new Promise(resolve => setTimeout(resolve, ms));
    }

    //aplica funciones simples, sin uso del operador {};
    async applyBasicFunc(lfunc: string[]): Promise<void>{
        for(const f of lfunc){
            await this.delay(this.delayinput ? 400 : 0);
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

    async applyFunc(lfunc: string[]): Promise<void>{
        if(lfunc.includes('{')){
            let bracecounter = 0;
            const innerfunc: string[] = []
            let i = 0;
            while(lfunc[i]!= '{'){
                i++;
            }
            await this.applyFunc(lfunc.slice(0,i));
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
                    //console.log("applying innerfunc", innerfunc);
                    await this.applyFunc(innerfunc);
                }
                await this.applyFunc(lfunc.slice(i));
            }

        }else{
            await this.applyBasicFunc(lfunc);
        
        }
    }
    async runProgram(lfunc: string[]) {
        if(this.delayinput){
        await this.applyFunc(this.expandFunc(lfunc));
        }else{
            this.applyFuncI(this.expandFunc(lfunc));
        }
    }

    applyBasicFuncI(lfunc: string[]){
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

    applyFuncI(lfunc: string[]){
        if(lfunc.includes('{')){
            let bracecounter = 0;
            const innerfunc: string[] = []
            let i = 0;
            while(lfunc[i]!= '{'){
                i++;
            }
            this.applyFuncI(lfunc.slice(0,i));
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
                    this.applyFuncI(innerfunc);
                }
                this.applyFuncI(lfunc.slice(i));
            }

        }else{
            this.applyBasicFuncI(lfunc);
        
        }
    }
}
