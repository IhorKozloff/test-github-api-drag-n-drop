export type StatusType = 'todo' | 'inprogress' | 'done';

export interface IContainingArea   {
    area_title: string,
    area_containing_type: StatusType,
    area_id: string,
};