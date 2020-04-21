import { getCategory, getCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
import instance from "@/utils/request";
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
    //获取全部分类
    const getinfoCategoryAll = () => {
        getCategoryAll({}).then((res) => {
            categoryItem.item = res.data.data;
            console.log(res);
        }).catch((err) => {

        });
    }
    return {
        getinfoCategory,
        getinfoCategoryAll,
        categoryItem
    }
}

//获取七牛云token
export function QiniuToken(data) {
    return instance.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}