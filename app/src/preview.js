const template = `
    <template v-for="(el, index) in els" :key="index">
        <template v-if="index>0">
            <transition name="custom-classes-transition" enter-active-class="fade-in-top">
                <div v-if="disp(index, el.value)" class="j-data-saved" @click="goTo(index)">
                    <div>
                    <label>{{ el.title}}
                    </label>
                    <span>{{el.value}} <span v-if="index==1">m²</span></span>
                        
                    </div>
                    <span class="j-link">{{lang.change}}</span>
                </div>
            </transition>
        </template>
    </template>   
`;
export default {
  template,
  props: ["els", "ind", "lang"],
  emits: ["newel"],
  data: function () {
    return {
      t: "test",
    };
  },
  methods: {
    disp(i, v) {
      if (this.ind > i && v) {
        return true;
      }
    },
    goTo(n) {
      this.$emit("newel", n);
    },
  },
};
