import axios from 'axios';
import { useQuery }  from '@tanstack/react-query'

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
    pages: number;
    pageSize: number
}

const usePosts = (userId : number | undefined) => {
    const fetchPosts = () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/posts',{
                params : {
                    userId
                }
            })
            .then((res) => {
            return res.data;
            });
    }
    //api function call
    return useQuery<Post[], Error>({
    // /users/1/posts and for null only /posts
    queryKey: userId ? ['users',userId,'posts'] : ['posts'],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
  });
}

export default usePosts;