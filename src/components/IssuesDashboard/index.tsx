import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectorAndDispatch';
import { IIssueDetails, changeIssueStatus } from '../../redux/slices/issuesSlice';
import { IContainingArea, StatusType } from '../../types.ts/common';
import { IssueList } from './IssueList';

const areaSet: IContainingArea[] = [
    {
        area_title: 'ToDo',
        area_containing_type: 'todo',
        area_id: 'area_todo'
    },
    {
        area_title: 'In Progress',
        area_containing_type: 'inprogress',
        area_id: 'area_inprogress'
    },
    {
        area_title: 'Done',
        area_containing_type: 'done',
        area_id: 'area_done'
    },
];

export const IssuesDashboard = () => {
    const issues = useAppSelector(state => state.issues.issuesList);
    const dispatch= useAppDispatch();

    const [dragableItemId, setDragableItemId] = useState<string | null>(null);

    const createListData = (data: IIssueDetails[], areaType: StatusType) => {
        return data.filter(item => item.status === areaType);
    };

    const onDropHandler = (e: React.DragEvent<HTMLLIElement>, areaTypeStatus: StatusType) => {
        e.preventDefault();
        if (dragableItemId !== null) {
            dispatch(changeIssueStatus({id: dragableItemId, newStatus: areaTypeStatus}));
            setDragableItemId(null);
        } 
    };

    const onDragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };

    return (
        <ul className="flex mt-6 gap-6">
            {areaSet.map(item => {
                return (
                    <li 
                        key={item.area_id}
                        className="w-[400px] h-[500px]${isOnOver === true && 'border-solid border-2 border-black"
                        onDragOver={onDragOverHandler}
                        onDrop={e => {
                            e.preventDefault();
                            onDropHandler(e, item.area_containing_type);
                        }}
                    >
                        <div className="flex justify-center items-center h-10 bg-transparent">
                            <h3 className="font-bold">{item.area_title}</h3>
                        </div>

                        <div 
                            className="hidden-scroll-bar w-full h-full overflow-y-scroll bg-[#ced4da]"
                        >
                            <IssueList 
                                issueData={createListData(issues, item.area_containing_type)} 
                                onDragStart={setDragableItemId}
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};