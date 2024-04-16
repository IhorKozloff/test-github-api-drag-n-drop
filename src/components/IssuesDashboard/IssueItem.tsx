import { dateDurationHumanize } from '../../helpers/dateHumanize';
import { IIssue } from '../../redux/slices/issuesSlice';
import { Card } from 'antd';

interface IProps {
    issueItemData: IIssue
}
export const IssueItem = ({ issueItemData }: IProps) => {
    return (
        <Card title={`#${issueItemData.number}`} bordered={false} style={{ width: 300, marginBottom: 12 }}>
            <div>
                <p className="font-medium mb-4">{issueItemData.title}</p>
                <p>{dateDurationHumanize(issueItemData.date)} ago</p>
            </div>
            <p>Admin | Comments: {issueItemData.comments}</p>
        </Card>
    );
};