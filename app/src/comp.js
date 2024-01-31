import {VueProductSpinner } from './VueProductSpinner.common.js'
export default {
    template: `
    <VueProductSpinner 
        :imgs="imgs" 
        :slider="true"
    >
        <!-- <PreloadSpinnerComponent /> -->
    </VueProductSpinner>
    `,
    props: ["el"],
    emits: ["nv"],
    components: {
        VueProductSpinner
      },
      data() {
        return {
          imgs: [
            'img1.jpg',
            'img2.jpg',
            'img3.jpg'
          ]
        }
      }
};
