<template>
    <div v-if="entity" class="event__tab_team_container">
        <div class="form-group">
            <!--            <div class="event__tab_team_container_title" :style="{ color: isSame?.length ? '#0f70ab ' : ' black' }">-->
            <!--                {{ i18n("labels.teams.team1") }}-->
            <!--                <span>-->
            <!--                    {{ isSame }}-->
            <!--                </span>-->
            <!--            </div>-->

            <!--            <event-team-of-team-tab v-model:team="entity.first_team" v-model:errors="errors.first_team_id" />-->

            <app-debounce-select
                v-model:value="entity.first_team"
                :initialValue="entity.first_team?.name"
                ref="team1SelectRef"
                :error="errors.teams.first_team_id"
                :label="i18n('labels.teams.team')"
                :required.boolean="true"
                urlString="/teams/search"
                :min-width.number="400"
            />

            <br />
            <div v-if="entity.first_team">
                <div class="form-group" v-if="entity.first_team.images.preview">
                    <img
                        :src="entity.first_team.images.preview.source"
                        class="app-images__image"
                        :alt="entity.first_team.images.preview.source"
                    />
                </div>
            </div>
        </div>

        <div class="form-group">
            <!--            <div class="event__tab_team_container_title" :style="{ color: isSame.length ? '#0f70ab ' : ' black' }">-->
            <!--                {{ i18n("labels.teams.team2") }}-->
            <!--                <span>-->
            <!--                    {{ isSame }}-->
            <!--                </span>-->
            <!--            </div>-->
            <!--            <event-team-of-team-tab v-model:team="entity.second_team" v-model:errors="errors.second_team_id" />-->
            <app-debounce-select
                v-model:value="entity.second_team"
                :initialValue="entity.second_team?.name"
                ref="team2SelectRef"
                :error="errors.teams.second_team_id"
                :label="i18n('labels.teams.team')"
                :required.boolean="true"
                urlString="/teams/search"
                :min-width.number="400"
            />

            <br />
            <div v-if="entity.second_team">
                <div class="form-group" v-if="entity.second_team.images.preview">
                    <img
                        :src="entity.second_team.images.preview.source"
                        class="app-images__image"
                        :alt="entity.second_team.images.preview.source"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import EventViewLang from "../../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");

const isSame = ref(null);
const team1SelectRef = ref(null);
const team2SelectRef = ref(null);

watchEffect(() => {
    team1SelectRef.value?.initValue(entity.first_team?.name);
    team2SelectRef.value?.initValue(entity.second_team?.name);
});
</script>

<script>
export default {
    name: "EventTeams",
};
</script>

<!--<script>-->
<!--import EventTeamOfTeamTab from "./EventTeamOfTeamTab";-->
<!--import I18n from "../../../../mixins/I18n";-->
<!--import EventViewLang from "../../language/EventViewLang";-->

<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            EventViewLang: EventViewLang,-->
<!--            isSame: "",-->
<!--        };-->
<!--    },-->

<!--    props: {-->
<!--        entity: {-->
<!--            type: Object,-->
<!--        },-->
<!--        errors: {-->
<!--            type: Object,-->
<!--        },-->
<!--    },-->

<!--    methods: {-->
<!--        checkSameTeam(entity) {-->
<!--            if (entity.first_team?.id === entity.second_team?.id) {-->
<!--                this.isSame = "- такая команда уже выбрана";-->
<!--            } else {-->
<!--                this.isSame = "";-->
<!--            }-->
<!--        },-->
<!--    },-->

// created() { // this.$watch( // "entity", // (newEntity) => { // this.checkSameTeam(newEntity); // }, // { deep: true } // ); // },

<!--    name: "EventTeams",-->
<!--    components: { EventTeamOfTeamTab },-->
<!--    mixins: [I18n],-->
<!--};-->
<!--</script>-->

<style scoped></style>
