import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref } from "vue";

export default function useContextMenu(module) {
    const router = useRouter();
    const store = useStore();
    const appContextMenuRef = ref(null);
    const entity = reactive({});

    function showContextMenu(event, item) {
        appContextMenuRef.value.showContextMenu(event);

        Object.assign(entity, item);
    }

    function hide() {
        appContextMenuRef.value.hideContextMenu();
    }

    async function changePublish() {
        await store.dispatch(`${module}/patch`, {
            id: entity.id,
            key: "publish",
            value: !entity.publish,
        });

        hide();
    }

    async function openVariants() {
        await router.push({ name: "platform.variants.list", params: { id: entity.id } });

        hide();
    }

    async function openVariant() {
        await router.push({ name: "platform.variants.edit", params: { varId: entity.id } });

        hide();
    }

    async function openEntity() {
        await router.push({
            name: `${module}.edit`,
            params: { id: entity.id },
        });

        hide();
    }

    async function removeEntity() {
        let success = confirm("вы уверены, что хотите удалить?");
        let response = null;

        if (success) {
            response = await store.dispatch(`${module}/deleteEntity`, entity.id);
        } else {
            hide()
            return
        }

        if (!response.success && response.message) {
            alert(response.data.message);
        }

        hide();
    }

    function changeUser() {
        if (!entity.user) {
            alert("У пользователя нет привязанной почты");
            return;
        }

        window.location.href = ` ?_switch_user=${entity.user.email}`;
    }

    async function addEntityToDomain() {
        await store.dispatch(`${module}/addEntityToDomain`, entity.id);

        hide(appContextMenuRef.value);
    }

    async function deleteEntityOfDomain() {
        let success = confirm("вы уверены, что хотите удалить?");

        if (success) {
            await store.dispatch(`${module}/deleteEntityOfDomain`, entity.id);
        }

        hide(appContextMenuRef.value);
    }

    async function showInSite() {
        await hide(appContextMenuRef.value);

        const host = await store.dispatch(`${module}/getHost`);
        // +":81";
        window.open("http://" + host + entity.url, "_blank");
    }

    return {
        entity,
        appContextMenuRef,
        showContextMenu,
        changePublish,
        openEntity,
        removeEntity,
        changeUser,
        addEntityToDomain,
        deleteEntityOfDomain,
        showInSite,
        openVariants,
        openVariant,
    };
}
