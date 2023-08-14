// 以下 type 定义了 DataWorks 操作 action 的对象结构

export type DataWorksActions = {
    actions: Action[];
};

export type Action = 
    | CreateFileAction
    | DeleteFileAction
    | UpdateScheduleAction
    | UnknownAction;
    
export type CreateFileAction = {
    actionType: 'create file';
    projectId: number;
    fileName: string;
    fileType: FileType;
    fileDescription?: string;
    updateScheduleAction?: UpdateScheduleAction;
}

export type DeleteFileAction = {
    actionType: 'delete file';
    fileId: number;
    projectId?: number;
}

export type UpdateScheduleAction = {
    actionType: 'update schedule';
    reRunMode: ReRunMode;
    autoRerunTimes: number; //出错自动重跑的次数，最大为10
    autoRerunIntervalMillis: number; //出错自动重跑时间间隔，单位为毫秒，最大为1800000毫秒，默认值 100毫秒
    cronExpress: string; //周期调度的cron表达式
}

// 如果用户的输入不能很好的理解为以上某种 DataWorks action，则使用此 action
export type UnknownAction = {
    actionType: 'unknown';
    // text typed by the user that the system did not understand
    text: string;
}

export type FileType = "ODPS SQL" | "ODPS MR" | "ODPS Script"| "PyODPS" | "ODPS Spark" | "Shell" | "EMR Hive" | "EMR Spark";

export type ReRunMode =
    | "ALL_ALLOWED" // 运行成功或失败后皆可重跑
    | "FAILURE_ALLOWED" // 运行成功后不可重跑，运行失败后可以重跑
    | "ALL_DENIED"; //运行成功或失败皆不可重跑