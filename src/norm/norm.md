###### 场景中三维对象的规范
1. group_norm
> 为了将模型与数据更好的解耦，分组实例将模型数据以传统数组的形式进行存储。
> 而剩下需要做的就是对数组的操作，不需要再对场景一次次的traverse遍历、判断、写逻辑
> 对外暴露一个抽象类GroupNorm，所有分组实例都继承自这一抽象类