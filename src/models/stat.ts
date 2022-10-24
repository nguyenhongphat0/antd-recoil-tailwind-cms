export type StatAction = 'follow-oa' | 'unfollow-oa' | 'react' | 'comment' | 'play-video' | 'view-more' | 'get-stats-app';

export interface Stat {
    action: StatAction;
    count: number;
    time: number;
}

export interface GetStatParams {
    action: StatAction;
    count: number;
    endTime: number;
}

export type AppStatType = 'loadtime' | 'pageview' | 'user' | 'duration' | 'duration_user'

export type TimeRange = 1 | 30

export interface GetAppStatParams {
    type: AppStatType | '';
    timeRange: TimeRange;
}

export type OS = '1' | '2' | 'all'

export interface GetTrafficParams {
    startTime: number;
    endTime: number;
    os: OS;
    utmSource?: string;
    utmCampaign?: string;
}

export interface Traffics {
    utmSources: UtmSource[];
    stats: TrafficStats;
}

export interface TrafficStats {
    charts?: Chart<ChartDatum>[];
    datatables?: Datatable<DatatableDatum>[];
}

export interface ChartDatum {
    "MiniApp.os": string;
    "MiniApp.appId": string;
    time: number;
    "MiniApp.utm_campaign": string;
    "MiniApp.utm_source": string;
}

export interface DatatableDatum {
    "MiniApp.A1_newUser": number;
    "MiniApp.os": string;
    "MiniApp.appId": string;
    "MiniApp.TotalA1_req": number;
    time: number;
    "MiniApp.A1_uid": number;
    "MiniApp.utm_campaign": string;
    "MiniApp.utm_source": string;
}

export interface UtmSource {
    label: string;
    value: string;
}

export interface Retentions {
    stats: RetentionStats;
}

export interface RetentionStats {
    charts?:     Chart<RetentionChart>[];
    datatables?: Datatable<RetentionData>[];
}

export interface Chart<T> {
    data:     T[];
    name:     string;
    hideName: boolean;
}

export interface RetentionChart {
    "MiniAppActive.appId": string;
    "MiniAppActive.A1":    number;
    time:                  number;
}

export interface Datatable<T> {
    data:     T[];
    name:     string;
    hideName: boolean;
}

export interface RetentionData {
    "MiniAppActive.A1":        number;
    "MiniAppActive.RRD1_uid":  number;
    "MiniAppActive.RRD2_uid":  number;
    "MiniAppActive.RRD3_uid":  number;
    "MiniAppActive.RRD4_uid":  number;
    "MiniAppActive.RRD5_uid":  number;
    "MiniAppActive.RRD6_uid":  number;
    "MiniAppActive.RRD7_uid":  number;
    "MiniAppActive.RRD14_uid": number;
    "MiniAppActive.RRD30_uid": number;
    "MiniAppActive.appId":     string;
    time:                      number;
}

export interface GetRetentionParams {
    startTime: number;
    endTime:   number;
}