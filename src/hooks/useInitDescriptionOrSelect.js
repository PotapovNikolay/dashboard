import { onActivated, onDeactivated, ref, toRef, watch } from "vue";
import { useRoute } from "vue-router";

export default function (entity, refs, values, watchSource, key1 = null, key2 = null) {
    const route = useRoute();

    const descriptionRef = ref();
    const contentRef = ref();
    const selectRef = ref();

    const isWatch = ref(true);

    watch(
        () => [route.fullPath, entity[`${watchSource.key1}`], entity[`${watchSource.key2}`]],
        () => {
            if (isWatch.value) {
                isWatch.value = descriptionRef.value?.initValue(entity.description);
                isWatch.value = contentRef.value?.initValue(entity.content);
                isWatch.value = selectRef.value?.initValue(entity.select);
            }
        },
        {
            immediate: true,
        }
    );

    onActivated(() => {
        isWatch.value = true;
    });
    onDeactivated(() => {
        isWatch.value = false;
    });

    return {
        descriptionRef,
        contentRef,
        selectRef,
    };
}
