import { getIssuesFromRepository } from '../API/githubAPI';
import { IssuesDashboard } from '../components/IssuesDashboard';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/useSelectorAndDispatch';
import { clearIssueState, saveIssuesFromCurrentUrl } from '../redux/slices/issuesSlice';
import Notiflix from 'notiflix';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const issues = useAppSelector(state => state.issues.issuesList);

    const onSearchSubmit = async (repoUrl: string) => {
        try {
            const issues = await getIssuesFromRepository(repoUrl);
            Notiflix.Notify.success('Yeah! Successful search!');
            dispatch(clearIssueState());
            dispatch(saveIssuesFromCurrentUrl(issues));
        } catch (err: any) {
            Notiflix.Notify.failure('Oops! Something wrong :( Please check repo url');
        }
    };

    return (
        <div className="home-background w-full min-h-[100vh] flex flex-col pt-20 items-center">
            <SearchBar onSearchSubmit={onSearchSubmit}/>
            {issues.length !==0 && <IssuesDashboard/>}
        </div>
    );
};