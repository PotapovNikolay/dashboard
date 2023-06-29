import AnimateScroll from "js-animate-scroll";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { reactive, onActivated, onDeactivated } from "vue";
import cloneDeep from "lodash/cloneDeep";

/**
 * Инициализация страниц View
 * @param {string} storeName - Название стора
 * @param {Object} entityItem - Пустой entity из файла index в helpers
 * @param {Object} storeName - Пустой errors из файла index в helpers
 * @param {Function} additional - доп функция для onActivated
 * @param {Function} transformEntity - Изменить сущность до сохранения
 * @param {Boolean} customActivated - Использоваться колбек активации из хука или из компонента
 * @returns {entity, errors, save }
 */
export default function (storeName, entityItem, errorsItem, additional = null, transformEntity = null, customActivated = false) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const entity = reactive({});

    const cloneErrors = _.cloneDeep(errorsItem);
    let errors = reactive(cloneErrors);

    async function save() {
        await store.dispatch("loader/show");

        if (transformEntity) {
            transformEntity();
        }
        

        //времянка
        // entity.images = {
        //     preview: {
        //         id: 166,
        //         order: null,
        //         source: "/media/images/teams/6245a645-54e1-4cda-9833-afdafbd1a709/f9f0abbc-6e13-45a9-843a-b5218c9944a0.jpg",
        //     },
        // };

        const response = await store.dispatch(`${storeName}/newOrUpdate`, entity);

        if (!response) {
            confirm("Что-то пошло не так");
            store.dispatch("loader/hide");
            return;
        }

        if (response.success) {
            scrollTop();
            await router.push({ name: `${storeName}.list` });
        } else {
            assignErrors(response);
            alert("Проверьте правильность заполнения полей");
        }

        await store.dispatch("loader/hide");
    }

    //преобразует объект с ошибками, которые приходят с бэка в объект для фронта
    function assignErrors(response) {
        if (!response) return;
        for (const [tab, property] of Object.entries(errors)) {
            Object.keys(response.errors).forEach((error) => {
                if (Object.hasOwn(property, error)) {
                    if (errors[tab][error]) {
                        errors[tab][error].value = response.errors[error];
                        errors[tab][error].missing = true;
                    }
                }
            });
        }
    }

    function scrollTop() {
        setTimeout(() => {
            new AnimateScroll(".app", {
                duration: 300,
                padding: 20,
                easing: "easeInOutQuart",
            });
        }, 200);
    }

    function assignImages() {
        if (Array.isArray(entity.images)) {
            entity.images = entityItem.images;
        } else {
            for (let key in entityItem.images) {
                if (!entity.images.hasOwnProperty(key)) {
                    entity.images[key] = entityItem.images[key];
                }
            }
        }
    }

    onBeforeRouteLeave(() => {
        Object.assign(errors, _.cloneDeep(errorsItem));
    });

    onActivated(async () => {
        if (!customActivated) {
            if (route.params.id) {
                const response = await store.dispatch(`${storeName}/getEntityById`, route.params.id);

                if (response.success) {
                    Object.assign(entity, _.cloneDeep(response.entity));
                    assignImages();

                    if (additional) additional(entity);
                }
            } else {
                Object.assign(entity, _.cloneDeep(entityItem));
            }
        }
    });

    return { entity, errors, save };
}
