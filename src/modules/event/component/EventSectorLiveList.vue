<template>

    <div class="" @click.stop>

        <label class="label app-input__label">{{ label }}</label>

        <div v-for="eventSector in orderedList" :key="eventSector.id">

            <div class="row flex__center">

                <event-sector-live-select
                    v-model.number="eventSector.id"
                    ref="eventSectorLiveSelect"
                    :min-width="100"
                    :default="eventSector.name"
                    :data-name="eventSector.name"
                    :except="except(eventSector.id)"
                    @sync-name="syncName($event)"
                ></event-sector-live-select>

                <span class="label__inline flex__center app-input_inline-low">Якорь</span>

                <input v-model="eventSector.is_anchor" type="checkbox" class="app-input_inline-low"/>

                <span @click="remove(eventSector)" class="label__inline flex__center">Удалить</span>

            </div>

        </div>

        <span @click="add" class="plus">+</span>

    </div>

</template>

<script>

import EventSectorLiveSelect from "./EventSectorLiveSelect";

export default {

    methods:{
        add(){
            this.list.push({id: 0})
        },

        remove(item){
            this.list.splice(this.list.indexOf(item), 1)
        },

        except(id){
            return this.list.filter(eventSector => eventSector.id !== id).map(eventSector => eventSector.id)
        },

        updateSelects(){
            this.$refs.eventSectorLiveSelect.forEach(eventSector => {
                eventSector.setSearchString(eventSector.$el.dataset.name);
            })
        },

        syncName(data){
            const eventSector = this.list.find(item => item.id === data.id)
            eventSector.name = data.name
        }
    },

    computed: {
        orderedList(){
            return this.list.sort(function(a, b) {
                return a.order - b.order;
            })
        }
    },

    mounted() {
        if (!this.$refs.eventSectorLiveSelect) return;

        this.updateSelects()
    },

    components: {
        EventSectorLiveSelect
    },

    props: ['error', 'default', 'label', 'minWidth', 'list'],

    name: "ListComponent"
}
</script>
