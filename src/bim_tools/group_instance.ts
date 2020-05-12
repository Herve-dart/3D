/**
 * 具体设备的分组实例（空调，水，电），不包含楼层的分组
 */
import { GroupNorm } from '../norm/group_norm'

class GroupInstance extends GroupNorm{
    groupName: string;
    children: any[];
}

export { GroupInstance }