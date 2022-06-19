// 字段null转字符串
export function null2str(data) {
    for (let x in data) {
        if (data[x] === null) {
            // 如果是null 把直接内容转为 ''
            data[x] = "";
        } else {
            if (Array.isArray(data[x])) {
                // 是数组遍历数组 递归继续处理
                data[x] = data[x].map((z) => {
                    return null2str(z);
                });
            }
            if (typeof data[x] === "object") {
                // 是json 递归继续处理
                data[x] = null2str(data[x]);
            }
        }
    }
    return data;
}