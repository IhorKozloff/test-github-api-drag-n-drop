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

export interface IIssuesState {
    repository: string | null;
    issuesList: IIssueDetails[];

    history: {
        repository: string | null;
        issuesList: IIssueDetails[];
    }[]
}
const initialState: IIssuesState = {
    repository: null,
    issuesList: [],
    history: [],
};        

export const issuesSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        saveIssuesFromCurrentUrl: (state, action: PayloadAction<{repositoryUrl: string, issuesData: IIssue[]}>) => {

            const detailedIssues = action.payload.issuesData.map(item => {

                const detailedIssue: IIssueDetails = {
                    ...item,
                    status: 'todo'
                };
                return detailedIssue;
            });

            state.issuesList = detailedIssues;
            state.repository = action.payload.repositoryUrl;
        },

        saveIssuesFromHistory: (state, action: PayloadAction<{repositoryUrl: string, issuesData: IIssueDetails[]}>) => {
            state.issuesList = action.payload.issuesData;
            state.repository = action.payload.repositoryUrl;
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
        clearIssueState: (state) => {
            state.repository = null;
            state.issuesList = [];
        },

        createHistoryRecord: (state) => {
            const stateWithoutDuplicatedRecords = state.history.filter(item => item.repository !== state.repository);

            state.history = [
                ...stateWithoutDuplicatedRecords,
                {
                    repository: state.repository,
                    issuesList: state.issuesList
                }
            ];
        },
    },

});

export const { saveIssuesFromCurrentUrl, changeIssueStatus, clearIssueState, createHistoryRecord, saveIssuesFromHistory } = issuesSlice.actions;
export default issuesSlice.reducer;