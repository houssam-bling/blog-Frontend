import {test,expect} from 'vitest'
import {handleLogic} from '../hooks/usePost'

const post = {
    _id : "1235",
    likes:[],
    dislikes:[],
}


test('add like',()=>{
    const result =  handleLogic({ 
        postId: "1235", 
        userId: "11", 
        posts: [post], 
        action: 'like' 
    })

    expect(result[0].likes).toContain("11");
})
test('remove like', () => {
  const postWithLike = { _id: "1235", likes: ["11"], dislikes: [] };

  const result = handleLogic({
    postId: "1235",
    userId: "11",
    posts: [postWithLike],
    action: 'like',
  });

  expect(result[0].likes).not.toContain("11");
});

test('add dislike', () => {
  const result = handleLogic({
    postId: "1235",
    userId: "11",
    posts: [post],
    action: 'dislike',
  });

  expect(result[0].dislikes).toContain("11");
});

// 3. تبديل من Like لـ Dislike
test('switch from like to dislike', () => {
  const postWithLike = { _id: "1235", likes: ["11"], dislikes: [] };

  const result = handleLogic({
    postId: "1235",
    userId: "11",
    posts: [postWithLike],
    action: 'dislike',
  });

  expect(result[0].likes).not.toContain("11");
  expect(result[0].dislikes).toContain("11");
});