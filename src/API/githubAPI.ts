import axios from 'axios';
const BASE_URL = 'https://api.github.com/repos';

export const getIssuesFromRepository = async (usersRequestUrl: string) => {
    const response = await axios.get(`${BASE_URL}/${usersRequestUrl}/issues`);

    const result = response.data.map((item: any) => {
        return {
            title: item.title,
            date: item.created_at,
            number: item.number,
            comments: item.comments,
            id: item.id
        };
    });
    
    return result;
};