import instance from "@/utils/request";
/**列表 */
export function GetList(data) {
    return instance.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

/**新增 */
export function AddInfo(data) {
    return instance.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

/**编辑 */
export function EditInfo(data) {
    return instance.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
}
/**删除 */
export function DeleteInfo(data) {
    return instance.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}

/**一级列表增加 */
export function addFirstCategory(data) {
    return instance.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}
/**获取分类 */
export function getCategory(data) {
    return instance.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}
/**获取有子级分类 */
export function getCategoryAll(data) {
    return instance.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    })
}
/**删除 */
export function DeleteCategory(data) {
    return instance.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}
/**修改 */
export function EditCategory(data) {
    return instance.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}
/**子级添加 */
export function addChilrdenCategory(data) {
    return instance.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}