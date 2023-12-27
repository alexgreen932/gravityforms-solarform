<!-- nest_comment_start~не используется, оставил пока, если придется делать по моему варианту~nest_comment_end -->
const template = `
    <transition name="custom-classes-transition" enter-active-class="fade-in" leave-active-class="fade-out">   
        <div v-if="res" class="j-modal-bg" @click="close()"></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="scale-in-center" leave-active-class="scale-out-center"> 
        <div v-if="res" class="j-modal">
        <i class="fas fa-times-circle" @click="close()"></i>
        <h3>Отправка POST на форму(пока тест)</h3>
        <hr>
        <div class="uk-grid uk-child-width-1-3">
            <div>
                <h5>Отправляемый массив</h5>
                <div v-for="(e, index) in el" :key="index" class="j-data-saved">
                    {{ e.title}} - {{e.value}}
                </div>
                <h5>Преобразовывается в объект - Все или нужные поля</h5>
                <div v-for="(e, index) in el" :key="index" class="j-data-saved">
                    input_{{index+1}}: "{{e.value}}",
                </div>

            </div>
            <div>
                <h5>Ответ от сервера в json</h5>
                <p>но у меня адрес <br>/wp-json/gf/v2/forms/2/submissions, <br>так в документации написано <br>как он должен высчитывать я не знаю пока, и высчитать можно в приложении, а в форму отправлять наверно какие-то данные для сохранения</p>
                {{respond}}
            </div>
            <div>
                <h5>Ответ от сервера в html</h5>
                <div v-html="respond.confirmation_message"></div>
            </div>
        </div>
        </div>
    </transition>
`;
export default {
    template,
    props: ['el', 'nc', 'res'],
    emits: ['newel'],
    data: function () {
        return {
            respond: null,
            post: null,
        }
    },
    methods: {
        close() {
            this.$emit('newel', false);
        },
        // postObj(){},

        //метод GET
        getRes() {
            // var url = window.location.origin + '/wp-json/wp/v2/types';//dev only
            var url = window.location.origin + '/wp-json/gf/v2/forms/2';//dev only

            // var url = window.location.origin +'/wp-json/wp/v2/gfsf/calc';
            // Получим список контент тайпов
            fetch(url)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Problem! Status Code: ' + response.status);
                    }
                    response.json().then(post => {
                        console.log(post);
                        this.respond = post;
                    });
                })
                .catch(function (err) {
                    console.error(err);
                });
        },

        //метод POST
        sendRes() {
            const url = window.location.origin + '/wp-json/gf/v2/forms/2/submissions';//dev only
            // this.respond = response;


            const obj = {
                "input_1": "Marian Kenney",
                "input_2": "marian2210@geocities.com",
                "input_3": "1922-03-11",
                "input_4": "",
                "input_5_1": "1"
            };



            const options = {
                method: 'POST',
                body: JSON.stringify(obj)
            };
            options.headers = {
                "Content-Type": "application/json",
                 //"Authorization": "Basic " + Utilities.base64Encode("ck_xxxxxxxxxxxx:cs_xxxxxxxxxxxxxxxxxx")
            };

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    this.respond = response;
            });



        },
    },
    mounted() {
        // this.getRes();
        // this.sendRes();
    },
}