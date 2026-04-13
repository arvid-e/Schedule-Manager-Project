import { Document, Types } from "mongoose";

export interface ITask {
    title: string;
    description?: string;
    date: Date,
    time: string;
    completed: boolean;
}

export interface IUpdateTask {
    _id: string;
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
}

export interface ITaskDocument extends ITask, Document {}
