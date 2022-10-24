import { message } from "antd";
import { Moment } from "moment";
import { Result } from "../models/payload";
import { AppStatType, GetAppStatParams, GetRetentionParams, GetStatParams, GetTrafficParams, OS, Retentions, Stat, StatAction, TimeRange, Traffics } from "../models/stat";
import { request } from "./rest";

export const getGenericStats = async (action: StatAction, range: [Moment, Moment]): Promise<Stat[]> => {
    try {
        const [start, end] = range;
        const params: GetStatParams = {
            action,
            count: end.diff(start, 'days') + 1,
            endTime: end.unix() * 1000,
        }
        const response: Result<{ values: Stat[] }> = await (await request(
            'GET',
            'stats/get-stats',
            params
        )).json()
        if (!response.err) {
            return response.data.values
        } else {
            throw response.msg
        }
    } catch (error) {
        message.error(`Không thể lấy thống kê cho hành động ${action}. Chi tiết: ${error}`);
        return []
    }
}

export const getAppStats = async (timeRange: TimeRange = 1, type?: AppStatType) => {
    try {
        const params: GetAppStatParams = {
            type: type || '',
            timeRange
        }
        let response: Result<{ stats: { [type in AppStatType]: Stat[] }, online: number }> = await (await request(
            'GET',
            'stats/get-stats-app',
            params
        )).json()
        if (!response.err) {
            return response.data
        } else {
            throw response.msg
        }
    } catch (error) {
        message.error(`Không thể lấy thống kê ${type} cho mini app. Chi tiết: ${error}`);
        return {
            online: 0,
            stats: {
                duration: [],
                duration_user: [],
                loadtime: [],
                pageview: [],
                user: []
            }
        }
    }
}

export const getTraffics = async (range: [Moment, Moment], os: OS = 'all', utmSource: string = '', utmCampaign: string = ''): Promise<Traffics> => {
    try {
        const [start, end] = range;
        const params: GetTrafficParams = {
            startTime: start.unix() * 1000,
            endTime: end.unix() * 1000,
            os
        }
        if (utmSource) {
            params.utmSource = utmSource
        }
        if (utmCampaign) {
            params.utmCampaign = utmCampaign
        }
        const response: Result<Traffics> = await (await request(
            'GET',
            'stats/get-traffic',
            params
        )).json()
        if (!response.err) {
            return response.data
        } else {
            throw response.msg
        }
    } catch (error) {
        message.error(`Không thể lấy thống kê cho traffic. Chi tiết: ${error}`);
        return {
            stats: {},
            utmSources: [],
        }
    }
}

export const getRetention = async (range: [Moment, Moment]): Promise<Retentions> => {
    try {
        const [start, end] = range;
        const params: GetRetentionParams = {
            startTime: start.unix() * 1000,
            endTime: end.unix() * 1000,
        }
        const response: Result<Retentions> = await (await request(
            'GET',
            'stats/get-retention',
            params
        )).json()
        if (!response.err) {
            return response.data
        } else {
            throw response.msg
        }
    } catch (error) {
        message.error(`Không thể lấy thống kê cho retention. Chi tiết: ${error}`);
        return { stats: {} }
    }
}