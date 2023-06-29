<template>

    <div class="" @click.stop>

        <label class="label app-input__label">{{ label }}</label>

        <div v-for="(lodge, index) in list" :key="lodge.id">

            <div class="row flex__center">

                <lodge-live-select
                    v-model.number="lodge.id"
                    ref="lodgeLiveSelect"
                    :min-width="100"
                    :default="lodge.name"
                    :data-name="lodge.name"
                    :except="except(lodge.id)"
                    @sync-name="syncName($event)"
                ></lodge-live-select>

                <span class="label__inline flex__center app-input_inline-low">Цена</span>

                <app-input v-model.number="lodge.price" class="app-input_inline " min-width="100"></app-input>

                <span class="label__inline flex__center app-input_inline-low">Количество</span>

                <app-input v-model.number="lodge.count" class="app-input_inline " min-width="100"></app-input>

                <span @click="remove(lodge)" class="label__inline flex__center">Удалить</span>

            </div>

        </div>

        <span @click="add" class="plus">+</span>

    </div>

</template>

<script>

import LodgeLiveSelect from "./LodgeLiveSelect";

export default {

    methods:{
        add(){
            this.list.push({id: 0})
        },

        remove(item){
            this.list.splice(this.list.indexOf(item), 1)
        },

        except(id){
            return this.list.filter(lodge => lodge.id !== id).map(lodge => lodge.id)
        },

        updateSelects(){
            this.$refs.lodgeLiveSelect.forEach(lodge => {
                lodge.setSearchString(lodge.$el.dataset.name);
            })
        },

        syncName(data){
            const lodge = this.list.find(item => item.id === data.id)
            lodge.name = data.name
        }
    },

    mounted() {
        if (!this.$refs.lodgeLiveSelect) return;

        this.updateSelects()
    },

    components: {
        LodgeLiveSelect
    },

    props: ['error', 'default', 'label', 'minWidth', 'list'],

    name: "ListComponent"
}
</script>
