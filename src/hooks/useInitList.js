import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onActivated, shallowRef } from "vue";

/**
 *@param {string} name Нужна если в store внутри entities есть сущности
 *@param {string} entitiesOfDomain Нужна если в store есть entitiesOfDomain
 **/
export default function useInitList(StoreName, listContextMenu = null, name = null, entitiesOfDomain = null) {
    const router = useRouter();
    const store = useStore();

    const entities = computed(() => (name ? store.state[StoreName].entities[name] : store.state[StoreName].entities));
    const pagination = computed(() => store.state[StoreName].pagination);

    const subEntities = entitiesOfDomain ? computed(() => store.state[StoreName].entitiesOfDomain) : null;

    async function openEntityView(name, entity) {
        await router.push({
            name: name,
            params: { id: entity.id },
        });
    }

    onActivated(async () => {
        await store.dispatch(`${StoreName}/getEntities`);
        entitiesOfDomain ? await store.dispatch(`${StoreName}/getEntitiesOfDomain`) : null;
    });

    const contextMenu = shallowRef(listContextMenu);

    return { entities, pagination, subEntities, contextMenu, openEntityView };
}
