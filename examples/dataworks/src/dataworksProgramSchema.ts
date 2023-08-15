// This is a schema for dataworks.

export type API = {
    /**
     * 新建文件
     * @param fileName 文件名
     * @param fileType 文件类型
     * @returns 新建的文件Id
     */
    createFile(fileName: string, fileType: FileType): number;
    /**
     * 删除文件
     * @param fileId 文件Id
     * @returns 是否删除成功
     */
    deleteFile(fileId: number): boolean;
    /**
     * 设置、更新调度配置
     * @param fileId 文件Id
     * @param cronExpress cron表达式
     */
    updateSchedule(fileId: number, cronExpress: string): void;
    /**
     * 查找文件
     * @param name 文件名称
     * @returns 文件Id
     */
    searchFileIdByName(name: string): number;
}

export type FileType = "ODPS SQL" | "ODPS MR" | "ODPS Script"| "PyODPS" | "ODPS Spark" | "Shell" | "EMR Hive" | "EMR Spark";