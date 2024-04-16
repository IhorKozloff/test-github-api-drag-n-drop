import { IIssueDetails } from '../../redux/slices/issuesSlice';
import { IssueItem } from './IssueItem';

interface IProps {
    issueData: IIssueDetails[],
    onDragStart: (elementId: string) => void;
}

export const IssueList = ({ issueData, onDragStart }: IProps) => {

    return (
        <div className="dashboard_section flex flex-col justify-start items-center h-full w-full">
            {issueData.length !== 0 && <ul>
                {issueData.map(issue => {
                    return (
                        <li 
                            onDragStart={e => {
                                onDragStart(issue.id);
                            }}
                            key={issue.id} 
                            id={issue.id}
                            className="cursor-pointer hover:scale-105 transition duration-150 ease-out hover:ease-in"
                            draggable={true}
                        >
                            <IssueItem issueItemData={issue}/>
                        </li>
                    );
                })}
            </ul>}
        </div>
    );
};