
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
declare module '*.js' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
/**
 * value: node节点的值
 * key: node节点的唯一标识
 */

declare type node = {
    value:String;
    key: Number;
    name: String;
}


