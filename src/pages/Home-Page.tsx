import { getIssuesFromRepository } from '../API/githubAPI';
import { IssuesDashboard } from '../components/IssuesDashboard';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { createGitHubOwnerLink } from '../helpers/createGitHubOwnerLink';
import { useAppDispatch, useAppSelector } from '../hooks/useSelectorAndDispatch';
import { clearIssueState, createHistoryRecord, saveIssuesFromCurrentUrl, saveIssuesFromHistory } from '../redux/slices/issuesSlice';
import Notiflix from 'notiflix';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const {issuesList, repository} = useAppSelector(state => state.issues);
    const history = useAppSelector(state => state.issues.history);

    const onSearchSubmit = async (repoUrl: string) => {

        const fetchData = async () => {
            try {
                const data = await getIssuesFromRepository(repoUrl);
                Notiflix.Notify.success('Yeah! Successful search!');
                dispatch(clearIssueState());
                dispatch(saveIssuesFromCurrentUrl({
                    repositoryUrl: repoUrl,
                    issuesData: data
                }));
            } catch (err: any) {
                Notiflix.Notify.failure('Oops! Something wrong :( Please check repo url');
            }
        };

        if (issuesList.length !== 0 && repository !== null && repository.length !== 0) {
            dispatch(createHistoryRecord());
        }

        if (history.length !== 0) {
            const exisingSearchedUrl = history.find(({repository}) => repository === repoUrl);
            if (exisingSearchedUrl) {
                dispatch(clearIssueState());
                dispatch(saveIssuesFromHistory({
                    repositoryUrl: exisingSearchedUrl.repository!,
                    issuesData: exisingSearchedUrl.issuesList
                }));
            } else {
                fetchData();
            }
        } else {
            fetchData();
        }
    };

    return (
        <div className="home-background w-full min-h-[100vh] flex flex-col pt-20 items-center">
            <SearchBar onSearchSubmit={onSearchSubmit}/>
            {repository !== null && <a className="raz4 mt-4 font-medium" target="_blank" href={`${createGitHubOwnerLink(repository)}`} rel="noreferrer">{`${createGitHubOwnerLink(repository)}`}</a>}
            {issuesList.length !==0 && <IssuesDashboard/>}
        </div>
    );
};
