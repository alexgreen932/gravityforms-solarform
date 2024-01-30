// const { ref } = Vue;
export default {
    template: `
    <q-knob
      :min="0"
      :max="24"
      v-model="value1"
      show-value
      size="90px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
    >{{ hours }}</q-knob>
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            valie1: 0,
            isDragging: false,
            angle: 0,
            rotateStyle: null,
        };
    },

    methods: {
        //$emit('nv', this.compassDirection);

    },

    computed: {
        hours() {
            return this.value1 > 0 ? this.value1 : 'Hours';
        },
        minutes() {
            return this.value2 > 0 ? this.value2 : 'Minutes';
        },
        seconds() {
            return this.value3 > 0 ? this.value3 : 'Seconds';
        }
    }
    // setup() {
    //     return {
    //         value: ref(61)
    //     }
    // }
};

