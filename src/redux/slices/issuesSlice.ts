import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StatusType } from '../../types.ts/common';

export type IIssueStatus = StatusType;

export interface IIssue {
    title: string,
    date: string,
    number: number,
    comments: string,
    id: string,
}

export interface IIssueDetails extends IIssue {
    status: IIssueStatus
}

interface IIssuesState {
    issuesList: IIssueDetails[];
}
const initialState: IIssuesState = {
    issuesList: [],
};        

export const issuesSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        saveIssuesFromCurrentUrl: (state, action: PayloadAction<IIssue[]>) => {
            const detailedIssues = action.payload.map(item => {

                const detailedIssue: IIssueDetails = {
                    ...item,
                    status: 'todo'
                };
                return detailedIssue;
            });

            state.issuesList = detailedIssues;
        },
        changeIssueStatus: (state, action: PayloadAction<{id: string, newStatus: IIssueStatus}>) => {
            const {id, newStatus} = action.payload;
            const changedIssueList = state.issuesList.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: newStatus
                    };
                }
                return item;
            });
            state.issuesList = changedIssueList;
        },
        clearIssueState: () => initialState,
    },

});

export const { saveIssuesFromCurrentUrl, changeIssueStatus, clearIssueState } = issuesSlice.actions;
export default issuesSlice.reducer;