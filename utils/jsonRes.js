/**
 * @Description: json包装方法
 * @Author: TankNee
 * @Date: 2/2/2020 11:25 AM
 **/

/**
 * 获取成功方法
 * @param code 返回代码
 * @param params 返回参数
 * @param msg 返回携带的信息
 * @returns {{msg: string, code: number, data: *}}
 */
const success = (params, msg = "请求成功", code = 200) => {
    return {
        code: code,
        data: params,
        msg: msg
    }
};
/**
 * 获取失败方法
 * @param code 返回代码
 * @param params 返回参数
 * @param msg 返回携带的信息
 * @returns {{msg: string, code: number, data: *}}
 */
const fail = (params, msg = "请求失败", code = 1000) => {
    return {
        code: code,
        data: params,
        msg: msg
    }
};

exports.success = success;
exports.fail = fail;