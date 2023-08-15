// 以下 type 定义了 DataWorks 操作 action 的对象结构

export type DataWorksActions = {
    actions: Action[];
};

export type Action = 
    | CreateFileAction /* 创建文件 */
    | DeleteFileAction /* 删除文件 */
    | UpdateScheduleAction /* 设置、更新调度配置 */
    | GenerateSQLAction /* 生成 SQL */
    | AnswerQuestionAction /* 问题答疑 */
    | UnknownAction; /* 不能理解的 Action */
    
export type CreateFileAction = {
    actionType: 'create file';
    projectId: number;
    fileName: string;
    fileType: FileType;
    fileDescription?: string;
}

export type DeleteFileAction = {
    actionType: 'delete file';
    fileId: number;
}

export type UpdateScheduleAction = {
    actionType: 'update schedule';
    rerunMode: RerunMode;
    autoRerunTimes: number; // [0, 10], default 3
    autoRerunIntervalMillis: number; // [0, 1800000]，default 100
    cronExpress: string; // 周期调度的 cron 表达式
}

export type GenerateSQLAction = {
    actionType: 'generate SQL';
    text: string; // text typed by the user
}

export type AnswerQuestionAction = {
    actionType: 'answer question';
    text: string; // question typed by the user
}

export type UnknownAction = {
    actionType: 'unknown';
    text: string; // text typed by the user that the system did not understand
}

export type FileType = "ODPS SQL" | "ODPS MR" | "ODPS Script"| "PyODPS" | "ODPS Spark" | "Shell" | "EMR Hive" | "EMR Spark";

export type RerunMode =
    | "ALL_ALLOWED" // 运行成功或失败后皆可重跑
    | "FAILURE_ALLOWED" // 运行成功后不可重跑，运行失败后可以重跑
    | "ALL_DENIED"; //运行成功或失败皆不可重跑