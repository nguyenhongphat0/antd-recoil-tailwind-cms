import moment, { Moment } from "moment"
import { atom, selector } from "recoil"
import { Retentions, TimeRange } from "../models/stat";
import { getAppStats, getGenericStats, getRetention, getTraffics } from "../services/stat"

export type StatTab = 'followers' | 'reactions' | 'content' | 'promote' | 'miniapp';

export const currentTabState = atom<StatTab>({
    key: "currentTab",
    default: "followers",
})

export const rangeState = atom<[Moment, Moment]>({
    key: "rangeState",
    default: [moment().subtract(6, 'days').startOf('D'), moment()],
})

export const selectedRangeTemplateState = atom<number | null>({
    key: "selectedRangeTemplate",
    default: 1,
})

export const followStatsState = selector({
    key: 'followStats',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getGenericStats('follow-oa', range)
        return stats.map(stat => ({ ...stat, action: 'Số lần quan tâm' }))
    }
})

export const unfollowStatsState = selector({
    key: 'unfollowStats',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getGenericStats('unfollow-oa', range)
        return stats.map(stat => ({ ...stat, action: 'Số lần bỏ quan tâm' }))
    }
})

export const followerStatsState = selector({
    key: 'followerStats',
    get: async ({ get }) => {
        const followStats = await get(followStatsState)
        const unfollowStats = await get(unfollowStatsState)
        return [...followStats, ...unfollowStats]
    }
})

export const reactionStatsState = selector({
    key: 'reactionStats',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getGenericStats('react', range)
        return stats.map(stat => ({ ...stat, action: 'Số lần yêu thích' }))
    }
})

export const commentStatsState = selector({
    key: 'commentStats',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getGenericStats('comment', range)
        return stats.map(stat => ({ ...stat, action: 'Số lần bình luận' }))
    }
})

export const playVideoStatsState = selector({
    key: 'playVideoStats',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getGenericStats('play-video', range)
        return stats.map(stat => ({ ...stat, action: 'Số lần click vào video' }))
    }
})

export const viewMoreStatsState = selector({
    key: 'viewMoreStats',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getGenericStats('view-more', range)
        return stats.map(stat => ({ ...stat, action: 'Số lần click vào xem thêm' }))
    }
})

export const behaviorStatsState = selector({
    key: 'behaviorStats',
    get: async ({ get }) => {
        const reactionStats = await get(reactionStatsState)
        const commentStats = await get(commentStatsState)
        const playVideoStats = await get(playVideoStatsState)
        const viewMoreStats = await get(viewMoreStatsState)
        return [...reactionStats, ...commentStats, ...playVideoStats, ...viewMoreStats]
    }
})

export const appStatsSelector = selector({
    key: 'appStat',
    get: async ({ get }) => {
        const timeRange = get(rangeOptionState);
        const stats = await getAppStats(timeRange);
        return stats;
    }
})

export const onlineUsersSelector = selector({
    key: 'onlineUsers',
    get: async ({ get }) => {
        const stats = await get(appStatsSelector);
        return stats.online;
    }
})

export const loadTimeStatsSelector = selector({
    key: 'loadTimeStats',
    get: async ({ get }) => {
        const stats = await get(appStatsSelector);
        return stats.stats['loadtime'];
    }
})

export const pageViewStatsSelector = selector({
    key: 'pageViewsStats',
    get: async ({ get }) => {
        const stats = await get(appStatsSelector);
        return stats.stats['pageview'];
    }
})

export const durationStatsSelector = selector({
    key: 'durationStats',
    get: async ({ get }) => {
        const stats = await get(appStatsSelector);
        return stats.stats['duration'];
    }
})

export const durationByUserStatsSelector = selector({
    key: 'durationByUserStats',
    get: async ({ get }) => {
        const stats = await get(appStatsSelector);
        return stats.stats['duration_user'];
    }
})

export const platformState = atom<"all" | "1" | "2">({
    key: "platform",
    default: "all"
})

export const utmSourceState = atom<string>({
    key: "utmSource",
    default: ""
})

export const trafficsSelector = selector({
    key: 'traffics',
    get: async ({ get }) => {
        const range = get(rangeState)
        const platform = get(platformState)
        const utmSource = get(utmSourceState)
        const utmCampaign = get(utmCampaignState);
        const traffics = getTraffics(range, platform, utmSource, utmCampaign);
        return traffics;
    }
})

export const rangeOptionState = atom<TimeRange>({
    key: "rangeOption",
    default: 30
})

export const utmCampaignState = atom<string>({
    key: "utmCampaign",
    default: ""
})

export const retentionsState = selector<Retentions>({
    key: 'retentions',
    get: async ({ get }) => {
        const range = get(rangeState)
        const stats = await getRetention(range)
        return stats;
    }
})
