<template>

        <div v-if="domain" class="category-view__name form-group">
            <app-input
                    label="Название"
                    v-model:value="domain.name"
                    :error="errors.name"
                    :minWidth="255"
            ></app-input>
        </div>

    <div v-if="domain" class="category-view__name form-group">
        <app-input
                label="Название"
                v-model:value="domain.host"
                :error="errors.name"
                :minWidth="255"
        ></app-input>
    </div>

    <div class="save">
        <button  class="btn btn_primary save__btn" @click="save">{{host?'Сохранить':'Добавить'}} </button>
    </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from "vuex";
import {StoreName} from "../store/index";
import AppInput from "../../../core/components/AppInput";


export default {

    data(){
        return {
            host:null,
            domain:null,
            errors: Object.assign({}, errors),
        }
    },

    computed:{

        // ...mapState(StoreName, {
        //
        //     domain: state => state.entities.domain,
        // }),

        ...mapGetters(StoreName,['domainByHost'])
    },

    methods:{

        ...mapActions(StoreName,['getDomainByHost', 'postDomain']),

        async save(){

            const domain ={
                name:this.domain.name,
                host:this.domain.host
            }

            const response = await this.postDomain(domain)

            console.log(response)

            if (response.success) {

                // this.scrollTop();

                this.$router.push({ name: 'domains.list' });
            }
            else {

                this.errors = Object.assign({}, errors, response.errors);

                alert("Проверьте правильность заполнения полей");
            }


        },
    },

    beforeRouteEnter(to, from, next) {

        next(async (vm) => {

            vm.prevRoute = from
            if ("host" in to.params) {

                vm.host = to.params.host
                await vm.getDomainByHost(to.params.host)
                vm.domain = vm.domainByHost(to.params.host)

            }
            else {

                vm.domain={}
            }
        })
    },

    name: "DomainView",
    components:{
        AppInput
    }
}
</script>

