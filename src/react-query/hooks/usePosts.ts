import axios from 'axios';
import { useQuery }  from '@tanstack/react-query'

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
    page: number;
    pageSize: number
}

const usePosts = (query: PostQuery) => {
    const fetchPosts = () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/posts',{
                params : {
                    _start: (query.page - 1) * query.pageSize,
                    _limit: query.pageSize
                }
            })
            .then((res) => {
            return res.data;
            });
    }
    //api function call
    return useQuery<Post[], Error>({
    // /users/1/posts and for null only /posts
    queryKey: ['posts', query],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
  });
}

export default usePosts;