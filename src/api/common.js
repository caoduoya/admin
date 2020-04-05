import { getCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";
export function common() {
    const categoryItem = reactive({
        item: []
    })
    const getinfoCategory = () => {
        getCategory({}).then((res) => {
            categoryItem.item = res.data.data.data;
        }).catch((err) => {

        });
    }

    return {
        getinfoCategory,
        categoryItem
    }
}