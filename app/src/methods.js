

export default {
  langCurrent(){
      if ( this.lang_current == 1 ) {
          this.screens = this.screens_en;
          this.lang = this.lang_en;
      } else {
        this.screens = this.screens_de;
        this.lang = this.lang_de;
      }
  },
  showScr(i){
    if ( this.screen == i ) {
      return true;
    }
  },
  finishForm(){
  },
  textareaData(){
    // const array = this.screens;  
    // const obj = Object.fromEntries(array.map(item => [item.title, item.value]));
    // return JSON.stringify(obj);

  },
  output(){//dev
      return JSON.stringify(this.final_obj);
  },
  outDev(){//dev
      return JSON.stringify(this.screens);
  },
  outData(){
    return JSON.stringify(this.final_obj);
  },
  writeData(){
    this.finishForm();
  },
};