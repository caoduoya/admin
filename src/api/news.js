import instance from "@/utils/request";
/**列表 */


/**新增 */


/**编辑 */


/**删除 */

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